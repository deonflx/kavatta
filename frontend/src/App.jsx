import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://127.0.0.1:8000/api/orders/';

const initialForm = {
  brand: '',
  quantity: '',
  number: '',
  location: '',
  contact: '',
  price: '',
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadRecords() {
    try {
      const response = await axios.get(API_URL);
      setRecords(response.data);
    } catch (error) {
      setMessage('Could not load records. Check that the Django server is running.');
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await axios.post(API_URL, {
        ...form,
        quantity: Number(form.quantity),
        number: Number(form.number),
        price: Number(form.price),
      });

      setMessage('Record saved!');
      setForm(initialForm);
      await loadRecords();
    } catch (error) {
      const serverError = error.response?.data;
      setMessage(
        serverError
          ? `Could not save: ${JSON.stringify(serverError)}`
          : 'Could not connect to the server. Check that Django is running.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Drink Orders</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantity">Quantity (ml)</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <label htmlFor="number">Number of bottles</label>
        <input
          id="number"
          name="number"
          type="number"
          min="1"
          step="1"
          value={form.number}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          maxLength={255}
          required
        />

        <label htmlFor="contact">Phone number</label>
        <input
          id="contact"
          name="contact"
          type="tel"
          value={form.contact}
          onChange={handleChange}
          maxLength={20}
          required
        />

        <label htmlFor="price">Asking price</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="500"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      <h2>All records</h2>

      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <strong>{record.brand}</strong>
              {' — '}
              {record.quantity} ml, {record.number} bottle(s)
              {' — '}
              {record.location}
              {' — '}
              Contact: {record.contact}
              {' — '}
              Price: {record.price}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;

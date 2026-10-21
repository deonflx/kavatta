import { useState } from 'react';
import axios from 'axios';
import './App.css';

const initialForm = {
brand: '',
quantity: '',
number_of_bottles: '',
location: '',
phone_number: '',
};

function App() {
const [form, setForm] = useState(initialForm);
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

const handleChange = (event) => {
const { name, value } = event.target;

setForm((previous) => ({
  ...previous,
  [name]: value,
}));

};

const handleSubmit = async (event) => {
event.preventDefault();
setMessage('');
setLoading(true);

try {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/orders/',
    {
      ...form,
      number_of_bottles: Number(form.number_of_bottles),
    }
  );

  setMessage(`Record saved successfully! ID: ${response.data.id}`);
  setForm(initialForm);
} catch (error) {
  const data = error.response?.data;

  setMessage(
    data
      ? `Could not save: ${JSON.stringify(data)}`
      : 'Could not connect to the server. Please try again.'
  );
} finally {
  setLoading(false);
}

};

return ( <main className="container"> <h1>Drink Order Form</h1> <p>Enter the drink details below.</p>

  <form onSubmit={handleSubmit}>
    <label htmlFor="brand">Brand</label>
    <input
      id="brand"
      name="brand"
      value={form.brand}
      onChange={handleChange}
      placeholder="Enter brand name"
      maxLength={100}
      required
    />

    <label htmlFor="quantity">Bottle quantity (ml)</label>
    <input
      id="quantity"
      name="quantity"
      type="number"
      min="0.01"
      step="0.01"
      value={form.quantity}
      onChange={handleChange}
      placeholder="e.g. 750"
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
      placeholder="Enter bottle count"
      required
    />

    <label htmlFor="location">Location</label>
    <input
      id="location"
      name="location"
      value={form.location}
      onChange={handleChange}
      placeholder="Enter location"
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
      placeholder="Enter phone number"
      maxLength={20}
      required
    />
    <label htmlFor="price">Asking Price</label>
    <input
      id="price"
      name="price"
      type="number"
      value={form.number}
      onChange={handleChange}
      placeholder="Enter Asking price"
      required
    />

    <button type="submit" disabled={loading}>
      {loading ? 'Saving...' : 'Submit'}
    </button>
  </form>

  {message && (
    <p role="status" aria-live="polite">
      {message}
    </p>
  )}
</main>

);
}

export default App;

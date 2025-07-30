import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [form, setForm] = useState({ title: "", company: "", type: "", location: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (!form.title || !form.company || !form.type || !form.location || !form.description) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/jobs", form);
      navigate('/');
    } catch (error) {
      alert("Something went wrong while adding the job.");
    }
  };
  

  return (
<div className="flex justify-center items-center lg:min-h-screen bg-gray-100">
<form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow rounded ">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      {['title', 'company', 'location', 'description'].map(field => (
  field === 'description' ? (
    <textarea
      key={field}
      className="w-full p-2 border rounded mb-3"
      placeholder="Description"
      rows={4}
      value={form.description}
      onChange={e => setForm({ ...form, description: e.target.value })}
    />
  ) : (
    <input
      key={field}
      className="w-full p-2 border rounded mb-3"
      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      value={form[field]}
      onChange={e => setForm({ ...form, [field]: e.target.value })}
    />
  )
))}

      <select className="w-full p-2 border rounded mb-3" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="">Select Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Job</button>
    </form>
    </div>
  );
};

export default AddJob;

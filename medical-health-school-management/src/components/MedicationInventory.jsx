import React, { useState } from "react";

const initialMedications = [
  { id: 1, name: "Paracetamol", purpose: "Hạ sốt", unit: "Viên", quantity: 10, supplier: "ABC Pharma", expiry: "2025-12-31" },
  { id: 2, name: "Băng gạc", purpose: "Sơ cứu", unit: "Cuộn", quantity: 2, supplier: "YteVN", expiry: "2026-01-01" }
];

function MedicationInventory() {
  const [medications, setMedications] = useState(initialMedications);
  const [form, setForm] = useState({ name: "", purpose: "", unit: "", quantity: "", supplier: "", expiry: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.unit || !form.quantity) return;
    if (editingId) {
      setMedications(medications.map(m => m.id === editingId ? { ...m, ...form, quantity: Number(form.quantity) } : m));
      setMessage("Updated!");
      setEditingId(null);
    } else {
      setMedications([
        ...medications,
        { id: Date.now(), ...form, quantity: Number(form.quantity) }
      ]);
      setMessage("Added!");
    }
    setForm({ name: "", purpose: "", unit: "", quantity: "", supplier: "", expiry: "" });
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEdit = (med) => {
    setForm({
      name: med.name,
      purpose: med.purpose,
      unit: med.unit,
      quantity: med.quantity,
      supplier: med.supplier,
      expiry: med.expiry
    });
    setEditingId(med.id);
  };

  const handleDelete = (id) => {
    setMedications(medications.filter(m => m.id !== id));
    setMessage("Deleted!");
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", purpose: "", unit: "", quantity: "", supplier: "", expiry: "" });
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const filtered = medications.filter(
    m => m.name.toLowerCase().includes(search.toLowerCase())
  );

  // Cảnh báo tồn kho thấp (<5)
  const isLowStock = (quantity) => quantity < 5;

  // Cảnh báo sắp hết hạn (trong 30 ngày)
  const isExpiringSoon = (expiry) => {
    if (!expiry) return false;
    const today = new Date();
    const exp = new Date(expiry);
    const diff = (exp - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  };

  return (
    <div>
      <h2>Medication Inventory</h2>
      {message && <div style={{ color: "green", marginBottom: 10 }}>{message}</div>}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(m => (
            <tr key={m.id}
              style={{
                background: isLowStock(m.quantity)
                  ? "#fff3cd"
                  : isExpiringSoon(m.expiry)
                  ? "#f8d7da"
                  : undefined
              }}
            >
              <td>{m.name}</td>
              <td>{m.purpose}</td>
              <td>{m.unit}</td>
              <td>
                {m.quantity}
                {isLowStock(m.quantity) && <span style={{ color: "orange", marginLeft: 5 }}>(Low!)</span>}
              </td>
              <td>{m.supplier}</td>
              <td>
                {m.expiry}
                {isExpiringSoon(m.expiry) && <span style={{ color: "red", marginLeft: 5 }}>(Expiring!)</span>}
              </td>
              <td>
                <button onClick={() => handleEdit(m)}>Edit</button>
                <button onClick={() => handleDelete(m.id)} style={{ marginLeft: 5 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAdd}>
        <h3>{editingId ? "Edit Medication" : "Add Medication"}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} />
        <input name="unit" placeholder="Unit" value={form.unit} onChange={handleChange} required />
        <input name="quantity" type="number" min="0" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} />
        <input name="expiry" type="date" placeholder="Expiry" value={form.expiry} onChange={handleChange} />
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", purpose: "", unit: "", quantity: "", supplier: "", expiry: "" });
            }}
            style={{ marginLeft: 5 }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default MedicationInventory;
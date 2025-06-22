import React, { useState } from "react";

const initialVisits = [
  {
    id: 1,
    student: "Nguyen Van A",
    date: "2024-06-01",
    symptom: "Sốt",
    diagnosis: "Cảm cúm",
    treatment: "Uống thuốc hạ sốt"
  }
];

function MedicalVisitRecording() {
  const [visits, setVisits] = useState(initialVisits);
  const [form, setForm] = useState({
    student: "",
    date: "",
    symptom: "",
    diagnosis: "",
    treatment: ""
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.student || !form.date) return;
    if (editingId) {
      setVisits(
        visits.map((v) =>
          v.id === editingId ? { ...v, ...form } : v
        )
      );
      setMessage("Visit updated!");
      setEditingId(null);
    } else {
      setVisits([
        ...visits,
        { id: Date.now(), ...form }
      ]);
      setMessage("Visit added!");
    }
    setForm({
      student: "",
      date: "",
      symptom: "",
      diagnosis: "",
      treatment: ""
    });
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEdit = (visit) => {
    setForm({
      student: visit.student,
      date: visit.date,
      symptom: visit.symptom,
      diagnosis: visit.diagnosis,
      treatment: visit.treatment
    });
    setEditingId(visit.id);
  };

  const handleDelete = (id) => {
    setVisits(visits.filter((v) => v.id !== id));
    setMessage("Visit deleted!");
    if (editingId === id) {
      setEditingId(null);
      setForm({
        student: "",
        date: "",
        symptom: "",
        diagnosis: "",
        treatment: ""
      });
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const filtered = visits.filter(
    (v) =>
      v.student.toLowerCase().includes(search.toLowerCase()) ||
      v.date.includes(search)
  );

  return (
    <div>
      <h2>Medical Visit Recording</h2>
      {message && <div style={{ color: "green", marginBottom: 10 }}>{message}</div>}
      <input
        type="text"
        placeholder="Search by student or date"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Symptom</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(v => (
            <tr key={v.id}>
              <td>{v.student}</td>
              <td>{v.date}</td>
              <td>{v.symptom}</td>
              <td>{v.diagnosis}</td>
              <td>{v.treatment}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Edit</button>
                <button onClick={() => handleDelete(v.id)} style={{ marginLeft: 5 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAdd}>
        <h3>{editingId ? "Edit Medical Visit" : "Add Medical Visit"}</h3>
        <input
          name="student"
          placeholder="Student Name"
          value={form.student}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="symptom"
          placeholder="Symptom"
          value={form.symptom}
          onChange={handleChange}
        />
        <input
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
        />
        <input
          name="treatment"
          placeholder="Treatment"
          value={form.treatment}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                student: "",
                date: "",
                symptom: "",
                diagnosis: "",
                treatment: ""
              });
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

export default MedicalVisitRecording;
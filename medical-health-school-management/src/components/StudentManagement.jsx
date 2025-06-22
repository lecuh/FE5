import React, { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../api"; // Thêm deleteStudent

function StudentManagement() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getStudents().then(setStudents).catch(e => alert(e.message));
  }, []);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", class: "", dob: "", allergy: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.class) return;
    if (editingId) {
      await updateStudent(editingId, form);
    } else {
      await createStudent(form);
    }
    setForm({ name: "", class: "", dob: "", allergy: "" });
    setEditingId(null);
    getStudents().then(setStudents);
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      class: student.class,
      dob: student.dob,
      allergy: student.allergy
    });
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", class: "", dob: "", allergy: "" });
    }
    getStudents().then(setStudents);
  };


  const filtered = students.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase())
  );

  // Hàm xuất CSV
  const handleExportCSV = () => {
    const header = "Name,Class,Date of Birth,Allergy\n";
    const rows = students.map(
      s => `"${s.name}","${s.class}","${s.dob}","${s.allergy}"`
    );
    const csvContent = header + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Student Management</h2>
      <button onClick={handleExportCSV} style={{ marginBottom: 10 }}>Export CSV</button>
      <input
        type="text"
        placeholder="Search by name or class"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10, marginLeft: 10 }}
      />
      <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Date of Birth</th>
            <th>Allergy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.dob}</td>
              <td>{s.allergy}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)} style={{ marginLeft: 5 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAdd}>
        <h3>{editingId ? "Edit Student" : "Add Student"}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="class" placeholder="Class" value={form.class} onChange={handleChange} required />
        <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} />
        <input name="allergy" placeholder="Allergy" value={form.allergy} onChange={handleChange} />
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setForm({ name: "", class: "", dob: "", allergy: "" }); }}
            style={{ marginLeft: 5 }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentManagement;
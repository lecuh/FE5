import React, { useState } from "react";

const initialUsers = [
  { id: 1, username: "admin", role: "Administrator" },
  { id: 2, username: "medic", role: "Health Staff" }
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ username: "", role: "Health Staff" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.username) return;
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...form } : u));
      setEditingId(null);
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }
    setForm({ username: "", role: "Health Staff" });
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, role: user.role });
    setEditingId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ username: "", role: "Health Staff" });
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)} style={{ marginLeft: 5 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAdd}>
        <h3>{editingId ? "Edit User" : "Add User"}</h3>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Health Staff">Health Staff</option>
          <option value="Teacher">Teacher</option>
          <option value="Administrator">Administrator</option>
        </select>
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ username: "", role: "Health Staff" });
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

export default UserManagement;
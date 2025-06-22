import React from "react";

function ReportsDashboard() {
  // Dữ liệu mẫu, bạn có thể lấy từ props hoặc context thực tế
  const totalStudents = 50;
  const totalVisits = 120;
  const commonIllnesses = [
    { name: "Cảm cúm", count: 40 },
    { name: "Đau bụng", count: 25 },
    { name: "Sốt", count: 20 }
  ];
  const lowStock = [
    { name: "Băng gạc", quantity: 2 },
    { name: "Oresol", quantity: 3 }
  ];

  return (
    <div>
      <h2>Reports & Dashboard</h2>
      <div style={{ marginBottom: 20 }}>
        <b>Total students:</b> {totalStudents} <br />
        <b>Total medical visits:</b> {totalVisits}
      </div>
      <div style={{ marginBottom: 20 }}>
        <b>Common illnesses:</b>
        <ul>
          {commonIllnesses.map((ill, idx) => (
            <li key={idx}>{ill.name}: {ill.count} cases</li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 20 }}>
        <b>Low stock alerts:</b>
        <ul>
          {lowStock.map((item, idx) => (
            <li key={idx} style={{ color: "orange" }}>{item.name}: {item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReportsDashboard;
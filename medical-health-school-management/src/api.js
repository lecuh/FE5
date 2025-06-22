// Fake login: trả về token nếu đúng tài khoản mẫu
export async function login(username, password) {
  // Tài khoản mẫu
  const USERS = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "student", password: "student123", role: "user" }
  ];
  const found = USERS.find(
    u => u.username === username && u.password === password
  );
  if (!found) throw new Error("Sai tài khoản hoặc mật khẩu!");
  // Trả về token giả lập
  return {
    code: 1000,
    fiel: {
      token: "fake-token-" + found.role,
      roles: [found.role === "admin" ? "role_admin" : "role_user"]
    }
  };
}

// Lấy token từ localStorage
function getToken() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user).token;
  } catch {
    return null;
  }
}

// Kiểm tra token (giả lập)
function checkToken(token) {
  if (!token || (!token.startsWith("fake-token-admin") && !token.startsWith("fake-token-user"))) {
    throw new Error("Token không hợp lệ");
  }
}

// Fake student data
function getStudentsData() {
  const data = localStorage.getItem("students");
  return data ? JSON.parse(data) : [];
}

function setStudentsData(data) {
  localStorage.setItem("students", JSON.stringify(data));
}

// API: GET ALL STUDENTS
export async function getStudents() {
  checkToken(getToken());
  return getStudentsData();
}

// API: CREATE NEW STUDENT
export async function createStudent(student) {
  checkToken(getToken());
  const students = getStudentsData();
  student.id = Date.now();
  students.push(student);
  setStudentsData(students);
  return student;
}

// API: UPDATE STUDENT
export async function updateStudent(studentId, data) {
  checkToken(getToken());
  let students = getStudentsData();
  students = students.map(s => s.id === studentId ? { ...s, ...data } : s);
  setStudentsData(students);
  return students.find(s => s.id === studentId);
}

// Fake medicine data
function getMedicinesData() {
  const data = localStorage.getItem("medicines");
  return data ? JSON.parse(data) : [];
}

function setMedicinesData(data) {
  localStorage.setItem("medicines", JSON.stringify(data));
}

// API: GET ALL MEDICINES
export async function getMedicines() {
  checkToken(getToken());
  return getMedicinesData();
}

// API: CREATE NEW MEDICINE
export async function createMedicine(medicine) {
  checkToken(getToken());
  const medicines = getMedicinesData();
  medicine.id = Date.now();
  medicines.push(medicine);
  setMedicinesData(medicines);
  return medicine;
}

export async function deleteStudent(studentId) {
  checkToken(getToken());
  let students = getStudentsData();
  students = students.filter(s => s.id !== studentId);
  setStudentsData(students);
  return true;
}
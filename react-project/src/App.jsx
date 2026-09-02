import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  const [submittedStudent, setSubmittedStudent] = useState(null);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/students/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to save:", errorData);
      alert("Failed to save student. Check console for details.");
      return;
    }

    const savedStudent = await response.json();

    // Display the student the backend actually saved (includes its new id)
    setSubmittedStudent(savedStudent);

    // Clear the form fields
    setStudent({
      name: "",
      age: "",
      email: "",
      course: "",
    });
  } catch (error) {
    console.error("Network error:", error);
    alert("Could not reach the server. Is Django running?");
  }
};

  return (
    <div className="container">
      <h1>Student Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            placeholder="Enter course"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedStudent && (
        <div className="student-details">
          <h2>Submitted Student Details</h2>

          <p>
            <strong>Name:</strong> {submittedStudent.name}
          </p>

          <p>
            <strong>Age:</strong> {submittedStudent.age}
          </p>

          <p>
            <strong>Email:</strong> {submittedStudent.email}
          </p>

          <p>
            <strong>Course:</strong> {submittedStudent.course}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

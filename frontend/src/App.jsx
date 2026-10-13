import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  // GET - Students ko fetch karna
  useEffect(() => {
    fetch(`${API_URL}/student`)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA FROM BACKEND:", data);

        // Agar backend array return kare
        setStudents(Array.isArray(data) ? data : data.data || []);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  // EDIT - Input fields mein data lana
  const editStudent = (student) => {
    setEditId(student._id);
    setName(student.name);
    setEmail(student.email);
    setPassword(student.password || "");
  };

  // UPDATE - Student update karna
  const updateStudent = () => {
    fetch(`${API_URL}/student/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("UPDATED:", data);

        if (data.data) {
          setStudents(
            students.map((student) =>
              student._id === editId ? data.data : student
            )
          );
        }

        setEditId(null);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  // DELETE - Student delete karna
  const deleteStudent = (id) => {
    fetch(`${API_URL}/student/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETED:", data);

        setStudents(
          students.filter((student) => student._id !== id)
        );
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  // POST - Naya student insert karna
  const insertStudent = () => {
    fetch(`${API_URL}/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("INSERTED:", data);

        if (data.data) {
          setStudents([...students, data.data]);
          setName("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  return (
    <div>
      <Button variant="contained" color="success">
        Click Me
      </Button>

      <Button variant="outlined">Cancel</Button>

      <Button variant="text">Learn More</Button>

      <h1>Student Insert</h1>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      {editId ? (
        <Button variant="contained" color="warning" onClick={updateStudent}>
          Update Student
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={insertStudent}>
          Insert Student
        </Button>
      )}

      <h1>Student List</h1>

      <h2>Total: {students.length}</h2>

      {students.map((student) => (
        <div key={student._id}>
          <h3>Name: {student.name}</h3>

          <p>Email: {student.email}</p>

          <Button
            variant="outlined"
            onClick={() => editStudent(student)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => deleteStudent(student._id)}
          >
            Delete
          </Button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
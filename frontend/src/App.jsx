import { useEffect, useState } from "react";
import Button from '@mui/material/Button';


function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  // GET
  useEffect(() => {

    fetch("http://localhost:5000/student")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA FROM BACKEND:", data);
        setStudents(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });

  }, []);


  // edit
  const editStudent = (student) => {

   setEditId(student._id);
   setName(student.name);
   setEmail(student.email);
   setPassword(student.password);

  };

 const updateStudent = () => {

fetch(`http://localhost:5000/student/${editId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })

    })

      .then((response) => response.json())

       .then((data) => {

      console.log("UPDATED:", data);

      setStudents(
        students.map((student) =>
          student._id === editId ? data.data : student
        )
      );

      setEditId(null);
      setName("");
      setEmail("");
      setPassword("");

    })
      .catch((error) => {
        console.log("ERROR:", error);
      });

  };



  const deleteStudent = (id) => {

  fetch(`http://localhost:5000/student/${id}`, {

    method: "DELETE"

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

   // POST
  const insertStudent = () => {

    fetch("http://localhost:5000/student", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })

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



     <Button variant="contained"color="success">
        Click Me
      </Button>

      <Button variant="outlined">
        Cancel
      </Button>

      <Button variant="text">
        Learn More
      </Button>

      <h1>Student Insert</h1>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />




      <h1>Student List</h1>
{editId ? (

  <button onClick={updateStudent}>
    Update Student
  </button>

) : (

  <button onClick={insertStudent}>
    Insert Student
  </button>

)}
      <h2>Total: {students.length}</h2>

     {students.map((student) => (

  <div key={student._id}>

    <h3>Name: {student.name}</h3>

    <p>Email: {student.email}</p>

    <p>Password: {student.password}</p>

    <button onClick={() => editStudent(student)}>
      Edit
    </button>


    <button onClick={() => deleteStudent(student._id)}>
  Delete
</button>

  </div>

))}

    </div>
  );
}

export default App;
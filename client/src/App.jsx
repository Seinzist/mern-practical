import { useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);
  const [name, getName] = useState("");
  const [age, getAge] = useState("");
  const [course, getCourse] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  const addStudent = async(e)=> {
    e.preventDefault();
    await axios
            .post("http://localhost:5000/students", {
              name: name,
              age: Number(age),
              course: course
            });
    if(editingId){
      await axios.put(`http://localhost:5000/students/${editingId}`,
        {
          name: name,
          age: Number(age),
          course: course
        }
      )
      console.log("student updated")
    }
    console.log("successfull data saved!")
    const response = await axios.get("http://localhost:5000/students");
    getName("");
    getAge("");
    getCourse("");
    setEditingId(null);
    setStudents(response.data);
  }
  
  const deleteStudent = async(id)=>{
    await axios.delete(`http://localhost:5000/students/${id}`);
    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
    console.log("Data deleted!")
  }

  const editStudent = (student) =>{
    setEditingId(student._id);
    getName(student.name);
    getAge(student.age);
    getCourse(student.course);
  };
 

  return(
    <div>
      <h1>Student Management System</h1>
      <h2>Student Registration</h2>
      <form onSubmit={addStudent}>
        <input typee="text" 
        placeholder = "Enter Student Name: "
        value={name}
        onChange={(e)=> getName(e.target.value)}
        />
        <br/>
        <input typee="number" 
        placeholder = "Enter Student Age: "
        value={age}
        onChange={(e)=> getAge(e.target.value)}
        />
        <br/>
        <input typee="text" 
        placeholder = "Enter Student Course: "
        value={course}
        onChange={(e)=> getCourse(e.target.value)}
        />
        <br/>
        <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
      </form>

      <h2>Updated Student List</h2>
      {students.map((student) => (
        <div key ={student._id}>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Course: {student.course}</p>
          <button onClick={()=> editStudent(student)}>Edit</button>
          <button onClick={()=> deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
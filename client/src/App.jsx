import { useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);
  const [name, getName] = useState("");
  const [age, getAge] = useState("");
  const [course, getCourse] = useState("");
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
    console.log("successfull data saved!")

    const response = await axios.get("http://localhost:5000/students");
    getName("");
    getAge("");
    getCourse("");
    setStudents(response.data);
  }
 

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
        <button type="submit">Submit</button>
      </form>







      
    </div>
  );
}

export default App;
'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import { DataItem } from "./api/utility/schema";

export default function Home() {

  async function handleSubmit (event:any) {
    event.preventDefault(); 
    const  newStudent : DataItem = {
      studentID : studentID,
      studentName : studentName,
      course : course,
      presentDate : presentDate

    }
    await addStudent(newStudent);
  }

  async function handleupdateSubmit (event:any) {

    event.preventDefault(); 
      const  newStudent : DataItem = {
        studentID : updatestudentID,
        studentName : updatestudentName,
        course : updatecourse,
        presentDate : updatepresentDate
  
      }
      await updateStudent(newStudent);
    
  }

const [studentID, setstudentID] = useState('');
const [studentName, setstudentName] = useState('');
const [course, setcourse] = useState('');
const [presentDate, setpresentDate] = useState('');
const [updatestudentID, setupdatestudentID] = useState('');
const [updatestudentName, setupdatestudentName] = useState('');
const [updatecourse, setupdatecourse] = useState('');
const [updatepresentDate, setupdatepresentDate] = useState('');
const [data, setData] = useState<DataItem[]>([]);
const [loading, setLoading] = useState<boolean>(true);

const addStudent = async (student:{studentID:string;studentName:string;course:string;presentDate:string;}) => {
  
  if (!studentID || !studentName || !course || !presentDate) {
    alert("Please Fill in all required Fields!");
  }

  else {
      try {
        const res = await fetch('/api/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
        });
        console.log('Response status:', res.status);
        console.log('Response status text:', res.statusText);
        if (!res.ok) {
          throw new Error('Failed to insert data');
        }

        const newStudent = await res.json();
        console.log('Response data:', newStudent);

        setData((prev) => [...prev, newStudent]);
        setstudentID('')
        setstudentName('')
        setcourse('')
        setpresentDate('')
        // await fetchData();
      } catch (error) {
        console.error('Error adding student:', error);
      }

  }
};

const updateStudent = async (student:{studentID:string;studentName:string;course:string;presentDate:string;}) => {
      try {
        const res = await fetch('/api/route', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
        });
        console.log('Response status:', res.status);
        console.log('Response status text:', res.statusText);
        if (!res.ok) {
          throw new Error('Failed to insert data');
        }

        const newStudent = await res.json();
        console.log('Response data:', newStudent);

        await fetchData();
        setupdatestudentID('')
        setupdatestudentName('')
        setupdatecourse('')
        setupdatepresentDate('')
        // await fetchData();
      } catch (error) {
        console.error('Error adding student:', error);
      }
};


const fetchData = async () => {
      try {
        const res = await fetch('/api/route');
        if (!res.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const result: DataItem[] = await res.json();

        setData(result);
        console.log(data);
        setLoading(false);
        console.log('the result is:',result);
      } catch (error) {
        console.log(error);
      } 
    };

  return (
    <div className={styles.page}>
      <div className={styles.formdiv}>
        <div>
        <h1>Add New Student</h1>
        <form onSubmit={handleSubmit} className={styles.addform}>
          <label>
          <input type="text" 
          name="studentID" 
          placeholder="Student ID"
          value={studentID} 
          onChange={(event) =>(setstudentID(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="studentName" 
          placeholder="Full Name"
          value={studentName} 
          onChange={(event) =>(setstudentName(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="course" 
          placeholder="Couse Name"
          value={course} 
          onChange={(event) =>(setcourse(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="presentDate" 
          placeholder="Date (dd/mm/yyyy)"
          value={presentDate} 
          onChange={(event) =>(setpresentDate(event.target.value))}></input>
          </label>
          <button className={styles.submitButton} type="submit">Add Student</button>
        </form>
        </div>

        <div className={styles.updatestudentdiv}>
        <h1>Update Student Info</h1>
        <form onSubmit={handleupdateSubmit} className={styles.updateform}>
          <label>
          <input type="text" 
          name="studentID" 
          placeholder="Student ID"
          value={updatestudentID} 
          onChange={(event) =>(setupdatestudentID(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="studentName" 
          placeholder="Full Name"
          value={updatestudentName} 
          onChange={(event) =>(setupdatestudentName(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="course" 
          placeholder="Couse Name"
          value={updatecourse} 
          onChange={(event) =>(setupdatecourse(event.target.value))}></input>
          </label>
          <label>
          <input type="text" 
          name="presentDate" 
          placeholder="Date (dd/mm/yyyy)"
          value={updatepresentDate} 
          onChange={(event) =>(setupdatepresentDate(event.target.value))}></input>
          </label>
          <button className={styles.submitButton} type="submit">Update Student</button>
        </form>
        </div>
      </div>
      <DataDisplay data={data}setData={setData} loading={loading} setLoading={setLoading}></DataDisplay>
      <button className={styles.fetchButton} onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

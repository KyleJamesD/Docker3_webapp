import { NextRequest, NextResponse } from "next/server";
import pool from "../db/client";

export async function GET(req: NextRequest) {
    try{
        const result = await pool.query('SELECT * FROM "student_info";');
        return NextResponse.json(result.rows);
    }
    catch (error){
        console.log('Database Query error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}


export async function PUT(req: NextRequest) {
  try {
    const { studentID, studentName, course, presentDate } = await req.json();

    // Ensure the studentID is present. This is often used as a key to identify the record to update.
    // if (!studentID) {
    //   return NextResponse.json({ error: 'Missing studentID' }, { status: 400 });
    // }

    // Initialize an array to build the SET clause dynamically
    const updates = [];
    const values = [];
    let valueIndex = 1;

    if (studentName) {
      updates.push(`"studentName" = $${valueIndex++}`);
      values.push(studentName);
    }

    if (course) {
      updates.push(`"course" = $${valueIndex++}`);
      values.push(course);
    }

    if (presentDate) {
      updates.push(`"presentDate" = $${valueIndex++}`);
      values.push(presentDate);
    }

    // If there are no updates, return early
    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Add the studentID to the values array for the WHERE clause
    values.push(studentID);

    // Construct the SQL query
    const updateQuery = `
      UPDATE student_info
      SET ${updates.join(', ')}
      WHERE "studentID" = $${valueIndex}
      RETURNING *;`;

    // Execute the query
    const result = await pool.query(updateQuery, values);

    // Check if the student was found and updated
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 }); // Respond with the updated record
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Error updating data in database' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    try {
      const { studentID, studentName, course, presentDate } = await req.json();
  
      // Basic validation 
      if (!studentID || !studentName || !course || !presentDate) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Column names  must be in quotes in order to be Case-sensitive
      const insertQuery = `
        INSERT INTO student_info ("studentID", "studentName", "course", "presentDate")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`; // RETURNING * returns the newly inserted row
  
      // Use parameterized queries to prevent SQL injection
      const result = await pool.query(insertQuery, [studentID, studentName, course, presentDate]);
  
      return NextResponse.json(result.rows[0], { status: 201 }); // Respond with the newly created record
    } catch (error) {
      //because we know the details of the errors, we will create a error type 
      // and cast the error so we can access those types
      //error in this case returns an object(promise? reject?)  with 17 attributes, but we only need these two
      interface ErrorType {
        code?: string;
        detail?: string;
      }
      //cast the error to our defined error type
      const dbError = error as ErrorType;
      console.error('Insert error:', error);
      //Now we can make error codes as we wish.
      //We were using db.detail, but tis exposes the names of our columns in SQL, 
      // we should use a custom error code instead.
      if ( dbError.code == '23505')
      {
        return NextResponse.json({error: 'student already exists!' }, { status: 409 });
      }
      else {
        return NextResponse.json({ error: 'Error inserting data into database' }, { status: 500 });
      }
      
    }
  }

export async function DELETE(req: NextRequest) {
  try {
    // Parse the studentID from the request body
    const { studentID } = await req.json();

    // Check if studentID is provided
    if (!studentID) {
      return NextResponse.json({ error: 'Missing studentID' }, { status: 400 });
    }

    // Create a delete query to remove the record by studentID
    const deleteQuery = `
      DELETE FROM student_info
      WHERE "studentID" = $1
      RETURNING *;`;

    // Execute the query
    const result = await pool.query(deleteQuery, [studentID]);

    // Check if the student was found and deleted
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Student not exists' }, { status: 404 });
    }

    // Respond with the deleted record
    return NextResponse.json("Student deleted successfully", { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Error deleting data from database' }, { status: 500 });
  }
}

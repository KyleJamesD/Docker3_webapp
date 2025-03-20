import React, { useEffect, useState } from 'react';
import { DataItem } from '../api/utility/schema';

  interface setpropstype  {
    data: DataItem[];
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  }

export default function DataDisplay ({data, setData, loading, setLoading}: setpropstype) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/route');
        if (!res.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const result: DataItem[] = await res.json();
        setData(result);
        console.log('the result is:',result);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      } 
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from Database</h1>
      <ul>
        {data ? data.map((item,index) => (
          <li key={index}>
            ID: {item.studentID} studentName: {item.studentName} Course Name: {item.course} Present Date: {item.presentDate}
          </li> 
        )) : <div></div>}
      </ul>
    </div>
  );
};


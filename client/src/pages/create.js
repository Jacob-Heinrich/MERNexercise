import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../components/navigation';
import '../App.css';


function Create() {
  const [ name, setName ] = useState('');
  const [ reps, setReps ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ unit, setUnit ] = useState('');
  const [ date, setDate ] = useState('');

  const history = useHistory();

  const createExercise = async()=>{
    const newExercise = {name,reps,weight,unit,date};
    const response = await fetch('https://etracker2022.herokuapp.com/exercises/' ,
    {
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: {
        'Content-Type': 'application/json',
      }
      });
    if(response.status === 201){
      alert("Succesfully created exercise");
    }else {
      alert(`Failed to create exercise. Status = ${response.status}`);
  }
  history.push('/');
};

  return(
    <div className="createPage">
    <Navigation className="nav"/>
    <h1 className="header">Create an exercise</h1>
    <div className="createTable">
    <input type='text'
    value = {name}
    placeholder = "Enter name"
    onChange = {e => setName(e.target.value)}
    className="input"
    />
    <input type='number'
    value = {reps}
    placeholder = "Enter reps"
    onChange = {e => setReps(e.target.value)}
    className="input"
    />
    <input type='number'
    placeholder = "Enter weight"
    value = {weight}
    onChange = {e => setWeight(e.target.value)}
    className="input"
    />
    <select
    onChange = {e => setUnit(e.target.value)}
    className="input">
    <option value=""></option>
    <option value = "lbs">lbs</option>
    <option value = "kgs">kgs</option>
    </select>
    <input type='text'
    placeholder = "Enter date"
    value = {date}
    onChange = {e => setDate(e.target.value)}
    className="input"
    />
    </div>
    <button onClick = {createExercise} className="submitBtn">
    Create exercise</button>
    </div>
  )
}

export default Create;

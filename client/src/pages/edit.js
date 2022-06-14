import React from 'react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Navigation from '../components/navigation';

function Edit({exerciseToEdit}){
  const [ name, setName ] = useState(exerciseToEdit.name);
  const [ reps, setReps ] = useState(exerciseToEdit.reps);
  const [ weight, setWeight ] = useState(exerciseToEdit.weight);
  const [ unit, setUnit ] = useState(exerciseToEdit.unit);
  const [ date, setDate ] = useState(exerciseToEdit.date);

  const history = useHistory();

  const editExercise = async()=>{
    const editedExercise = {name,reps,weight,unit,date};
    const response = await fetch(`https://etracker2022.herokuapp.com/exercises/${exerciseToEdit._id}/`,
    {
      method: 'PUT',
      body: JSON.stringify(editedExercise),
      headers: {
        'Content-Type': 'application/json',
      }
      });
    if(response.status === 200){
      alert("Exercise succesfully edited");
    } else {
      alert(`Failed to edit exercise. Status = ${response.status}`);
  }
  history.push('/');
};

  return(
    <div className="editPage">
    <Navigation />
    <h1 className="header">Edit the exercise</h1>
    <div className="editTable">
    <h4>Name:</h4>
    <input type='text'
    value = {name}
    onChange = {e => setName(e.target.value)}
    className="input"
    />
    <h4>Reps:</h4>
    <input type='number'
    value = {reps}
    onChange = {e => setReps(e.target.value)}
    className="input"
    />
    <h4>Weight:</h4>
    <input type='number'
    value = {weight}
    onChange = {e => setWeight(e.target.value)}
    className="input"
    />
    <h4>Unit:</h4>
    <select
    placeholder = "Enter unit"
    value = {unit}
    onChange = {e => setUnit(e.target.value)}
    className="input">
    <option value = "lbs">lbs</option>
    <option value = "kgs">kgs</option>
    </select>
    <h4>Date:</h4>
    <input type='text'
    value = {date}
    onChange = {e => setDate(e.target.value)}
    className="input"
    />
    </div>
    <button onClick = {editExercise} className="submitBtn">
    Save</button>
    </div>
  )
}

export default Edit;

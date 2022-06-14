import React from 'react';
import ExerciseList from '../components/exerciseTable';
import Navigation from '../components/navigation';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';


function Home({setExerciseToEdit}) {
  const [exercises,setExercises] = useState([]);
  const history = useHistory();

  const onDelete = async id => {
    const response = await fetch(`https://etracker2022.herokuapp.com/exercises/${id}/`, {
      method: 'DELETE'
    });
    if(response.status === 204){
      const getResponse = await fetch('https://etracker2022.herokuapp.com/exercises/');
      const exercises = await getResponse.json();
      setExercises(exercises);
    }else{
      console.error('Failed to delete movie')
    }
  }

  const onEdit = editExercise => {
      setExerciseToEdit(editExercise);
      history.push('/edit');
  }

  const loadExercises = async () => {
    const response = await fetch('https://etracker2022.herokuapp.com/exercises/');
    const exercises = await response.json();
    setExercises(exercises);
}

useEffect(() => {
    loadExercises();
}, []);
  return(
    <>
    <Navigation className="nav"/>
    <div className="intro">
    <header>
    <div className="assignmentDescribe">
    <h1 className="proj">Full Stack MERN APP</h1>
    <p className="projParagraph">
    Single Page application that tracks exercises completed by the
    user. React was used for the front-end UI app and a REST API was
    written using Node and Express for the back-end web service. MongoDB
    was used for persistence.
    </p>
    </div>
    </header>
    <h1 className="header">Exercise Tracker</h1>
    <ExerciseList exercises = {exercises} onDelete = { onDelete } onEdit = {onEdit}></ExerciseList>
    </div>
    </>
  )
}

export default Home;

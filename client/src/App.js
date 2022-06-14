import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Create from './pages/create';
import Edit from './pages/edit';
import { useState } from 'react';

function App() {
  const [ exerciseToEdit, setExerciseToEdit ] = useState();
  return (
    <div className="App">
    <Router>
    <Route path="/" exact>
    <Home
    setExerciseToEdit = { setExerciseToEdit }/>
    </Route>
    <Route path="/edit">
    <Edit exerciseToEdit = {exerciseToEdit}/>
    </Route>
    <Route path="/create">
    <Create />
    </Route>
    </Router>
    </div>
  );
}

export default App;

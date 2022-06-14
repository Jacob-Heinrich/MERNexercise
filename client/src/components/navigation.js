import React from 'react';
import { Link } from 'react-router-dom';
import { BiDumbbell } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import '../App.css';

function Navigation(){
  return (
    <>
    <Link to="/" className="homeBtn"><AiFillHome size = '30px' />
    Go to home
    </Link>
    <Link to="/create" className="createLink"><BiDumbbell size="30px"/>Create an Exercise</Link>
    </>
  )
}

export default Navigation;

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import '../App.css';

function Row({exercise,onDelete,onEdit}){
  return(
    <tr>
    <td className="row">{exercise.name}</td>
    <td className="row">{exercise.reps}</td>
    <td className="row">{exercise.weight}</td>
    <td className="row">{exercise.unit}</td>
    <td className="row">{exercise.date}</td>
    <td className="row" id="edit"><MdEdit onClick = {()=>
    onEdit(exercise)}/></td>
    <td className="row" id="delete"><MdDeleteForever onClick={()=> onDelete(exercise._id)}/></td>
    </tr>
  );
}

export default Row;

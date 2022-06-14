import 'dotenv/config';
import * as exercise from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
/**
 * Create an exercises
 */
app.post('/exercises', (req, res) => {

    // Checks to see if inputs are valid
    const unitList = ["lbs","kgs"]
    const format = /^\d\d-\d\d-\d\d$/;
    const formatted = format.test(req.body.date);
    if(!formatted)return res.status(400).json({Error:"Invalid request"});
    if(req.body.name.length < 1) return res.status(400).json({Error:"Invalid request"});
    if(req.body.reps < 1) return res.status(400).json({Error:"Invalid request"});
    if(req.body.weight < 1) return res.status(400).json({Error:"Invalid request"});

    // Creates new exercises if valid
    exercise.createExercise(req.body.name,req.body.reps, req.body.weight, req.body.unit, req.body.date)
      .then(newExercise => {
        res.status(201).json(newExercise);
      })
      .catch(error=>{
        console.error(error);
        res.status(400).json({Error:'Invalid request'});
      });
});

//  Read database of exercises
app.get('/exercises',(req,res)=>{
  let filter = {};
  exercise.findExercises(filter)
    .then(exercises => {
      res.send(exercises);
    })
    .catch(error=>{
      console.error(error);
      res.send({Error:"Invalid request"});
    })
})

// Get exercise using ID
app.get('/exercises/:_id',(req,res)=>{
  const exerciseId = req.params._id;
  exercise.findExerciseById(exerciseId)
    .then(exercises =>{
      if(exercises !== null){
        res.json(exercises);
      }else{
        res.status(404).json({Error:"Not Found"});
        }
      })
      .catch(error=>{
        res.status(404).json({Error:"Not Found"});
    })
})


// Update exercise
app.put('/exercises/:_id',(req,res)=>{

  // Validates to make sure all update inputs are valid
  const format = /^\d\d-\d\d-\d\d$/;
  const formatted = format.test(req.body.date);
  if(!formatted)return res.status(400).json({Error:"Invalid request"});
  if(req.body.name.length < 1) return res.status(400).json({Error:"Invalid request"});
  if(req.body.reps < 1) return res.status(400).json({Error:"Invalid request"});
  if(req.body.weight < 1) return res.status(400).json({Error:"Invalid request"});
  exercise.updateById(req.params._id,req.body.name,req.body.reps,req.body.weight,
                      req.body.unit,req.body.date)
      .then(numUpdated=>{
        if(numUpdated===1){
          res.json({_id: req.params._id,name: req.body.name,reps: req.body.reps,
                  weight: req.body.weigh,unit: req.body.unit,date: req.body.date})
        } else{
          res.status(404).json({Error:"Not Found"});
        }
      })
      .catch(error=>{
        res.status(400).json({Error:"Invalid Request"})
      });
});



// Delete using ID
app.delete('/exercises/:_id',(req,res)=>{
  exercise.deleteById(req.params._id)
    .then(deletedCount =>{
      if(deletedCount === 1){
        res.status(204).send();
      } else {
        res.status(404).json({Error: 'Not Found'});
      }
    })
    .catch(error=>{
      console.error(error);
      res.send({Error:'Not Found'});
    });
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

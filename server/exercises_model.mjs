import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI ||
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exercisesSchema);

// Create an exercise
const createExercise = async(name,reps,weight,unit,date)=>{
  const exercise = new Exercise({name:name, reps:reps, weight:weight, unit:unit, date:date});
  return exercise.save();
}


// Retrieve database
const findExercises = async(filter)=>{
  const query = Exercise.find(filter);
  return query.exec();
}

// Find exercise By Id
const findExerciseById = async(exerciseId)=>{
  const query =  Exercise.findById({"_id":exerciseId});
  return query;
}

// Delete by Id
const deleteById = async(exerciseId)=>{
  const query = await Exercise.deleteOne({_id:exerciseId});
  return query.deletedCount;
}

// Update by Id
const updateById = async(exerciseId,name,reps,weight,unit,date)=>{
  const query = await Exercise.updateOne({_id:exerciseId},{name:name,reps:reps,weight:weight,unit:unit,date:date});
  return query.modifiedCount;
}

export { createExercise, findExercises, findExerciseById, deleteById, updateById };

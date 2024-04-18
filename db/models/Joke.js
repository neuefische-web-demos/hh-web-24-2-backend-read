import mongoose from "mongoose";

const { Schema } = mongoose;

const jokeSchema = new Schema({
  joke: { type: String, required: true },
});

// on the first run, mongoose.models.Joke is empty so mongoose.model("Joke", jokeSchema) is run;
// on subsequent runs the value of mongoose.models.Joke is a model
const Joke = mongoose.models.Joke || mongoose.model("Joke", jokeSchema);

export default Joke;

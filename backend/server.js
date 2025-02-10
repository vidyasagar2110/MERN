require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const workoutRoutes = require('./routes/workouts');



app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
const uri = process.env.MONG_URI;
const port = process.env.PORT || 4000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log('listening on port', port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
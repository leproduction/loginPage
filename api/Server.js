const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors module
const app = express();
const port = 5000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB (replace 'your_database_url' and 'your_database_name' with your actual MongoDB URL and database name)
mongoose.connect('mongodb+srv://emailPromotion:port@emailpromotion.ntuycyb.mongodb.net/?retryWrites=true&w=majority');
// Define a schema for the emails
const emailSchema = new mongoose.Schema({
  email: String,
});
const Email = mongoose.model('Email', emailSchema);
// Define a route for handling email submission
app.post('/submitEmail', async (req, res) => {
  try {
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    // Assuming the email is sent successfully, you can customize this part
    // In a real-world scenario, you might use a dedicated email service
    // (e.g., Nodemailer for Node.js applications) to send emails.

    // For demonstration purposes, I'm just logging the email data.
    console.log('Received email:', req.body.email);

    // Respond with a success message
    res.status(200).json({ message: 'Email submitted successfully' });
  } catch (error) {
    console.error('Error submitting email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
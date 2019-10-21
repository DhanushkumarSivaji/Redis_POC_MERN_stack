const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys')
require('./middleware/cache')
app.use(cors()) 

// Connect Database
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useFindAndModify: false
});

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

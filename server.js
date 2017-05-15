// Require modules (similar to Angular Dependency Injection)
const express = require('express');
const app = express();
const path = require('path');

// Tell express to make all files in `/src` available
app.use(express.static('src'));

// Setup the default route to serve the index page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/src/index.html'));
});

// Either use the Heroku port, or use 4200
const port = process.env.PORT || 4200;

// Start the web server
app.listen(port, () => {
    console.log('App listening on port ' + port);
});

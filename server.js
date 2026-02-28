const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

// app instance
const app = express();

// serve static files from public-folder (express middleware)
app.use(express.static(path.join(__dirname, 'public')));

// log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Don't forget to call next()!
});

// root route -> serve from public folder
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// about route -> serve from public folder
app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// contact route -> serve from public folder
app.get('/contact', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// get-route for /api/time
app.get('/api/time', (req,res) => {
    res.json({
        datetime: new Date().toISOString(),
        timeStamp: Date.now()
    });
});

// error handling - 404
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// error handling - 500
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('\nAvailable routes:');
    console.log('  GET /              -> Home page');
    console.log('  GET /about         -> About page');
    console.log('  GET /contact       -> Contact page');
    console.log('  GET /api/time      -> Current date/time API');
    console.log('\nPress Ctrl+C to stop the server\n');
});
const express = require('express');
const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
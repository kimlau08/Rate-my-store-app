//Command to start "node index.js"
//Image files will be server from ./public folder

const express = require('express');
const app = express();
const PORT = 8899;

//files will be served from ./public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Connected Express.js server!');
});

//To connect from client: http://localhost:8899/
app.listen(PORT, () => console.log(`Express server listening on port: ${PORT}`));
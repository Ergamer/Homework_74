const express = require('express');
const app = express();
const messages = require('./app/messages');

const port = 8000;


app.use(express.json());
app.use('/messages', messages);
app.listen(port, () => {
    console.log(`Server started on ${port} port!`)
});


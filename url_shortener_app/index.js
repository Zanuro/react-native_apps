const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(express.static('./public'));


app.get('/url/:id',(req,res) => {
    // Info url
})

app.get('/:identifier',(req,res) => {
    //
})

app.post('/url',(req,res) => {
    // Create url
})



const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
})
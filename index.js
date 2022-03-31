const { application } = require('express');
const express = require('express');
const connectToMongo = require('./db');
const notes = require('./routes/notes')
const auth =  require('./routes/auth');


connectToMongo();
const app = express();
const port = process.env.PORT || 3000;


// middleware are the functions that runs in b/w when the server get req and give response
app.use(express.json());
app.use('/api/notes',notes);
app.use('/api/auth', auth)


app.get('/',(req,res) => {
    res.send("This is home page .... ");
});




app.listen(port,() =>{
    console.log(`The app is running at port ${port}`);
})


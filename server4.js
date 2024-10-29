const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv'); 
const cors = require('cors');

dotenv.config(); 

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME  
});

db.connect((err) => {
    if (err) return console.log("Error connecting to the server:", err);

    console.log("Connected as id:", db.threadId);

    
    app.get('', (req,res) => {
        db.query
            ('SELECT* FROM providers ORDER BY provider_specialty', (err, data)=>{
            if (err){
                console.log(err);
                res.statusMessage(500).send('Error retrieving data');
                
            }
            else{
               
              res.status(200).send(data)
            }
        })})
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        console.log('Sending message to browser...');
    });
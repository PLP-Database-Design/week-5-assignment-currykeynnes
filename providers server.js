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

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.get('/data', (req,res) => {
        db.query
            ('SELECT* FROM providers', (err, results)=>{
            if (err){
                console.log(err);
                res.statusMessage(500).send('Error retrieving data');
                
            }
            else{
              res.render('data', {results: results});  
            }
        })
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        console.log('Sending message to browser...');
    });
});


app.get('/', (req, res) => {
    res.send('Server started successfully');
});

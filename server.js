


const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false},
        port: 5432,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER ,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();



app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {

    res.send('success');
})

app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register',(req,res) =>  {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) =>  {profile.handleProfile(req,res,db)})
app.put('/image', (req, res) =>  {image.handleImage(req,res,db)})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});



/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
*/
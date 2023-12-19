


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
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
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

app.listen(3000, () => {
    console.log("App is running on port 3000");
});



/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
*/
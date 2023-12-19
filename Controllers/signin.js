const handleSignin = (db,bcrypt) =>(req,res)=> {
    // Load hash from your password DB.
    // bcrypt.compare("choco", '$2a$10$QwmBGPa.HKT5KE1esDoU7Odtjm7.YnG2RJUvyHwgn2p/DrPUFXoOW', function (err, res) {
    //     console.log('first guess', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$QwmBGPa.HKT5KE1esDoU7Odtjm7.YnG2RJUvyHwgn2p/DrPUFXoOW', function (err, res) {
    //     console.log('second guess', res);
    // });
    const { email, password } = req.body;
    if(!email || !password){
      return  res.status(400).json("Incorrect form submission");
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            }
            else {
                res.status(400).json('Wrong Credentials')
            }

        })
        .catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {
    handleSignin: handleSignin
};
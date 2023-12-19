const handleProfile = (req,res,db) =>{
    const { id } = req.params;

    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    db.select('*').from('users').where({ id }).then(user => {

        if (user.length) { res.json(user[0]); }
        else {
            res.status(400).json('Not Found')
        }
    })
        .catch(err => res.status(400).json('User Not Found'))
}

module.exports = {
    handleProfile: handleProfile
};
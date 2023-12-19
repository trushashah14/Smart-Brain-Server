

const handleImage = (req,res,db) =>{
    const { id } = req.body;
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if (!found) {
    //     res.status(400).json("Not found")
    // }
    db('users').where('id', '=', id)
        .increment(
            'entries', 1).returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage:handleImage
};

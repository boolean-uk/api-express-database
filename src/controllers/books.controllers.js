const usersRepository = require('../repositories/users.repository')

const getAllUsers = (req, res) => {
  return usersRepository.getAllUsers()
    .then( users => res.json({users}))
    .catch(()=> {
      res.status(500)
      res.json({ error: 'an error occurred'})
    })
}

const addUser = (req, res) => {

  if (!req.body.email) {
    res.status(400)
    res.json({error: 'email is required'})
    return
  }

  if (!req.body.name) {
    res.status(400)
    res.json({error: 'name is required'})
    return
  }

  const user = {
    email: req.body.email,
    name: req.body.name,
  }

  return usersRepository.addUser(user)
    .then(user => res.json({user}))
    .catch(()=> {
      res.status(500)
      res.json({ error: 'an error occurred'})
    })
}

module.exports = { 
  getAllUsers,
  addUser
}
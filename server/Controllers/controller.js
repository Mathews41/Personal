const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const {email, username, password, profile_pic} = req.body
    const db = req.app.get('db')
    const foundUser = await db.find_user([email])
    if (foundUser[0]) {
        return res.status(409).send('Pick number 3 ma lord')
    }

    const passwordSalt = bcrypt.genSaltSync(15) 
    const passwordHash = bcrypt.hashSync(password,passwordSalt)
    const newUser = await db.register_user([email,passwordHash,username,profile_pic])
    delete newUser[0].password
    req.session.user = newUser[0]
    console.log(req.session,'sessions')
    res.status(200).send(newUser[0])
}
const login = async (req, res) => {
    const {email, password} = req.body
    const db = req.app.get('db')
    const foundUser = await db.find_user([email])
    if(!foundUser[0]){
        return res.status(403).send('who dis')
    }
    const authedPassword = bcrypt.compareSync(password, foundUser[0].password)
    
    if(authedPassword){
        delete foundUser[0].password
        console.log(foundUser[0],'users')
        res.status(200).send(foundUser[0])
    }else {
        res.status(401).send('dont you know your email or password fool')
    }
    }
    const logout = (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session.user)
        
    }

    const getUser = (req, res) => {
        res.status(200).send(req.session.user)
    }
    module.exports = {
        register,
        login,
        logout,
        getUser
}
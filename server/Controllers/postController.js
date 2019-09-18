const getPost = async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    const foundPost = await db.get_one([id])
    req.session.currentpost = id
    return res.status(200).send(foundPost[0])
}

const getPosts = async (req, res) => {
    const db = req.app.get('db')
    const foundPosts = await db.get_all()


    return res.status(200).send(foundPosts)
}

const addPost = async (req, res) => {
    let{user_id, title, name, make, model, year, profile_pic, content} = req.body
    const db = req.app.get('db')
    const updatedPosts = await db.create_new_post([user_id, title, name, make, model, year, profile_pic, content])
    return res.status(200).send(updatedPosts)
}

module.exports = {
    getPost,
    getPosts,
    addPost
}
const getPost = async (req, res) => {
    let {id} = req.params
    console.log(id)
    const db = req.app.get('db')
    const foundPost = await db.get_one([id])
    req.session.currentpost = id
    console.log(foundPost[0])
    return res.status(200).send(foundPost[0])
}

const getPosts = async (req, res) => {
    const db = req.app.get('db')
    const foundPosts = await db.get_all()


    return res.status(200).send(foundPosts)
}

const addPost = async (req, res) => {
    let{user_id, title, name, make, model, year, URL, content} = req.body
    const db = req.app.get('db')
    const updatedPosts = await db.create_new_post([user_id, title, name, make, model, year, URL, content])
    return res.status(200).send(updatedPosts)
}
const updatePost = (req,res) => {
    const {title, make, model, year, picture, content} =req.body
    console.log(title,content,picture)
    const {id} = req.params;
    console.log(id)

    const db = req.app.get('db')
    db.update_post([title, make, model, year, picture, content, id]).then(() => {
        res.status(200).send('these are fresh')
    })
}
const deletePost = async (req,res) => {
    const{id} = req.params
    const db = req.app.get('db')
    db.delete_post(id).then(() => {
        res.status(200).send('theyre gone')
    })
}

module.exports = {
    getPost,
    getPosts,
    addPost,
    updatePost,
    deletePost

}
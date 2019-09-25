import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Dashboard.css'
import {searchUsers, addUser} from '../../Redux/reducer'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
           includeMyPosts: true,
           displayPosts:[],
           filteredPosts:[],
           data: []
        }
    }

    componentDidMount(){
        // console.log(this.props)
        axios.get('api/post/getAll').then((res) => {
            const display = this.dataDisplay(res.data)
            console.log(res.data)
            this.setState({displayPosts: display})
            this.setState({data:res.data})
            console.log(this.state.data)
        })
    }
    dataDisplay = (temp) => {
        console.log(temp)
        let data = temp.map((e, i) => {
            console.log(e)
            return <Link className='link' to={`/post/${e.id}`}>
            <div className='my-posts-container' key={i}>
                <div className='userid'>{e.userId}</div>
                <div><img className='url' src={e.url}></img></div>
               <div className='title'>{e.title} </div>
                <div className='make'>{e.make}  </div>
                <div className='model'>{e.model}</div>
                <div className='year'>{e.year}</div> 
                </div>
            </Link>
        })
        return data
    }
    searchBar = () => {
        const {search} = this.state
        const {userId} = this.props
        axios.get(`/api/posts/:userid?title=${search}&userposts=${!this.state.userposts}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log(res.data)
        })
    }

    flipPost = () => {
        this.setState({
            userposts: !this.state.userposts
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPosts = () => {
        axios.get('/api/posts').then(res => {
            this.setState({
                posts: res.data
            })
        })
    }
    // handleSearchInput = (e) => {
    //     console.log(e.target.value)
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    //     const filteredPosts = this.state.displayPosts.filter(post => post.title.includes(e.target.value))
    //     console.log(filteredPosts)
    //     this.setState({
    //         filteredPosts: filteredPosts
    //     })
    // }
    render() {
        let posts = []
        console.log(this.state.data)
        this.state.includeMyPosts ?
            posts = this.state.data
            :
            posts = this.state.data.filter(post => post.user_id !== this.props.state.user.id) 
        posts = this.dataDisplay(posts)
        console.dir(posts)
        return (
            <div className="dashboard-container">

                
                    <div className = 'otherotherbox'>
                    <div className='posts-container'>
                    {posts}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps, {searchUsers, addUser}) (Dashboard)

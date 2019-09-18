import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Dashboard.css'
import Postlisting from './PostListing/PostListing'
import {searchUsers, addUser} from '../../Redux/reducer'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
           search: '',
           includeMyPosts: true,
           displayPosts:[]
        }
    }

    componentDidMount(){
        // console.log(this.props)
        axios.get('api/post/getAll').then((res) => {
            // console.log(res.data)
            this.setState({displayPosts: res.data})
        })
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
    handleSearchInput = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        const filteredPosts = this.props.allPosts.filter(post => post.title.includes(e.target.value))
        console.log(filteredPosts)
        this.setState({
            displayPosts: filteredPosts
        })
    }
    render() {
        let posts = []
        this.state.includeMyPosts ?
            posts = this.state.displayPosts
            :
            posts = this.state.displayPosts.filter(post => post.user_id !== this.props.user.id) 
        
        const listedPosts = posts.map((post, i) => {
            return <Postlisting key={i} post={post}/>
        })
        return (
            <div className="dashboard-container">
                <div className='top-nav-container'>
                    <div className="top-nav">
                        <div className="searchbar-feature">

                                <input value={this.state.search} className="searchbar" name='search' onChange={this.handleSearchInput} placeholder="Search..."/>

                            <button className="reset" onClick={this.resetSearch}>X</button>
                        </div>
                        <div className='my-posts-container'>
                            <label>Exclude My Posts</label>
                            <input className='input-checkbox' onClick={() => this.setState({includeMyPosts: !this.state.includeMyPosts})} type="checkbox"/>
                        </div>
                    </div>
                </div>
                <div className='posts-container'>
                    {listedPosts}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps, {searchUsers, addUser}) (Dashboard)

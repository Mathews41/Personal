import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import axios from 'axios'
import {selectPost} from '../../../Redux/reducer'


class PostListing extends Component {
    findListing = () => {
        console.log(this.props.post.id)
        axios.get(`/api/post/${this.props.post.id}`).then(res => {
            console.log(res.data)
            this.props.selectPost(res.data)
        })
    }
    render() {
        const {post} = this.props
        const path = `/post/${post.id}`
        return (
        <Link className='postLink' to={path} onClick={this.findListing}>
            <div className='articleListing'>
                <div className='title'>
                    <h1>{post.title}</h1>
                </div>
                <div>
                    <h6 className='username'>{post.username}</h6>
                    <img className='smallPic' src={post.profile_pic} alt='profile'/>
                </div>
                
            </div>
        </Link>
        )
    }
}

function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps, {selectPost})(PostListing)
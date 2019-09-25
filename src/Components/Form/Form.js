import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Form.css'
import {addPost} from '../../Redux/reducer'

class Form extends Component {
    constructor(){
        super()
        this.state = {
            title:'',
            make:'',
            model:'',
            year:'',
            URL:'',
            content:''
        }
    }
    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitPost = () => {
        const {user_id, title, name, make, model, year, URL, content} = this.state
        const addPost = {...this.props.user, user_id, title, name, make, model, year, URL, content}
        console.log(addPost)
        axios.post('/api/post/add', addPost).then(res => {
            console.log(res.data)
            this.props.history.push('/dashboard')

            axios.get('api/post/getAll').then((res) => {
                // console.log(res.data)
                this.setState({displayPosts: res.data})
            })
        })
        
    }


    render() {
        return (
            <div className='form-background'>
                <div className='form-container'>
                    
                    <div className='form-input'>
                        <label>Title</label>
                        <input type='text' name='title' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>Make</label>
                        <input type='text' name='make' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>Model</label>
                        <input type='text' name='model' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>Year</label>
                        <input type='int' name='year' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>URL</label>
                        <input type='text' name='url' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>Content</label>
                        <input type='text' name='content' onChange={this.handleInput}></input>
                    </div>
                
                    <button onClick={this.submitPost}>Submit</button>


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {addPost})(Form)

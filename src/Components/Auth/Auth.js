import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {addUser} from '../../Redux/reducer'
import './Auth.css'
import logo from '../Nav/IMG_2959.JPG'





class Auth extends Component {
    constructor(){
        super()

        this.state = {
            display: true,
            email: '',
            password: '',
            error: false,
            errorMessage: '',
        }
    }
    changeDisplay = () => {
        this.setState({
            display: !this.state.display,
            email: '',
            username: '',
            password: '',
            profile_pic: '',
            error: false,
            errorMessage: '',
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = () => {
        const {email, password} = this.state
        axios.post('/auth/login', {email, password})
        .then(response => {
            this.props.addUser(response.data)
            if(this.state.error !== true){
                this.props.history.push('/dashboard')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    register = () => {
        const {email, username, password, profile_pic} = this.state;
        axios.post('/auth/register',
        {email,username,password,profile_pic})
        .then(response => {
            console.log(response.data)
            this.props.addUser(response.data)
            
            this.props.history.push('/dashboard')
        })
        .catch(error => {
            console.log(error)
    })

}
    render() {
        console.log(this.props)
        return (
            <div className='otherbox'>
               

            <div className='auth-container'>
                {
                    this.state.error ?
                    (
                        <div className='error'>
                            {this.state.errorMessage}
                        </div>
                    )
                    :
                    null
                }
                {
                    this.state.display ? 
                    (<div className={
                        this.state.error ?
                        'login-container shake'
                        :
                        'login-container'
                    }>
                 <img className='logo' src={logo}></img>
                        
                    <input type = 'email'
                        placeholder = ' Email'
                        className = 'login-input'
                        name = 'email'
                        value = {this.state.email}
                        onChange = {this.handleChange}/>
                    <input type = 'password'
                        placeholder = 'Password'
                        className = 'login-input'
                        name = 'password'
                        value = {this.state.password}
                        onChange = {this.handleChange}/>
                    <button className = 'btn-login'
                        onClick={this.login}>Login</button> 
                    <button className = 'btn-register'
                        onClick={this.changeDisplay}>Register</button> 
                        </div>   
                        )
                        :
                        (<div className='register-container'>
                        <input type = 'email'
                            placeholder = ' Email'
                            className = 'login-input'
                            name = 'email'
                            value = {this.state.email}
                            onChange = {this.handleChange}/>
                        <input type = 'password'
                            placeholder = 'Password'
                            className = 'login-input'
                            name = 'password'
                            value = {this.state.password}
                            onChange = {this.handleChange}/>
                        <input type = 'username'
                            placeholder = 'Username'
                            className = 'login-input'
                            name = 'username'
                            value = {this.state.username}
                            onChange = {this.handleChange}/>
                        <input type = 'profile_pic'
                            placeholder = 'Profile Picture URL'
                            className = 'login-input'
                            name = 'profile_pic'
                            value = {this.state.profile_pic}
                            onChange = {this.handleChange}/>
                        <button className = 'btn-login'
                            onClick={this.register}>Signup</button>
                        <button className = 'btn-login'
                            onClick={this.changeDisplay}
                            >Cancel</button>
                        </div>)
                }
                
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addUser}) (Auth)

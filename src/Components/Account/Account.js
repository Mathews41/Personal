import React, { Component } from 'react'
import './Account.css'

export default class Account extends Component {
    constructor() {
        super()
        this.state = {
            username:'',
            password:'',
            profile_pic:''
        }
    }
    render() {
        return (
                <div className='Account-background'>
                <div className='Account-container'>
                    <h3>Account Info</h3>
                    <div className='account-input'>
                        <label>Username</label>
                        <input type='text' name='username' onChange={this.handleInput}></input>
                    </div>
                    <div className='account-input'>
                        <label>Email</label>
                        <input type='email' name='email' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>password</label>
                        <input type='password' name='password' onChange={this.handleInput}></input>
                    </div>
                    <div className='form-input'>
                        <label>Profile Picture</label>
                        <input type='URL' name='profilepic' onChange={this.handleInput}></input>
                    </div>
                    
                </div>
                <div className='submit-btn'>
                    <button>Submit</button>
                </div>

                
            </div>
        )
    }
}

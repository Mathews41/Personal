import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Navbar.css'
import {reloadUser} from '../../Redux/reducer'
import axios from 'axios'
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../Nav/eda14f46-7fa9-4d0b-8644-3ef642999da2_200x200.png'





class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            toggleMenu: false,
        }
    }

    logout = () => {
        axios.delete('/auth/logout')
    }
    componentDidMount(){
        axios.get('/auth/user').then((res) => {
            this.props.reloadUser(res.data)
        })
    }
            slide = () => {
        this.setState ({
            toggleMenu: !this.state.toggleMenu
        })

        }
        
        
    
    render() {
        if (this.props.location.pathname !== '/'){
        return (
            <div className='navbar'>
                <Link to='/account'>
                <img className='profilepic' src={this.props.profile_pic} />
                </Link>
                <img src= {logo} alt ='logo'></img>
                <MenuIcon className='hamburger' onClick={this.slide}></MenuIcon>
                

                <div className={
                    this.state.toggleMenu ?
                     'slide menu'
                    :
                    'menu'
                    }>
                        
                <Link to ='/dashboard'>
                    Dashboard
                </Link>
                <Link to='new'>
                    New Post
                </Link>
                <Link to ='/' onClick={this.logout}>
                    Logout
                </Link>
                </div>
                
                
            </div>
        )
        } else {
            return null
        }
    }
}
function mapStateToProps(reduxState) {
    const {username, userId, profile_pic} = reduxState
    return {username, userId, profile_pic}
}


export default withRouter(connect(mapStateToProps, {reloadUser})(Navbar))
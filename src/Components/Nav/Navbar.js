import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Navbar.css'
import {reloadUser} from '../../Redux/reducer'
import axios from 'axios'
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../Nav/eda14f46-7fa9-4d0b-8644-3ef642999da2_200x200.png'
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'





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
       console.log(this.props.profile_pic)

        if (this.props.location.pathname !== '/'){
        return (
            <div className='navbar'>
                <Link to='/account'>
                <Grid container justify="center" alignItems="center">
            <Avatar alt="profile" src={this.props.profile_pic} className='avatar' />
                </Grid>
                {/* <img className='profilepic' src={this.props.profile_pic} /> */}
                </Link>
                <Link to='/dashboard'>
                <img className='logo' src= {logo} alt ='logo'></img>
                </Link>
                <MenuIcon className='hamburger' onClick={this.slide}></MenuIcon>
                

                <div className={
                    this.state.toggleMenu ?
                     'slide menu'
                    :
                    'menu'
                    }>
                        
                <Link to ='/dashboard'>
                   <div onClick={this.state.toggleMenu}> Dashboard</div>
                </Link>
                <Link to='new'>
                    New Post
                </Link>
                <Link to='myVehicles'>
                    My Vehicles
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
    const {email,username, id, profile_pic} = reduxState.user
    return {email,username, id, profile_pic}
    
}


export default withRouter(connect(mapStateToProps, {reloadUser})(Navbar))
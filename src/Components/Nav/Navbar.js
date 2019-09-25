import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Navbar.css'
import {reloadUser} from '../../Redux/reducer'
import axios from 'axios'
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../Nav/IMG_2959.JPG'
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
                <div className='navbaritems'>
                <Grid id='avatar'>
            <Avatar alt="profile"  src={this.props.profile_pic} id='avatar' />
                </Grid>
                <Link to='/dashboard'>
                <img className='logo' src= {logo} alt ='logo'></img>
                </Link>
                <MenuIcon className='hamburger' onClick={this.slide}></MenuIcon>
                </div>
                

                <div className={
                    this.state.toggleMenu ?
                     'slide menu'
                    :
                    'menu'
                    }>
                        
                <Link to ='/dashboard'>
                   <div onClick={this.state.toggleMenu}> Dashboard</div>
                </Link>
                <Link to='/new'>
                    New Post
                </Link>
                {/* <Link to='myVehicles'>
                    My Vehicles
                </Link> */}
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
import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Dashboard from './Components/Dashboard/Dashboard'
import Auth from './Components/Auth/Auth'
import Post from './Components/Post/Post'
import Form from './Components/Form/Form'
import Account from './Components/Account/Account'

export default (
    <Switch>
        <Route exact path = '/' component={Auth}/>
        <Route  path = '/dashboard' component={Dashboard}/>
        <Route  path = '/post/:id' component={Post}/>
        <Route  path = '/new' component={Form}/>
        <Route  path = '/account' component={Account}/>
        

    </Switch>
)
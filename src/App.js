import React, {Component} from 'react';
import './App.css';
import routes from './routes'
import Navbar from './Components/Nav/Navbar'

import 'reset-css'


class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Navbar />
        {routes}
      </div>
    )
  }
}

export default App;

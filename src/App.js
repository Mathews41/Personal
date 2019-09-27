import React, {Component} from 'react';
import 'reset-css'
import './App.css';
import routes from './routes'
import Navbar from './Components/Nav/Navbar'



class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <div className="nav-spacer">
          <Navbar />
        </div>
        <div className='mainContent'>
          {routes}
        </div>
      </div>
    )
  }
}

export default App;

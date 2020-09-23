import React from "react";
import {BrowserRouter,Route,Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Users from './component/users/Users'
import Dashboard from './component/users/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Container className='p-3'>
     <div>
       <form align='right'>
       <Link to='/'>Register</Link>|
      <Link to='/dashboard'>Dashboard</Link>
       </form>
       <Route path='/' component={Users} exact={true}/>
       <Route path='/dashboard' component={Dashboard}/>
    </div>
    </Container>
    </BrowserRouter>
  );
}
export default App;

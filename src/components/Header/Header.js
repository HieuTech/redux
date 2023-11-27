import {NavLink, useNavigate} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ()=> {
  const navigate = useNavigate()

  const handleLogin=()=>{
    navigate('/login')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">Hieu Java</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <NavLink to="/" className='nav-link'>Home</NavLink>
           <NavLink to="/users" className='nav-link'>User</NavLink>
           <NavLink to="/admin" className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
          <button className='btn btn-login' onClick={()=>{
            handleLogin()
          }} >Log In</button>
          <button className='btn btn-signup' onClick={()=>{
            navigate('/signup')
          }} >Sign Up</button>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
              {/* <NavLink to='/login' className='nav-link' >Log In</NavLink>
              <NavDropdown.Item >Log Out</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item> */}

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
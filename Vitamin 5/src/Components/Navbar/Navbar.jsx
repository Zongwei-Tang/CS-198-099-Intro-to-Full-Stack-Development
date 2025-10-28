import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>My Website</h1>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/nothome">Not Home</Link>
      </div>
    </nav>
  );
};

export default Navbar

// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm px-4"
      style={{
        background: 'linear-gradient(to right, #fbeeff, #e0d4fd)',
        borderBottom: '1px solid #ddd',
        borderRadius: '0 0 1rem 1rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem'
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            color: '#6c3483',
            fontSize: '1.5rem',
          }}
        >
          🧠 Content Planner
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
                style={{
                  color: location.pathname === '/' ? '#6c3483' : '#333',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                }}
              >
                All Content
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                to="/dashboard"
                style={{
                  color: location.pathname === '/dashboard' ? '#6c3483' : '#333',
                  fontWeight: location.pathname === '/dashboard' ? 'bold' : 'normal'
                }}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
                to="/create"
                style={{
                  color: location.pathname === '/create' ? '#6c3483' : '#333',
                  fontWeight: location.pathname === '/create' ? 'bold' : 'normal'
                }}
              >
                Create Content
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

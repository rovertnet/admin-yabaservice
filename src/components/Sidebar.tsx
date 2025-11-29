import React from 'react';
import { FaBox, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaStar, FaTools, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/users', icon: <FaUsers />, label: 'Utilisateurs' },
    { path: '/providers', icon: <FaTools />, label: 'Prestataires' },
    { path: '/services', icon: <FaBox />, label: 'Services' },
    { path: '/bookings', icon: <FaCalendarAlt />, label: 'Réservations' },
    { path: '/subscriptions', icon: <FaStar />, label: 'Abonnements' },
  ];

  return (
    <div style={{
      width: '260px',
      background: '#1a202c',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src='../../public/logokinhelp2.png'  style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Kinhelp Admin</h2>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.875rem 1rem',
                  borderRadius: '10px',
                  color: isActive ? 'white' : '#a0aec0',
                  background: isActive ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                })}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.875rem 1rem',
          background: 'rgba(255,255,255,0.05)',
          border: 'none',
          borderRadius: '10px',
          color: '#fc8181',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          fontSize: '1rem',
          marginTop: 'auto'
        }}
      >
        <FaSignOutAlt />
        Déconnexion
      </button>
    </div>
  );
};

export default Sidebar;

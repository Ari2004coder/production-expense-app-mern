import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'; // Keep UserOutlined for now

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loguser, setLogtuser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLogtuser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };

  const getLinkClass = (path) => {
    const baseClasses = "block px-4 py-2 hover:bg-gray-700 rounded md:hover:bg-transparent";
    const activeClasses = "text-blue-400 border-b-2 border-blue-400";
    return `${baseClasses} ${location.pathname === path ? activeClasses : ''}`;
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between relative">
      <div className="text-2xl font-extrabold">Exapanso</div>
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        &#9776;
      </button>
      <ul className={`flex-col md:flex-row md:flex absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ${open ? 'flex' : 'hidden'} md:items-center md:space-x-6 z-50`}>
        <li className="border-b md:border-none">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
        </li>
        <li className="border-b md:border-none">
          <Link to="/expenses" className={getLinkClass("/expenses")}>Expenses</Link>
        </li>
        <li className="border-b md:border-none">
          <Link to="/incomes" className={getLinkClass("/incomes")}>Incomes</Link>
        </li>
        <li className="border-b md:border-none">
          <Link to="/reports" className={getLinkClass("/reports")}>Reports</Link>
        </li>
        {/* Profile Part Redesign */}
        <li className="border-b md:border-none">
          <Link  to='/profile' className="flex items-center px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors duration-200">
            <UserOutlined className="text-lg mr-2" /> {/* Larger icon, margin-right */}
            <span className="text-base font-medium">{loguser && loguser.name}</span> {/* Slightly larger text, medium font weight */}
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 rounded md:hover:bg-blue-700 cursor-pointer bg-blue-500">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

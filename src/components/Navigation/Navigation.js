import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className="nav-container">
      <Link className="nav-container__link" to={`/`}>На главную</Link>
    </div>
  )
}

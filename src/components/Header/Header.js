import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <Link className="header__logo" to={`/`}></Link>
      <h1 className='header__title'>Pokemons</h1>
    </div>
  )
}

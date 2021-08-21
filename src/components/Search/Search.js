import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    pokemonFetchData
   } from '../../store/actions/pokemons';
import './Search.css';

export default function Search() {

    const dispatch = useDispatch();
    const [ searchInput, setInputOne ] = useState('');

    const getPokemon = (event) => {
        event.preventDefault();
        if (searchInput !== '') {
          dispatch(pokemonFetchData(`https://pokeapi.co/api/v2/pokemon/${searchInput}`));
        }
      }

    return (
        <form className='search-form' onSubmit={ getPokemon }>
          <label className='search-title'>
            Введите название покемона:
          </label>
          <div className='search-field'>
            <input 
            className='search-input' 
            type="text" value={searchInput} 
            onChange={(event) => setInputOne(event.target.value)}
            />
            <button className="search-button" type="submit">
              <div className="search-button__image"></div>
            </button>
          </div>
        </form>
    )

}

import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {
    pokemonsListFetchData, 
    listOpen
   } from '../../store/actions/pokemons';
import './PokemonsList.css';

export default function PokemonsList() {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pokemonsListFetchData('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'))
    }, [dispatch]);

    const pokemonsListIsOpen = () => {
        dispatch(listOpen());
    }

    const getNextPokemonsList = (event) => {
        event.preventDefault();
        dispatch(pokemonsListFetchData(`${state.pokemonsList.next}`)); 
    }
      
    const getPreviousPokemonsList = (event) => {
        event.preventDefault();
        dispatch(pokemonsListFetchData(`${state.pokemonsList.previous}`)); 
    }

    return (
        <div className="pokemons-list-container">
            <div className="icon-list">
                <p className="icon-list__text">Список покемонов</p>
                <div className={`icon-list__img_${state.listIsOpenBoolean}`} onClick={pokemonsListIsOpen}></div>
            </div>
            {(state.listIsOpenBoolean && state.pokemonsList) &&
                <div className='pokemons-list'>
                <ul className="pokemons-list__container">
                    {state.pokemonsList.results.sort((a, b) => {
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                    }).map((pokemon, index) => {  
                    return <Link className="pokemons-list__link" key={index} to={`/pokemon/${pokemon.url.match(/\d+(?=\D*$)/)}`}>
                        <li className="pokemons-list__card" key={index}>
                        <p className='pokemons-list__name'>
                        {pokemon.name}
                        </p>
                        </li>
                    </Link>})
                    }
                </ul>

                <div className="pokemons-list-container__buttons">
                    {state.pokemonsList.previous && 
                    <button className="pokemons-list-container__button_previous" onClick={ getPreviousPokemonsList }>Предыдущие</button>
                    }            
                    {(state.pokemonsList.next) && 
                    <button className="pokemons-list-container__button_next" onClick={ getNextPokemonsList }>Следующие</button>
                    }
                </div>

                </div>         
            }
        </div>
    )

}
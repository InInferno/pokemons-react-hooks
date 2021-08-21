import React, { useEffect } from 'react';
import './Pokemons.css';
import { useDispatch, useSelector } from "react-redux";
import { 
  pokemonsFetchData
 } from '../../store/actions/pokemons';
import { Link } from 'react-router-dom';
import PokemonsList from '../PokemonsList/PokemonsList';
import Search from '../Search/Search';

export default function Pokemons() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(pokemonsFetchData('https://pokeapi.co/api/v2/pokemon'))
  }, [dispatch]);

  const getNextPokemons = (event) => {
    event.preventDefault();
    dispatch(pokemonsFetchData(`${state.pokemons.next}`));
  }

  const getPreviousPokemons = (event) => {
    event.preventDefault();
    dispatch(pokemonsFetchData(`${state.pokemons.previous}`));
  }

    return (
      <div className='page'>

        {/*Форма поиска  */}
        <Search />

        {/* Прелоадер */}
        {(state.isFetchStart) &&
          <div className='preloader'></div>
        }
        
        {/* Блок ошибки */}
        {(state.isFetchError) &&
          <h2 className='error-block'>{state.isFetchError}</h2>
        }  

        {/* Карточка покемона при поиске */}
        {state.pokemon &&
          <Link className="pokemons-list__link" to={`/pokemon/${state.pokemon.id}`}>
            <div className='pokemon-card pokemon-card_single-search'>
              <p className='pokemon-card__name'>
                {state.pokemon.name[0].toUpperCase() + state.pokemon.name.substring(1)}
              </p>
              <div className="pokemon-card__images">
                <img 
                  className="pokemon-card__image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.pokemon.id}.png`}
                  alt='pokemon'/>
              </div>
            </div>
          </Link>
        }

        {state.pokemons &&
        <div className="container">

          {/* Выпадающий список покемонов */}
          <PokemonsList />

            {/* Покемоны на главной странице */}
          <div className="pokemons-container">
            <ul className="pokemons-card-container">
              {state.pokemons.results.map((pokemon, index)=> {
                return <Link className="pokemon-card__link" key={index} to={`/pokemon/${pokemon.url.match(/\d+(?=\D*$)/)}`}>
                <li className="pokemon-card" key={index}>
                          <p className='pokemon-card__name'>
                            {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                          </p>
                          <div className="pokemon-card__images">
                            <img 
                            className="pokemon-card__image" 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.match(/\d+(?=\D*$)/)}.png`} 
                            alt='pokemon'/>
                          </div>
                        </li>
                  </Link>
                })
              }
            </ul>
            <div className="pokemons-container__buttons">
              {state.pokemons.previous && 
                <button className="pokemons-container__button_previous" onClick={ getPreviousPokemons }>&lt;</button>
              }           
              {(state.pokemons.next) && 
                <button className="pokemons-container__button_next" onClick={ getNextPokemons }>&gt;</button>
              }
            </div>
          </div>
        </div> 
        }

      </div>
    );
}

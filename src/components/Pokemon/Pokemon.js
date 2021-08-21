import React, { useEffect } from 'react';
import { 
  pokemonFetchData
} from '../../store/actions/pokemons';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './Pokemon.css';
import PokemonsList from '../PokemonsList/PokemonsList';

export default function Pokemon() {
  
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const params = useParams();

  useEffect(() => {
    dispatch(pokemonFetchData(`https://pokeapi.co/api/v2/pokemon/${params.id}`))
  }, [params, dispatch]);

    return (
      <div className="container-single">

        {/* Выпадающий список покемонов */}
        <PokemonsList />

        {/* Подробная карточка покемона */}
        {state.pokemon &&
          <div className="single-card">

            <div className="single-card__container">
              <p className="single-card__name">{state.pokemon.name[0].toUpperCase() + state.pokemon.name.substring(1)}</p>
              <img 
              className="single-card__image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.pokemon.id}.png`} 
              alt="pokemon" />
            </div>

            <div className="single-card__container">
            <p className="single-card__text">Рост:</p>
            <p className="single-card__text-item">{state.pokemon.height * 10} сантиметров</p>
            <p className="single-card__text">Вес:</p>
            <p className="single-card__text-item">{state.pokemon.weight / 10} килограмм</p>
            
            <p className="single-card__text">Тип:</p>
            <ul className="single-card__list">
              {state.pokemon.types.map((type, index)=> {
                return<li 
                  key={index}
                  className="single-card__list-item"
                  >
                    <p className="single-card__list-text">{type.type.name}</p>
                </li>
                })
              }
            </ul>

            <p className="single-card__text">Способности:</p>
            <ul className="single-card__list">
              {state.pokemon.abilities.map((ability, index)=> {
                return<li 
                  key={index}
                  className="single-card__list-item"
                  >
                    <p className="single-card__list-text">{ability.ability.name}</p>
                </li>
                })
              }
            </ul>
            </div>
          </div> 
        }

      </div>
    )
  }

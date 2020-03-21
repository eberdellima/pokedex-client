import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { colors } from '../configs/index'

const PokemonView = () => {
  const [page, setPage] = useState(1);
  const limit = 18;

  const fn =  ({error, loading, data}) => {
    if (error) return `Error ${error}`
    if (loading) return "Loading"
    const pokemon = data.pokemonById
    return <PokemonCard key={pokemon.order} data={pokemon}/>
  }

  const makeQueryCall = (pokemonId) => {
    return(<Query query={gql`{
      pokemonById(id: ${pokemonId}){
        name,
        order,
        types {
          type { name }
        }
      }
    }`
    }>
      { fn }
    </Query>)
  }

  const generatePokemonList = () => {
    const ids = []
    const start = limit * page -limit + 1;
    const end = page * limit;
    for (let i = start; i <= end; i++) {
      ids.push(i);
    }
    return ids
  }

  const handlePageChange = (value) => {
    const newPage = value < 1 ? 1 : value;
    setPage(newPage);
  }

  const Pagination = () => {
    return (
      <div className="poke-container">
        <button onClick={() => handlePageChange(page - 1)}>Prev</button>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    )
  }

  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
      <Pagination/>
      <div className="poke-container">
        { generatePokemonList().map(id => makeQueryCall(id)) }
      </div>
    </div>
  )
}

const PokemonCard = (props) => {
  const id = props.data.order
  const name = props.data.name;
  const type = props.data.types[0]["type"]["name"];
  const color = colors[type];
  return (
    <div className="pokemon" style={{backgroundColor: color}}>
      <div className="img-container">
        <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt={name} />
      </div>
      <div className="info">
        <span className="number">#{id.toString().padStart(3, '0')}</span>
        <h3 className="name">{name}</h3>
        <small className="type">Type: <span>{type}</span></small>
      </div>
    </div>
  )
}

export default PokemonView;

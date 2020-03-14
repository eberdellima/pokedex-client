import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PokemonView = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  return (
    <Query query={gql`{
      pokemons(
      skip: ${limit * page - limit}
      first: ${limit}
      orderBy: order_ASC
      ){
        name,
        url
      }
    }`
    }>
      {({error, loading, data}) => {
        if (error) return "Error"
        if (loading) return "Loading"
        return data.pokemons.map((pokemon, index) => <PokemonCard key={index} data={pokemon}/>)
      }}
    </Query>
  )
}

const PokemonCard = (props) => {
  const id = props.data.url.split('/')[6];
  const name = props.data.name;
  return (
    <div className="pokemon">
      <div className="img-container">
        <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt={name} />
      </div>
      <div className="info">
        <span className="number">#{id.toString().padStart(3, '0')}</span>
        <h3 className="name">{name}</h3>
        {/* <small class="type">Type: <span>${type}</span></small> */}
      </div>
    </div>
  )
}

export default PokemonView;

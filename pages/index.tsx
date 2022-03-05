import type { NextPage } from "next";
import { GetStaticProps } from 'next'
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";


interface Props{
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Props> = ({pokemons}) => {
  
  //console.log(pokemons)
  return (
    
      <Layout title="Listado de pokemons">
       <ul>
        {
          pokemons.map(pokemon => (
            <li key={pokemon.name}>
             <p>#{pokemon.id} {pokemon.name}</p>
             
            </li>
          ))
        }
       </ul>
      </Layout>
    
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {
   
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  
  const pokemons: SmallPokemon[] = data.results.map((poke, idx) => {
    return {
      name: poke.name,
      url: poke.url,
      id: idx + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
    }
  })
  //console.log(pokemons)
  
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;

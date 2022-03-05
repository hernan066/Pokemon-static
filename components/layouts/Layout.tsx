import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";


interface Props {
    title?: string;
}


export const Layout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name="author" content="Hernan Moneta" />
        <meta name="description" content= {` Informacion sobre los pokemons ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
     <Navbar />
     <main style={{
         padding: '0rem 2rem',
     }}>
         {children}
     </main>
    </>
  );
};

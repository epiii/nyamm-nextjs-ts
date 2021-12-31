import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoder";
import styles from "../styles/Home.module.css";
import { Character, GetCharacterResults } from "../types";

const Home: NextPage<{ characters: Character[] }> = ({ characters }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nyoba Next JS (typescript)</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {process.env.NEXT_PUBLIC_DB_CONNECT} */}

      {characters.map((character: any) => {
        return (
          <div key={character.id}>
            <Link href={`/characters/${character.id}`}>
              <a>
                <h3>{character.name}</h3>
              </a>
            </Link>

            <Image
              loader={imageLoader}
              unoptimized
              alt={character.name}
              width="200px"
              height="200px"
              src={character.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    props: {
      characters: results,
    },
  };
};
export default Home;

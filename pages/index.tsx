/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.scss";
import Image from 'next/image'
import { ImageList, ImageListItem } from '@mui/material';
import Zoom from 'react-medium-image-zoom'

export const databaseId = process.env.NOTION_DATABASE_ID;

type HomePorps = {
  posts: any
}

const Home:React.FC<HomePorps> = ({ posts }) => {

  const imageList = posts
    .filter((post: any) => post.properties['Files & media'].files.length !== 0)
    .map((post: any) => {
      return {
        id: post.id,
        title: post.properties['Name']['title'][0].plain_text,
        src: post.properties['Files & media'].files[0].file.url
      }
    })

  return (
    <div>
      <Head>
        <title>manas Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>manas photos</h1>
        </header>
        <ImageList variant="masonry" cols={3} gap={8}>
          {imageList.map((post:any) => {
            return (
              <ImageListItem key={post.id} className={styles.post}>
                <Zoom>
                  <img alt={post.title} src={post.src} loading='lazy' />
                </Zoom>
              </ImageListItem>
            );
          })}
        </ImageList>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};


export default Home
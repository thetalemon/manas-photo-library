import Head from "next/head";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.scss";
import Image from 'next/image'
import { ImageList, ImageListItem, Box, Button, Dialog, Typography } from '@mui/material';
import Zoom from 'react-medium-image-zoom'

export const databaseId = process.env.NOTION_DATABASE_ID;

type HomePorps = {
  posts: any
}

const Home:React.FC<HomePorps> = ({ posts }) => {

  type OpenListItem = {
    id: any;
    open: boolean;
  }

  const openListInit = posts.map((post:any) => {
    return {
      id: post.id,
      open: false
    }
  })

  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>manas photos</h1>
        </header>
        <Box sx={{ width: 900, height: 450, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {posts.map((post:any) => {
              return (
                <ImageListItem key={post.id} className={styles.post}>
                  {
                    post.properties['Files & media'].files.length !== 0 && 
                    (
                      <Zoom>
                        <img max-width="200" src={post.properties['Files & media'].files[0].file.url} loading='lazy' />
                        {/* <Image loading='lazy' height='300' width='300' objectFit='cover' alt='image' src={post.properties['Files & media'].files[0].file.url} /> */}
                      </Zoom>
                    )
                  }
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
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
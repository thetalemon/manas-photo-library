import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.scss";
import Image from 'next/image'

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
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
        <ol className={styles.posts}>
          {posts.map((post) => {
            return (
              <li key={post.id} className={styles.post}>
                <Link href={`/${post.id}`}>
                  <a>
                    {
                      post.properties['Files & media'].files.length !== 0 && 
                      (<Image height='300' width='300' objectFit='cover' alt='image' src={post.properties['Files & media'].files[0].file.url} />)
                    }
                  </a>
                </Link>
              </li>
            );
          })}
        </ol>
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

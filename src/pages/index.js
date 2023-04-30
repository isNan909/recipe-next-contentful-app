import { client } from "@/lib/contentful";
import Head from "next/head";
import Recipecard from "@/components/Card";

import styles from "@/styles/Home.module.css";

export default function Home({ recipes }) {
  return (
    <>
      <Head>
        <title>Contentful Nextjs Recipe App</title>
        <meta name="description" content="Recipe cookbook app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {recipes.map((recipe, i) => (
          <Recipecard key={recipe.fields.slug || i} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "recipeCookbook" });

  return {
    props: {
      recipes: response.items,
      revalidate: 70,
    },
  };
};

import { useRouter } from "next/router";
import Link from "next/link";
import { client, previewClient } from "@/lib/contentful";

import ContentfulImage from "@/components/Contentfulimage";
import Carddetail from "@/components/Carddetail";
import RichText from "@/components/RichText";

import styles from "@/styles/Carddetail.module.css";

const Recipe = ({ recipe, preview }) => {
  const router = useRouter();
  const { banner, title, procedure, recipeBy, timeToCook } = recipe.fields;

  return (
    <>
      <article className={styles.details}>
        {preview && (
          <>
            You are previewing content:
            <Link href="/api/exit-preview">Exit preview</Link>
          </>
        )}
        {router.isFallback ? (
          <>loading..</>
        ) : (
          <Carddetail>
            <ContentfulImage
              className={styles.bannerImage}
              alt={title}
              src={banner.fields.file.url}
              width={banner.fields.file.details.image.width}
              height={banner.fields.file.details.image.height}
            />
            <div className={styles.recipeby}>
              {/* person image */}
              Recipe by:
              <div className={styles.recipeperson}>
                <ContentfulImage
                  alt={recipeBy.fields.image.fields.title}
                  src={recipeBy.fields.image.fields.file.url}
                  width={recipeBy.fields.image.fields.file.details.image.width}
                  height={
                    recipeBy.fields.image.fields.file.details.image.height
                  }
                />
                <span>{recipeBy.fields.image.fields.title}</span>
              </div>
              </div>
              <h1>{title}</h1>
              <span>Time to cook: {timeToCook}</span>
            <RichText content={procedure} />
          </Carddetail>
        )}
      </article>
    </>
  );
};

export const getStaticProps = async ({ params, preview = false }) => {
  const currentClient = preview ? previewClient : client

  const { slug } = params;
  const response = await currentClient.getEntries({
    content_type: "recipeCookbook",
    "fields.slug": slug,
  });

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe: response?.items?.[0],
      revalidate: 60,
      preview,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "recipeCookbook" });
  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Recipe;

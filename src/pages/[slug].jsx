import { client, previewClient } from "@/lib/contentful";
import { useRouter } from "next/router";

const Recipe = ({ recipe, preview }) => {
  const router = useRouter();
  // console.log(recipe);

  return (
    <>
      {preview && <>Preview alert!</>}
      <article>{router.isFallback ? <>loading..</> : <>post detail</>}</article>
    </>
  );
};

export const getStaticProps = async ({ params, preview = false }) => {
  const cfClient = preview ? previewClient : client;

  const { slug } = params;
  const response = await cfClient.getEntries({
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
      preview,
      revalidate: 60,
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

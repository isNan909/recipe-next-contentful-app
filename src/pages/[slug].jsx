import { client } from "@/lib/contentful";
import { useRouter } from "next/router";
import ContentfulImage from "@/components/Contentfulimage";
import RichText from "@/components/RichText";

const Recipe = ({ recipe }) => {
  const router = useRouter();
  const { banner, title, procedure, recipeBy } = recipe.fields;

  return (
    <>
      <article>
        {router.isFallback ? (
          <>loading..</>
        ) : (
          <>
            <ContentfulImage
              alt={title}
              src={banner.fields.file.url}
              width={banner.fields.file.details.image.width}
              height={banner.fields.file.details.image.height}
            />
            <div>
              {/* person image */}
              Recipe by:
              <ContentfulImage
                alt={recipeBy.fields.image.fields.title}
                src={recipeBy.fields.image.fields.file.url}
                width={recipeBy.fields.image.fields.file.details.image.width}
                height={recipeBy.fields.image.fields.file.details.image.height}
              />
              <span>{recipeBy.fields.image.fields.title}</span>
            </div>
            <RichText content={procedure} />
          </>
        )}
      </article>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const response = await client.getEntries({
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

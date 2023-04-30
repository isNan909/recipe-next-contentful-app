import Link from "next/link";
import ContentfulImage from '@/components/Contentfulimage';

import styles from "@/styles/Card.module.css";


const Recipecard = ({ recipe }) => {
  const { title, timeToCook, thumbnail, slug } = recipe.fields;
  return (
    <>
      <Link href={`/${slug}`} aria-label={title}>
        <div className={styles.cardWraper}>
          <ContentfulImage
            src={thumbnail.fields.file.url}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
            quality="100"
            alt={title}
          />
          <h2>{title}</h2>
          <span>Time taken: {timeToCook} minutes</span>
        </div>
      </Link>
    </>
  );
};

export default Recipecard;

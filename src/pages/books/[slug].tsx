import { createClient, Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
});

interface RecipeFields {
  slug: string;
  // add any other fields you need here
}

interface RecipeEntry extends Entry<RecipeFields> {}

export const getStaticPaths = async () => {
  const res = await client.getEntries<RecipeFields>({ content_type: "recipe" });

  const paths = res.items.map((item: RecipeEntry) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });
  return {
    props: { book: items[0] },
    revalidate: 1,
  };
};

export default function RecipeDetails({ book }: any) {
  console.log(book);
  const { thumbnail, title, excerpt, readingTime, categories, content } =
    book.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width="200"
          height="300"
          alt="thumbnail"
        />
        <div className="banner-text">
          <h2>{title}</h2>
          <p>{excerpt}</p>
        </div>
      </div>

      <div className="info">
        <p>Take about {readingTime} hours to finish.</p>
        <h3>Categories: </h3>
        {categories.map((cat: any) => (
          <span key={cat}>{cat}</span>
        ))}
      </div>

      <div className="content">
        <h3>Details:</h3>
        <div>{documentToReactComponents(content)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner {
          display: flex;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: 0px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .banner-text p {
          padding: 20px;
        }
        .info {
          margin-top: 60px;
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}

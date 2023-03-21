import Head from "next/head";
import { createClient } from "contentful";
import BookCard from "@/components/BookCard";

export type Book = {
  fields: {
    title: string;
    slug: string;
    thumbnail: {
      fields: {
        file: {
          url: string;
          details: {
            image: { width: number; height: number };
          };
        };
      };
    };
    categories: string[];
    readingTime: number;
    content: string;
  };
  sys: {
    id: string;
  };
};
type Props = {
  books: Book[];
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      books: res.items,
    },
  };
}

export default function Home({ books }: Props) {
  return (
    <>
      <Head>
        <title>Just Add Readventures</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="recipe-list">
        {books.map((book) => (
          <BookCard key={book.sys.id} book={book} />
        ))}
        <style jsx>{`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
        `}</style>
      </div>
    </>
  );
}

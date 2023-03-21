import { Book } from "@/pages";
import Link from "next/link";
import Image from "next/image";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { title, slug, readingTime, thumbnail } = book.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width="200"
          height="300"
          alt="thumbnail"
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {readingTime} hours to finish</p>
        </div>
        <div className="actions">
          <Link
            href={`/books/${slug}`}
            style={{
              textDecoration: "none",
              background: "#f01b29",
              color: "#fff",
              padding: "16px 24px",
            }}
          >
            Read this
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}

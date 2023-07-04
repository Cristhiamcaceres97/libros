import React, { useEffect, useState } from "react";
import axios from "axios";

const BookDetails = ({ match }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${match.params.bookId}.json`
        );
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [match.params.bookId]);

  if (!book) {
    return <p>Cargando detalles del libro...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      {book?.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
        />
      ) : (
        <p>No hay imagen disponible para este libro.</p>
      )}
      {book.authors && (
        <p>
          Autor: {book.authors.map((author) => author.name).join(", ")}
        </p>
      )}
      {book.publish_date && <p>Año Publicado: {book.publish_date}</p>}
      {book.subjects && (
        <p>
          Categorías: {book.subjects.map((subject) => subject).join(", ")}
        </p>
      )}
      {book.description && <p>Sinopsis: {book.description}</p>}
      {/* Aquí puedes agregar más información sobre el libro */}
    </div>
  );
};

export default BookDetails;

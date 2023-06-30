import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt, FaBook } from "react-icons/fa";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookQuantity, setBookQuantity] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookIds = [
          "9781955786225",
          "9781419728150",
          "9780613563338",
          "9781637386231",
          "9780810994553",
          "9781788622882",
          "9780930289362",
          "9780237535278",
          "9780553381689",
          "9783662598061",
          "9781417750429",
          "9788484702672",
          "9781401289256",
          "9781982115982",
          "9781779502773",
          "9780440412670",
          "9780425288856",
          "9789654487658",
          "9781423776345",
          "9781521451755",
          "9780810994737",
          "9788441520127",
          "9781563895722",
          "8934974080336",
          "9781417751723",
          "9781897767160",
          "9789573318002",
          "9780439784542",
          "9780062060617",
          "9786047703739",
          "9788497774208",
          "9789707752993",
        ];

        const promises = bookIds.map((bookId) =>
          axios.get(
            `https://openlibrary.org/api/books?bibkeys=${bookId}&format=json&jscmd=data`
          )
        );

        const responses = await Promise.all(promises);
        const booksData = responses.map(
          (response) => response.data[Object.keys(response.data)[0]]
        );

        const storedPrices = localStorage.getItem("prices");
        let prices = {};

        if (storedPrices) {
          prices = JSON.parse(storedPrices);
        } else {
          booksData.forEach((book) => {
            prices[book.key] = generateRandomPrice();
          });

          localStorage.setItem("prices", JSON.stringify(prices));
        }

        const booksWithPrice = booksData.map((book) => ({
          ...book,
          price: prices[book.key],
        }));

        setBooks(booksWithPrice);
      } catch (error) {
        console.error("Error al obtener la lista de libros:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedCartCount = localStorage.getItem("cartCount");

    if (storedCart && storedCartCount) {
      setCart(JSON.parse(storedCart));
      setCartCount(parseInt(storedCartCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cartCount.toString());

    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach((book) => {
        total += book.price * bookQuantity[book.key];
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart, cartCount, bookQuantity]);

  const generateRandomPrice = () => {
    return Math.floor(Math.random() * (30000 - 5000 + 1) + 5000);
  };

  const addToCart = (event, book) => {
    event.preventDefault();
    const updatedCart = [...cart];

    const existingBook = updatedCart.find((item) => item.key === book.key);
    if (existingBook) {
      setBookQuantity((prevQuantity) => ({
        ...prevQuantity,
        [book.key]: prevQuantity[book.key] + 1,
      }));
    } else {
      updatedCart.push(book);
      setBookQuantity((prevQuantity) => ({
        ...prevQuantity,
        [book.key]: 1,
      }));
    }

    setCart(updatedCart);
    setCartCount(cartCount + 1);
    setBounce(true);
  };

  const removeBookFromCart = (bookToRemove) => {
    const updatedCart = cart.filter((book) => book.key !== bookToRemove.key);
    setCart(updatedCart);
    setCartCount(cartCount - bookQuantity[bookToRemove.key]);
    setBookQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      delete updatedQuantity[bookToRemove.key];
      return updatedQuantity;
    });
  };

  const emptyCart = () => {
    setCart([]);
    setCartCount(0);
    setBookQuantity({});
  };

  const toggleCartVisibility = () => {
    if (cart.length > 0) {
      setCartVisible(!cartVisible);
    }
  };

  const onAnimationEnd = () => {
    setBounce(false);
  };

  return (
    <div className="book-list-container">
      <h2>
        Lista de Libros
        <button className="cart-button" onClick={toggleCartVisibility}>
          <FaShoppingCart
            className={`cart-icon ${bounce ? "bounce" : ""}`}
            onAnimationEnd={onAnimationEnd}
          />
          <span className={`cart-count ${bounce ? "bounce" : ""}`}>
            {cartCount}
          </span>
        </button>
      </h2>
      {books.length > 0 ? (
        <ul className="book-list">
          {books.map((book) => (
            <li className="book-item" key={book.key}>
              {book?.title && <h3>{book.title}</h3>}
              {book?.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
              {book.languages && (
                <p>
                  Lenguaje:{" "}
                  {book.languages.map((language) => language.name).join(", ")}
                </p>
              )}
              <p className="precio-libros">
                Precio: ${book.price} <b>COP</b>
              </p>
              <a
                href="#"
                className="ov-btn-slide-top"
                onClick={(event) => addToCart(event, book)}
              >
                <FaShoppingCart size={20} /> Añadir al Carrito
              </a>
              <a href="#" className="ov-btn-slide-close">
                <FaBook size={20} />
                Ver Más Detalles
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay libros disponibles.</p>
      )}

      {cart.length > 0 && cartVisible && (
        <div className={`cart-popup ${cartVisible ? "open" : ""}`}>
          <div className="cart-header">
            <h2>Carrito de Compras</h2>
            <button className="close-cart" onClick={toggleCartVisibility}>
              X
            </button>
          </div>
          <div className="cart-content">
            {cart.map((book) => (
              <div className="cart-item" key={book.key}>
                {book?.title && <h3>{book.title}</h3>}
                {book?.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                  />
                ) : (
                  <p>No hay imagen disponible para este libro.</p>
                )}
                <p>Cantidad: {bookQuantity[book.key]}</p>
                <p>Precio unitario: ${book.price} COP</p>
                <p>Subtotal: ${book.price * bookQuantity[book.key]} COP</p>
                <button
                  className="remove-button"
                  onClick={() => removeBookFromCart(book)}
                >
                  <FaTrashAlt size={20} /> Quitar del Carrito
                </button>
              </div>
            ))}
            <div className="cart-total">
              <p>Total: ${totalPrice} COP</p>
              <button className="empty-button" onClick={emptyCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt, FaBook } from "react-icons/fa";
import axios from "axios";
import "./BookList.css";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookQuantity, setBookQuantity] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);

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
          "9780439784542",
          "9780061120084",
          "9781984801814",
          "9780142000088",
          "9780679732761",
          "9780545010221",
          "9781451673319",
          "9780142424179",
          "9780141182605",
          "9780060891541",
        ];

        const promises = bookIds.map((bookId) =>
          axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookId}&key=AIzaSyDM6HevyDLqCdIu1jnipamyYx_1QtruZIw
            `
          )
        );

        const responses = await Promise.all(promises);
        const booksData = responses.map((response) => {
          const bookData = response.data.items[0].volumeInfo;
          return {
            title: bookData.title,
            image: bookData.imageLinks?.thumbnail || "",
            price: bookData.saleInfo?.listPrice?.amount || 0,
          };
        });

        const storedPrices = localStorage.getItem("prices");
        let prices = {};

        if (storedPrices) {
          prices = JSON.parse(storedPrices);
        } else {
          booksData.forEach((book) => {
            prices[book.title] = book.price;
          });

          localStorage.setItem("prices", JSON.stringify(prices));
        }

        const booksWithPrice = booksData.map((book) => ({
          ...book,
          price: prices[book.title],
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
        total += book.price * bookQuantity[book.title];
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart, cartCount, bookQuantity]);

  const addToCart = (event, book) => {
    event.preventDefault();
    const updatedCart = [...cart];

    const existingBook = updatedCart.find((item) => item.title === book.title);
    if (existingBook) {
      setBookQuantity((prevQuantity) => ({
        ...prevQuantity,
        [book.title]: prevQuantity[book.title] + 1,
      }));
      existingBook.quantity += 1;
    } else {
      updatedCart.push({ ...book, quantity: 1 });
      setBookQuantity((prevQuantity) => ({
        ...prevQuantity,
        [book.title]: 1,
      }));
    }

    setCart(updatedCart);
    setCartCount((prevCount) => prevCount + 1);
    setBounce(true);
    setTimeout(() => setBounce(false), 1000);
  };

  const removeFromCart = (event, book) => {
    event.preventDefault();
    const updatedCart = cart.filter((item) => item.title !== book.title);

    setCart(updatedCart);
    setCartCount((prevCount) => prevCount - bookQuantity[book.title]);
    setBookQuantity((prevQuantity) => {
      const quantity = { ...prevQuantity };
      delete quantity[book.title];
      return quantity;
    });
  };

  const handleQuantityChange = (event, book) => {
    const { value } = event.target;
    setBookQuantity((prevQuantity) => ({
      ...prevQuantity,
      [book.title]: parseInt(value),
    }));
  };

  const handleCartToggle = () => {
    setCartVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div className="book-list">
        {books.map((book) => (
          <div className="book" key={book.title}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Precio: ${book.price}</p>
            <button onClick={(event) => addToCart(event, book)}>
              <FaShoppingCart /> Agregar al carrito
            </button>
            <button> 📚 Ver Mas Detalles</button>
          </div>
        ))}
      </div>
      <div className="cart-toggle" onClick={handleCartToggle}>
        <FaShoppingCart className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>

      {cartVisible && (
        <div className={`cart ${cartVisible ? "open" : ""}`}>
          <div className="cart-header">
            <h2>Carrito de compras</h2>
            <button className="cart-close" onClick={handleCartToggle}>
              X
            </button>
          </div>
          {cart.length === 0 ? (
            <p>No hay libros en el carrito.</p>
          ) : (
            <div>
              {cart.map((book) => (
                <div className="cart-item" key={book.title}>
                  <div className="cart-item-info">
                    <img src={book.image} alt={book.title} />
                    <div>
                      <h3>{book.title}</h3>
                      <p>Precio: ${book.price}</p>
                      <p>Cantidad: {book.quantity}</p>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={(event) => removeFromCart(event, book)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ${totalPrice}</h3>
                <Link to="/checkout">
                  <button className="checkout-btn">
                    <FaBook /> Ir a pagar
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {bounce && <div className="bounce" />}
    </div>
  );
};

export default BookList;

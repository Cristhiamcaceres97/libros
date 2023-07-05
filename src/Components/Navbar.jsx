import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://images.vexels.com/media/users/3/139752/isolated/preview/532e26143a0435e9c6ca7f436474389f-icono-de-libros.png"
          height="70px"
          width="100px"
          alt="logo"     
        />
        <span>Paco's Book</span>
      </div>
<<<<<<< HEAD
      <ul className="nav-menu">
        <div className="menu-navbar">
=======
      <ul className="nav-menu">          
        <li className="nombre-logo">Paco's Book</li>
        <div className="menu-navbar">       
>>>>>>> b1db40d5e27ee7e88c3b88b77df96334bad4803e
          <li>
            <NavLink to="/" exact activeClassName="active-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/ayuda" activeClassName="active-link">
              Ayuda
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" activeClassName="active-link">
              Clientes
            </NavLink>
          </li>
          <li
            className={`categorias ${
              showCategoriesMenu ? "show" : ""
            } dropdown-container`}
          >
            <span className="nav-link" onClick={toggleCategoriesMenu}>
              Categorías{" "}
              {showCategoriesMenu ? (
                <i className="arrow up"></i>
              ) : (
                <i className="arrow down"></i>
              )}
            </span>
            <ul className={`dropdown-menu ${showCategoriesMenu ? "show" : ""}`}>
              <li>
                <NavLink to="/cientificos" activeClassName="active-link">
                  Científicos
                </NavLink>
              </li>
              <li>
                <NavLink to="/literatura" activeClassName="active-link">
                  Literatura
                </NavLink>
              </li>
              <li>
                <NavLink to="/viaje" activeClassName="active-link">
                  De viaje
                </NavLink>
              </li>
              <li>
                <NavLink to="/biografias" activeClassName="active-link">
                  Biografías
                </NavLink>
              </li>
              <li>
                <NavLink to="/referencias" activeClassName="active-link">
                  Referencias
                </NavLink>
              </li>
              <li>
                <NavLink to="/monografias" activeClassName="active-link">
                  Monografías
                </NavLink>
              </li>
              <li>
                <NavLink to="/drama" activeClassName="active-link">
                  Drama misterio
                </NavLink>
              </li>
              <li>
                <NavLink to="/terror" activeClassName="active-link">
                  Terror
                </NavLink>
              </li>
              <li>
                <NavLink to="/magia" activeClassName="active-link">
                  Magia
                </NavLink>
              </li>
              <li>
                <NavLink to="/otros" activeClassName="active-link">
                  Otros
                </NavLink>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

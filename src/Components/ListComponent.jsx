import React from "react";
import "./ListComponent.css";

const ListComponent = () => {
  return (
    <ul className="list-component">
      <li className="lista-uno">
        ¡Descárgate la App
        <br />        
        GRATIS!
        <br />             
        <div className="list-imagenes">
          <a href="https://www.apple.com/co/app-store/" target="_blank">
            <img
              src="https://statics.cdn1.buscalibre.com/images/app-ios-202109211027.png"
              alt=""
            />
          </a>
          <br />
          <a
            href="https://play.google.com/store/games?hl=es_CO&gl=US"
            target="_blank"
          >
            <img
              src="https://statics.cdn1.buscalibre.com/images/app-android-202109211027.png"
              alt=""
            />
          </a>
        </div>
      </li>
      <li className="lista-dos">
        Te traemos de USA
        <br />
        Venta Empresarial
      </li>
      <li className="lista-tres">
        Términos y Condiciones
        <br />
        Políticas de Devolución
        <br />
        Privacidad y Seguridad
        <br />
        Cómo Comprar
        <br />
        Nuestras Formas de pago
        <br />
        Opiniones de Clientes
        <br />
        Costos de Despacho
        <br />
        Seguridad Redes Sociales
      </li>
      <li className="lista-cuatro">
        <img
          src="https://statics.cdn1.buscalibre.com/images/footer-ccce.png"
          height={100}
          width={200}
          alt=""
        />
      </li>
      <li className="lista-cinco">
        Suscríbete para recibir ofertas y promociones <br />
        <input className="lista-seis" type="text" placeholder="Email" />
        <button type="submit" className="search-button-lista">
          Enviar
        </button>{" "}
        <br />
        <b className="ayuda">¿Necesitas ayuda?</b>
        <br />
        <button className="lista-siete">
          Ir Al Centro De
          <br />
          Soporte PQR
        </button>
      </li>
    </ul>
  );
};

export default ListComponent;

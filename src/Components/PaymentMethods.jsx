import React from "react";
import "./PaymentMethods.css";

const imagesUrls = [
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/mastercard2.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/visa.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/efecty.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/pse2.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/payu.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/davivienda.png",
  "https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/bancolombia.png",
];

const PaymentMethods = () => {
  return (
    <div className="payment-methods-container">
      {imagesUrls.map((url, index) => (      
        <img src={url} alt={`Payment Method ${index + 1}`} key={index} />
      ))}
    </div>     
  );           
};

export default PaymentMethods;

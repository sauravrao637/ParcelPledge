import React from "react";
import "./Footer.css";

function Footer({ contract_url, address }) {
  console.log(address);
  const shipper_link = "mailto:sauravrao637@gmail.com?subject=RegisterShipper&body=" + address;
  const partner_link = "mailto:sauravrao637@gmail.com?subject=RegisterPartner&body=" + address;
  return (
    <>
      <div className="footer-container" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <div className="footer-content">
          <div>Register as <a href={shipper_link}><span className="logo-highlight">Shipper</span></a> / <a href={partner_link}><span className="logo-highlight">Partner</span></a> </div>
          <div><a href={contract_url}>View Contract on Apothem</a></div>
        </div>
      </div>
    </>
  );
}

export default Footer;

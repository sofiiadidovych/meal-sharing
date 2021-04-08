import React from "react";
import "./ComponentsStyle.css";
import tlogo from "../assets/images/tlogo.png";

function PageTitle() {
  return (
    <section className="title">
      <h2>Here you will find our list of the most delicious meals in Copenhagen</h2>
      <img src={tlogo} alt="title logo" />
    </section>
  );
}

export default PageTitle;

import React from "react";
import "./ComponentsStyle.css";
import logo from "../assets/images/hyf.png";

function PageStructure(props) {
  return (
    <>
      <header className="header">
        <h1>My App</h1>
      </header>
      <section className="content">{props.children}</section>
      <footer className="footer">
        <img src={logo} alt="logo" width="100vh" />
      </footer>
    </>
  );
}

export default PageStructure;

import React from "react";
import "./ComponentsStyle.css";
import logo from '../assets/images/hyf.png';

function PageStructure (props) {
    return (
        <section>
            <header className="header-footer">
                <h1>My App</h1>
            </header>
            <main>
                {props.children}
            </main>
            <footer className="header-footer">
            <img src={logo} alt="logo" width="100vh" />
            </footer>
        </section>
    )
}

export default PageStructure;
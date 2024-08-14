import * as React from "react";
import { MdPhone, MdLocationOn, MdEmail } from "react-icons/md";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="logo-header">
            <Link to="/main_window">
                <img src={logo} alt="sapologie-logo" />
            </Link>
            <div className="contact-info">
                <div className="phone">
                    <MdPhone />
                    <p>(240) 435-5678</p>
                </div>
                <div className="address">
                    <MdLocationOn />
                    <p>6000 Greenbelt Road Beltway Plaza Mall 20770</p>
                </div>
                <div className="email">
                    <MdEmail />
                    <p>sapologieitaliano@gmail.com</p>
                </div>
            </div>
        </header>
    );
}

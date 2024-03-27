import React from 'react';
import './Button.css';
import add_button from "../../assets/add_button.svg";

/**
 * Represents a reusable button component used throughout the application.
 * @param {Object} props - The properties of the button.
 * @param {Function} props.onClick - The function to be executed when the button is clicked.
 * @param {string} props.label - The label text displayed on the button.
 * @param {string} props.buttonStyle - The CSS class to customize the button's appearance.
 * @returns {JSX.Element} The button component.
 */
const Button = ({ onClick, label, buttonStyle }) => {
    return (
            <button className={`button ${buttonStyle}`} onClick={onClick}>
                <img
                    className="add_button_icon"
                    src={add_button}
                    alt={"add button icon"}
                />
                <span className="button-label">{label}</span>
            </button>
    );
};

export default Button;



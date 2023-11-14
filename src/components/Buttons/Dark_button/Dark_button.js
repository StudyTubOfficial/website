import React from "react";
import { useNavigate } from "react-router-dom";
/**
 * A dark button component with two text fields.
 * @param {Object} props - The props object.
 * @param {string} props.text_1 - The first text field.
 * @param {string} props.text_2 - The second text field.
 * @returns {JSX.Element} - A JSX element representing the dark button.
 */
export default function Dark_button({ text_1, text_2 }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <button type="submit" className="btn btn_dark" onClick={handleClick}>
      <span>
        <small>{text_1}</small>
        <small>{text_2}</small>
      </span>
    </button>
  );
}

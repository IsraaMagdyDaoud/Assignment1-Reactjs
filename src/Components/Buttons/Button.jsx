import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ color, icon, text, onClick }) {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />} {text}
    </button>
  );
}

export default Button;

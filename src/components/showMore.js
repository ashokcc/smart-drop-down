import React from "react";

export default ({ options, optionsLimit, onShowMore }) => {
  return (
    <li style={{ justifyContent: "center" }} onClick={(e) => onShowMore(e)}>
      {options.length - optionsLimit} more items
    </li>
  );
};

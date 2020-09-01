import React from "react";
export default ({
  options,
  onOptionSelect,
  optionsLimit,
  newCountryComponent,
  showMoreComponent,
}) => {
  return (
    <ul onClick={onOptionSelect}>
      {options.map((option, index) => (
        <li
          key={option.name}
          data-val={option.name}
          style={{ display: optionsLimit < index + 1 ? "none" : "block" }}
        >
          {option.name}
        </li>
      ))}
      {options.length > optionsLimit ? showMoreComponent : ""}
      {!options.length ? newCountryComponent : ""}
    </ul>
  );
};

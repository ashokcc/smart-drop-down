import React from "react";

export default ({ option }) => {
  return (
    <div data-val={option.name} key={option.name}>
      {option.name}
    </div>
  );
};

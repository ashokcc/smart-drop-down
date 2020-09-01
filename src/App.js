import React from "react";
import "./App.css";
import DropDownOptions from "./components/drop-down/options";
import SearchIcon from "./components/searchIcon";
import RoundArrowDown from "./components/downRoundArrow";
import RoundArrowUp from "./components/upRoundArrow";
import AddNewCountryComponent from "./components/countryAddOption";
import ShowMoreComponent from "./components/showMore";
function App() {
  const [country, setCountry] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [dropDownListLimit, setDropDownListLimit] = React.useState(3);
  const [showOptions, setShowOptions] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const dropDownRef = React.useRef();

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    let handleKeyDown = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleKeyDown);
    };
  });

  async function fetchData(filterValue) {
    const response = await fetch("./countries.json");
    const { countries } = await response.json();
    if (filterValue && filterValue !== "") {
      setOptions(
        countries.filter((option) =>
          option.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    } else {
      setOptions(countries);
    }
  }

  const onOptionSelect = (el) => {
    if (el && el.target) {
      setCountry(el.target.getAttribute("data-val"));
      setShowOptions(false);
    }
  };

  const debounce = (fn) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  };

  let onInputChange = (val) => {
    setSearchText(val);
    fetchData(val);
  };

  onInputChange = debounce(onInputChange);

  const addNewCountry = (e, val) => {
    e.stopPropagation();
    setCountry(val);

    setOptions((prevState) => prevState.concat([{ name: val }]));
  };

  const onShowMore = (e) => {
    e.stopPropagation();
    setDropDownListLimit(options.length);
  };

  return (
    <div ref={dropDownRef} className="drop-down-wrapper">
      <h3>
        Selected country <em>{country}</em>
      </h3>
      <div className="drop-down">
        <div className="select-wrapper">
          <input
            placeholder="Select a Location"
            defaultValue={country}
            className="input"
            onClick={() => setShowOptions(true)}
            readOnly
          />
          <span onClick={() => setShowOptions(!showOptions)}>
            {!showOptions ? <RoundArrowDown /> : <RoundArrowUp />}
          </span>
        </div>
        {showOptions ? (
          <div className="dd-options">
            <div className="search-wrapper">
              <SearchIcon />
              <input
                placeholder="Search"
                defaultValue={searchText}
                className="input input-round"
                onChange={({ target: { value } }) => onInputChange(value)}
                onClick={() => setShowOptions(true)}
              />
            </div>
            <DropDownOptions
              options={options}
              optionsLimit={dropDownListLimit}
              onOptionSelect={onOptionSelect}
              newCountryComponent={
                <AddNewCountryComponent
                  searchText={searchText}
                  addNewCountry={addNewCountry}
                />
              }
              showMoreComponent={
                <ShowMoreComponent
                  options={options}
                  optionsLimit={dropDownListLimit}
                  onShowMore={onShowMore}
                />
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

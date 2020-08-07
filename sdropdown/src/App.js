import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";
import Search from "./components/Search";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(5);
  const wrapperRef = useRef(null);
  

  useEffect(() => {
    setLoading(true);
    const countriesArray = [];
    axios
      .get("http://168.235.109.53:5000/countries")
      .then(res => { 
      const resultCountries = res.data.countries;
        for (const key in resultCountries) {
          countriesArray.push({
            name: resultCountries[key],
          });
        }
        setCountries(countriesArray);
        setFilteredCountries(countriesArray);
        updateListItems();
        setLoading(false);        
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  
  /* addEventListener onClick div to be hide when outSide of the dropdown  */
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [display]);
  
  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  const updateListItems = () => {
    setListItems(filteredCountries.splice(0, numberOfItems));
  }

  useEffect(() => {
    updateListItems();
  }, [numberOfItems, filteredCountries])

  
  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  if (loading) {
    return <p>Loading countries...</p>;
  }

  

  return (
    <div ref={wrapperRef}  className="App">
      <Search setDisplay={setDisplay} 
      setSearch={setSearch} 
      search={search} 
      display={display} 
      listItems={listItems} 
      setFilteredCountries={setFilteredCountries} filteredCountries={filteredCountries} setNumberOfItems={setNumberOfItems} />
    </div>
  );
}

export default App;
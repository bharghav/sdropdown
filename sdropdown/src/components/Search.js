import React from 'react';
import axios from "axios";



function Search({setDisplay, search, setSearch, display, listItems, setFilteredCountries, filteredCountries , setNumberOfItems}) {


  /* Post service for the addlocation */
const addLocation = async () => {

  let res = await axios.get(`http://168.235.109.53:5000/addcountry?name=${search}` )
                      .then(res => { 
                        console.log(`Status code: ${res.status}`);
                        })
                        .catch(err => {
                          console.log(err);
                        });
};

  return (
    <div>
      <div className="search-container">
      <h1>Location Lists</h1>
      <input
        type="text"
        placeholder="Select Location"
        onChange={e => setSearch(e.target.value)}
        value={search}
        onClick={() => setDisplay(true)}
        style={{border:'1px solid black', width:'380px', padding:'10px'}}
      />
      </div>
    {display && (
      <div style={{border:'1px solid black',display:'flex',alignItems:'center', width:'390px',height:'210px',overflowY:'auto',marginLeft:'570px'}}>
        <div className="autoContainer" style={{border:'0px solid green', width:'100%',height:'100%',alignItems:'center', margin:'0px'}}>
          {listItems.length < 1 ? <>
            <div>"{search}" not found <button onClick={addLocation} >Add & select </button> </div></>: null}
          
          {listItems.map((country, idx) => (
            <div
            key={idx}
            onClick={() => {
              setSearch(country.name);
              setFilteredCountries([{name: country.name}]);
              }}>
              <p>{country.name}</p>
            </div>  
          ))}
          
          {filteredCountries.length > 5 ? <p align="right"><button onClick={() => {setNumberOfItems(numberOfItems => numberOfItems + 5)}} 
          style={{marginTop:'0px',padding:'10px', background:'#fff',border:'none'}}
          > 5 more...</button></p>:null}
      </div>
    </div>
    )}
    </div>
  );
}
  
export default Search;
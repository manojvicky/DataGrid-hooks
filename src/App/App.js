import React, { useEffect, useState } from "react";
import orderOfColumns from "../Utils/Utils";
import "../styles.css";
import Footer from "./Footer";
import Datagrid from "./Datagrid";
import SearchBox from "./Searchbox";

export default function App() {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [searchColumn, setSearchColumn] = useState('title');
  const [pageNo, setpageNo] = useState(1);
  const rowsPerPageLimit = 50;
  useEffect(() => {
    setLoading(true);
    fetch("http://starlord.hackerearth.com/gamesext")
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setData(data.map((item, index)=>{return{...item,index}}));
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }
  if (error) {
    return <div className="App">Error While Loading Data</div>;
  }
  if (data.length === 0) {
    return <div className="App">No Data to display</div>;
  }

  const order = orderOfColumns(Object.keys(data[0]));

  if(inputValue){
    data = data.filter(ele=>
        ele[searchColumn]
            .toString()
            .toLowerCase()
            .includes(inputValue.toString().toLowerCase()));
  }

  let eachPage = [];

  for(let i=(pageNo>1?(pageNo-1)*rowsPerPageLimit:0); i<( data.length<rowsPerPageLimit ? data.length : (((pageNo-1)*rowsPerPageLimit)+(((data.length-((pageNo-1)*rowsPerPageLimit))<rowsPerPageLimit) ? (data.length-((pageNo-1)*rowsPerPageLimit)) : rowsPerPageLimit))) ; i++){
    eachPage.push(data[i]);
  }

  // console.log('data', eachPage);
  return (
    <div className="App">
      <div className='GameTable'>
        Game Data
      </div>
      <SearchBox inputValue={inputValue} setInputValue={setInputValue} setpageNo={setpageNo} searchColumn={searchColumn} setSearchColumn={setSearchColumn} order={order} dataLength={data.length}/>
      <Datagrid order={order} eachPage={eachPage} />
      <Footer pageNo={pageNo} dataLength={data.length} setpageNo={setpageNo} setpageNo={setpageNo} rowsPerPage={rowsPerPageLimit}/>
    </div>
  );
}

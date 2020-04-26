import React, { useEffect } from "react";

const SearchBox = props => {
  useEffect(() => {
    props.setpageNo(props.dataLength === 0 ? 0 : 1);
  }, [props.dataLength]);
  return (
    <div className="searchBox">
      <input
        type="text"
        value={props.inputValue}
        onChange={e => {
          props.setInputValue(e.target.value);
        }}
        placeholder={props.searchColumn.replace("_", " ")}
      />
      <select
        value={props.searchColumn}
        onChange={e => props.setSearchColumn(e.target.value)}
      >
        {props.order.map(opt => (
          <option value={opt.id} key={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;

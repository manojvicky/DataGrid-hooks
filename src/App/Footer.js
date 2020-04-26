import React from "react";

const Footer = props => {
  return (
    <footer className="footerdiv">
      <div className="navigationWrapper">
        <div
          className={`decrement${props.pageNo < 2 ? " hide" : ""}`}
          onClick={() => props.setpageNo(props.pageNo - 1)}
        >{`<`}</div>
        <div className="noOfPages">
          {props.pageNo}/{Math.ceil(props.dataLength / props.rowsPerPage)}
        </div>
        <div
          className={`increment${
            props.pageNo === Math.ceil(props.dataLength / props.rowsPerPage)
              ? " hide"
              : ""
          }`}
          onClick={() => props.setpageNo(props.pageNo + 1)}
        >{`>`}</div>
      </div>
      <div className="noOfRows">No. of rows : {props.dataLength}</div>
    </footer>
  );
};

export default Footer;

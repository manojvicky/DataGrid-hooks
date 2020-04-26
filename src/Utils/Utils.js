function orderOfColumns(headers) {
  const order = [
    "index",
    "title",
    "platform",
    "score",
    "genre",
    "editors_choice",
    "release_year"
  ];
  let headerMap = new Map();
  for (let i = 0; i <= headers.length; i++) {
    headerMap.set(headers[i], headers[i]);
  }
  return metaDataGenerator(order.map(item => headerMap.get(item)));
}

function metaDataGenerator(headers) {
  return headers.map(item => {
    let width = "150px";
    switch (item) {
      case "index": {
        width = "50px";
        break;
      }
      case "title": {
        width = "450px";
        break;
      }
      case "platform": {
        width = "150px";
        break;
      }
      case "score": {
        width = "50px";
        break;
      }
      case "genre": {
        width = "100px";
        break;
      }
      case "editors_choice": {
        width = "50px";
        break;
      }
      case "release_year": {
        width = "100px";
        break;
      }
      default: {
        break;
      }
    }
    return {
      id: item,
      label: item !== "index" ? item.replace("_", " ") : "index",
      textAlign:
        item === "editors_choice" ||
        item === "score" ||
        item === "release_year" ||
        item === "index"
          ? "center"
          : "left",
      default: item === "score" ? true : false,
      cell: (row, col) => {
        console.log(
          "cliked row ",
          row,
          " ",
          "column ",
          col,
          " ",
          "and cell ",
          row[col.id]
        );
        alert(`you clicked ${row[col.id]}`);
      },
      width,
      headerBackGround: "#343049",
      headerColor: "#ffffff",
      bodyColor: "#b0b0b0"
    };
  });
}
export default orderOfColumns;

import React, {useState, useEffect} from 'react';

const Datagrid = (props) => {
    const [sortColumn, setsortColumn] = useState('');
    const [sortOrder, setsortOrder] = useState(true);
    const [data, setData] = useState(props.eachPage);

    useEffect(()=>{
        setData(props.eachPage);
    },[props.eachPage]);

    function handleSort(col, asc, mixedData) {
        const d1 = [...mixedData];
        if (asc) {
            d1.sort((a, b) => {
                if (b[col] > a[col]) {
                    return 1;
                }
                if (b[col] < a[col]) {
                    return -1;
                }
                if (b[col] === a[col]) {
                    return 0;
                }
            });

        } else {
            d1.sort((a, b) => {
                if (b[col] < a[col]) {
                    return 1;
                }
                if (b[col] > a[col]) {
                    return -1;
                }
                if (b[col] === a[col]) {
                    return 0;
                }
            });
        }
        setData(d1);
    }

    function handleSortClick(col, mixedData) {
        if (sortColumn === col) {
            setsortOrder(!sortOrder);
            handleSort(col, !sortOrder, mixedData)
        } else {
            setsortColumn(col);
            setsortOrder(true);
            handleSort(col, true, mixedData);
        }
    }

    return (
        <div className='tableWrapper'>
            <table className="tableelement">
                <thead className="tableHeader">
                    <tr className="tableHeaderRow">
                        {props.order.map(item => (
                            <th className="tableHeaderColumn" style={{minWidth: item.width, 'background': item.headerBackGround, 'color': item.headerColor}} key={item.id} onClick={ () => { if(data.length>0)handleSortClick(item.id, data)}}>
                                <div className='sortColumn'>
                                    <span className='sortColumnText'>
                                        {item.label}
                                    </span>
                                    {/* <span className={`outerSort${ sortOrder ? ' des' : ''}`}>
                                        {
                                            item.id === sortColumn &&
                                            <span className='asc'>^</span>
                                        }
                                    </span> */}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tableBody">
                    {
                        data.length > 0 ? data
                            .map((item, index) => (
                                <tr
                                    className="tableRow"
                                    key={`${index}-${Math.random()
                                        .toString(36)
                                        .replace(/[^a-zA-Z0-9]+/g, "")}`}
                                >
                                    {props.order.map(obj => {
                                        return (
                                            <td
                                                className="cellData"
                                                key={`${obj.id}-${Math.random()
                                                    .toString(36)
                                                    .replace(/[^a-zA-Z0-9]+/g, "")}`}
                                                onClick={() => obj.cell(item, obj)}
                                                style={{ 'textAlign': obj.textAlign, minWidth: obj.width, 'color': obj.bodyColor }}
                                            >
                                                {item[obj.id]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )) : <div className='nodata'>No Data</div>}
                </tbody>
            </table>
        </div>
    );
}

export default Datagrid;
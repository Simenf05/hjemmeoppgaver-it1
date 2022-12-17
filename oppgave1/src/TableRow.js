import { useState } from "react";

function TableHead(props) {
    return (
        <tr>
            {props.items.map((text, index) => <th key={index}>{text}</th>)}
        </tr>
    )
}
export const TableHeadex = TableHead;
function TableRow(props) {
    const [checked, setChecked] = useState(false);
    return (
        <tr>
            <td><input value={checked} onClick={() => {props.checkHandle(props.id); setChecked(!checked)}} type="checkbox" /></td>
            {props.items.map((text, index) => <td key={index} >{!(index === 0) ? new Intl.NumberFormat().format(text) : text}</td>)}
            <td>{new Intl.NumberFormat().format(props.items[1] + props.items[2])}</td>
        </tr>
    )
}
export const TableRowex = TableRow;
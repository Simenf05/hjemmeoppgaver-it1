import { TableHeadex, TableRowex } from "./TableRow";
import { useState } from "react";

function App(props) {
    const data = props.data
    const mkyears = (len, start) => [...Array(len).keys()].map((num) => num + start)
    const mklist = (n, m) => n.length === m.length ? n.map((el, index) => [el, ...m[index]]) : null
    const years = mkyears(data.length, 2011)
    const tableInfo = mklist(years, data)
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const handleCheck = (key) => checkedBoxes.includes(key) ? setCheckedBoxes(checkedBoxes.filter((el) => !(el === key))) : setCheckedBoxes([...checkedBoxes, key]);
    const getSize = (arr, operator) => (operator) ? Math.max(...arr.map((e) => e[1] + e[2])) : Math.min(...arr.map((e) => e[1] + e[2]));
    const getSizeYear = (arr, operator) => arr[[...arr.map((e) => e[1] + e[2])].indexOf(!operator ? Math.max(...arr.map((e) => e[1] + e[2])) : Math.min(...arr.map((e) => e[1] + e[2])))][0];
    const sumYears = (arr, years) => !(years.length === 0) ? arr.filter((el) => years.includes(el[0])).map((e) => e[1] + e[2]).reduce((a, b) => a + b) : "0";
    const sumAllYears = (arr) => arr.map((e) => e[1] + e[2]).reduce((a, b) => a + b);
    return (
        <>
        <table>
            <tbody>
            <TableHeadex items={["", "Årstall", "gutter", "jenter", "total"]} />

            {tableInfo.map((array) => <TableRowex checkHandle={handleCheck} id={array[0]} key={array[0]} items={array} />)}
            </tbody>
        </table>
        <p>Året {getSizeYear(tableInfo, 1)} hadde færrest fødsler på {new Intl.NumberFormat().format(getSize(tableInfo, 0))}</p>
        <p>Året {getSizeYear(tableInfo, 0)} hadde flest fødsler på {new Intl.NumberFormat().format(getSize(tableInfo, 1))}</p>
        <p>Totale fødsler gjennom perioden: {new Intl.NumberFormat().format(sumAllYears(tableInfo))}</p>
        <p>Antall fødsler de årene du har valgt: {new Intl.NumberFormat().format(sumYears(tableInfo, checkedBoxes))}</p>
        </>
    )
}
export default App;
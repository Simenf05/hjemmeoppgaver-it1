import { useState, useEffect } from "react";

import Question from "./Question";

function Form(props) {
    const [data, setData] = useState({});
    const [showBars, setShowBars] = useState(false);

    useEffect(() => {
      fetch("http://localhost:3000/api")
      .then((res) => res.ok ? res.text() : "Failed to load...")
      .then((data) => setData(JSON.parse(data)))
    }, [showBars])

    const [values, setValues] = useState({});
    const [name, setName] = useState(null);
    const [dataSent, setDataSent] = useState("");
    
    const handleQuestionClick = (name, value) => setValues({...values, [name] : value})

    const handleSubmit = () => {
        if (Object.keys(values).length < props.data.length || !(name)) {return};

        let sending = ""
        Object.values(values).map((val) => sending += val ? "1" : "0")

        fetch("/api", {
            method: "POST",
            headers: { "content-type" : "application/json" },
            body: JSON.stringify({name: name, results: sending})
        })
        .then(res => res.text())
        .then(data => setDataSent(data))
    }

    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            
            <div>
            {props.data.map((element) => <Question text={element[0]} name={element[1]} key={element[1]} clickHandle={handleQuestionClick} />)}

            <div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Svar</button>
                <button onClick={() => setShowBars(!(showBars))}>Vis resultat</button>
            </div>

            <p>{dataSent}</p>
            </div>
            
        </form>

        <div>
            <p>{Object.keys(data)}</p>
            {showBars ? Object.keys(data).map((element) => <div key={element} style={{
            "padding": "5px",
            "margin": "2px",
            "backgroundColor": "red", 
            "width": String(data[element][0] / (data[element][0] + data[element][1]) * 100) + "%"}
            } >{props.data[Number(element)]}</div>) : ""}
        </div>
        </>
    )
}

export default Form;
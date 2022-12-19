

function Question(props) {



    return (
        <>

        <label>
            {props.text}
            <div>
            <label>Enig<input type="radio" name={props.name} value={true} /></label>
            
            <label>Uenig<input type="radio" name={props.name} value={false} /></label>
            </div>
        </label>

        </>
    )

}

export default Question;
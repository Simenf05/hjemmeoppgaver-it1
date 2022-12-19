import { useState, useEffect } from "react";

import Form from "./Form";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3000/api").then((e) => e.text()).then((data) => setData(data));
  }, [])


  return (
    <>
      <Form />

      <p>{data}</p>
    </>
  )
}

export default App;

import Form from "./Form";

var asking = [
  ["Himmelen er grønn?", "skygreen"],
  ["Jorden er flat?", "flatearth"],
  ["Venus er firkantet?", "cubevenus"],
  ["Saturn er rund", "roundsaturn"],
  ["heihei", "heihei"]
]

function App() {
  return (
    <>
      <h1>Velkommen til min side</h1>
      <Form data={asking} />
    </>
  )
}
export default App;

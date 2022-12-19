import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const data = [
  [31006, 29214],
  [30933, 29322],
  [30138, 28857],
  [30370, 28714],
  [30369, 28689],
  [30386, 28504],
  [29173, 27460],
  [28430, 26690],
  [28042, 26453],
  [27063, 25916],
  [27063, 25916],
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App data={data} />
);

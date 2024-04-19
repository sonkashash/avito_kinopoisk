// const ReactDOM = require("react-dom/client");
// const React = require("react");
// const App = require("./app.jsx");
  
 
// ReactDOM.createRoot(
//     document.getElementById("app")
// )
// .render(
//     <div>
//        <App/>
//     </div>
// );


import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./app.jsx";
import Home from "./pages/home.jsx";
import Movie from "./pages/movie.jsx";
  
ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
    <Router>
        <div>
           <App />
            <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/movie/:id" element={<Movie />} />
            </Routes>
        </div>
    </Router>
    </React.StrictMode>,
)

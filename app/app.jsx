// const React = require("react");
// const Header = require("./components/header.jsx");
// const Article = require("./components/article.jsx");
// const Home = require("./pages/home.jsx");
// const Movie = require("./pages/movie.jsx");
// const Router = require("react-router-dom");
// const Routes = require("react-router-dom");
// const Route = require("react-router-dom");
// const Tabs = require("antd");

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { Tabs } from 'antd';



// export default function App() {
//     const header = "Рассказ";
//     const article = "После одного из заседаний N-ского мирового съезда судьи собрались в совещательной комнате, чтобы снять свои мундиры, минутку отдохнуть и ехать домой обедать.";

//     const tabs = [
//         {
//             key: '0',
//             label: 'Home',
//             children: <Home />,
//         },
//         {
//             key: '1',
//             label: 'Movie',
//             children: <Movie />,
//         },
//     ];
//     const onChange = (key) => {
//     };

//     return (
//         <div>
//             <Header text={header} />
//             <Article content={article} />
//         </div>

        // <>
        //     <Router>
        //         <Tabs
        //             className="navbar"
        //             onChange={onChange}
        //             items={tabs}
        //             tabBarStyle={{
        //                 backgroundColor: "lightgrey",
        //                 paddingInline: "35px",
        //                 position: "absolute",
        //                 top: "0px",
        //                 left: "0px",
        //                 width: "100%"
        //             }}
        //         />
        //         <Routes>
        //             <Route path="/" element={<Home />} />
        //             <Route path="/movie/:id" element={<Movie />} />
        //         </Routes>
        //     </Router>
        // </>
//     );
// }

import React, { useState, useEffect } from "react";
import {Link}  from "react-router-dom";
import Home from "./pages/home.jsx";
import Movie from "./pages/movie.jsx";
 
export default function App(){

  console.log("TOKEN:", process.env.TOKEN);
const token = process.env.TOKEN;
console.log(token);     
        
    return <div>
            <Link to="/"></Link> 
            <Link to="/movie/:id"></Link>
        </div>;
}



import * as React from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import {Home} from "./modules/Home";
import {NotFoundPage} from "./components/NotFoundPage";
import './App.css'
import {Header} from "./components/Header/Header";

export const App = () => {
  return (
    <div className='App'>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>} />
            </Route>
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </div>
  );
}

const Layout = () => (
    <>
        <Header/>
        <Outlet/>
    </>
)

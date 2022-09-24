import * as React from "react";
import { Routes, Route } from "react-router-dom";
import {Home} from "./modules/Home";
import {NotFoundPage} from "./components/NotFoundPage";
import {Layout} from "./components/Layout";
import './App.css'

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

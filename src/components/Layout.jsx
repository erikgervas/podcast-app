import * as React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => (
    <>
        <div>
            Podcaster
        </div>
        <Outlet/>
    </>
)
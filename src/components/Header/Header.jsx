import * as React from "react";
import './Header.css'
import {Link} from "react-router-dom";

export const Header = () => (
    <div className='header'>
        <Link className='link' to="/">Podcaster</Link>
    </div>
)
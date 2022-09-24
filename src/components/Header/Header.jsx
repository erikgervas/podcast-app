import {Link} from "react-router-dom";
import './Header.css'

export const Header = () => (
    <div className='header'>
        <Link className='link' to="/">Podcaster</Link>
    </div>
)
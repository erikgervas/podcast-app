import {Link} from "react-router-dom";
import styles from './Header.module.css'
import {Loading} from "../Loading/Loading";

export const Header = () => (
    <div className={styles.header}>
        <Link className={styles.link} to="/">Podcaster</Link>
        <Loading/>
    </div>
)
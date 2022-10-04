import {Link} from "react-router-dom";
import styles from './Header.module.css'

export const Header = () => (
    <div className={styles.header}>
        <Link className={styles.link} to="/">Podcaster</Link>
    </div>
)
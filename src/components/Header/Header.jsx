import {Link} from "react-router-dom";
import styles from './Header.module.css'
import {Loading} from "../Loading/Loading";
import {useSelector} from "react-redux";

export const Header = () => {
    const loading = useSelector(state => state.topPodcasts.loading || state.podcastDetail.loading);

    return (
        <div className={styles.header}>
            <Link className={styles.link} to="/">Podcaster</Link>
            { loading && <Loading/> }
        </div>
    );
}
import styles from './Podcast.module.css';
import {Card} from "../../../components/Card/Card";

export const Podcast = ({ name, artist, imageUrl }) => (
    <Card>
        <img className={styles.image} src={imageUrl} alt='podcast'/>
        <div className={styles.title}>{name.toUpperCase()}</div>
        <div className={styles.author}>Author: {artist}</div>
    </Card>
);
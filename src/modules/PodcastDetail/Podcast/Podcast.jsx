import styles from './Podcast.module.css'
import {Card} from "../../../components/Card/Card";

export const Podcast = ({ name, description, artist, imageUrl }) => (
    <Card>
        <img className={styles.image} src={imageUrl} alt='podcast'/>
        <div className={styles.titleBox}>
            <div className={styles.title}>{name}</div>
            <div className={styles.author}>by {artist}</div>
        </div>
        <div className={styles.descriptionBox}>
            <div className={styles.descriptionTitle}>Description:</div>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    </Card>
);
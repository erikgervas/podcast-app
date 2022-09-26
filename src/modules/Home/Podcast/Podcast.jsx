import styles from './Podcast.module.css';

export const Podcast = ({ name, artist, imageUrl }) => (
    <div className={styles.card}>
        <img className={styles.image} src={imageUrl} alt='podcast'/>
        <div className={styles.title}>{name.toUpperCase()}</div>
        <div className={styles.author}>Author: {artist}</div>
    </div>
);
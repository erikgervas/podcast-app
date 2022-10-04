import {Card} from "../../../components/Card/Card";
import styles from './Episodes.module.css'
import {Link} from "react-router-dom";
import {routes} from "../../../routes";

const formatDate = dateAsString => {
    const date = new Date(dateAsString);
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ].join('/');
};

export const Episodes = ({ podcastId, episodes }) => (
    <div>
        <Card className={styles.episodesCountCard}>
            Episodes: {episodes.length}
        </Card>
        <Card className={styles.episodesCard}>
            <div className={styles.tableHeader} style={{ width : '100%' }}>
                <div style={{ flex: 3 }}>Title</div>
                <div style={{ flex: 1 }}>Date</div>
                <div style={{ flex: 1 }}>Duration</div>
            </div>
            { episodes.map(episode => (
                <div key={episode.id} className={styles.tableRow} style={{ width : '100%' }}>
                    <div style={{ flex: 3 }}>
                        <Link className={styles.link} to={routes.episodeDetail.replace(':podcastId', podcastId).replace(':episodeId', episode.id)}>
                            { episode.title }
                        </Link>
                    </div>
                    <div style={{ flex: 1 }}>{ formatDate(episode.publishedAt) }</div>
                    <div style={{ flex: 1 }}>{ episode.duration }</div>
                </div>
            )) }
        </Card>
    </div>
);
import {useEffect, useState} from "react";
import podcastService from "../../services/PodcastService";
import {Podcast} from "./Podcast/Podcast";
import styles from './Home.module.css'
import {Link} from "react-router-dom";
import {routes} from "../../routes";

const podcastMatchesFilter = (textToFilterBy) => (podcast) => {
    const textInUpperCase = textToFilterBy.toUpperCase();
    return textToFilterBy ? (
        podcast.name.toUpperCase().includes(textInUpperCase) || podcast.artist.toUpperCase().includes(textInUpperCase))
        : true;
}

export const Home = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [textToFilterBy, setTextToFilterBy] = useState('');

    useEffect( () => {
        const fetchPodcasts = async () => {
            const podcasts = await podcastService.getTopPodcasts();
            setPodcasts(podcasts);
        }
        fetchPodcasts();
    }, [])

    const onInputChange = (event) => {
        setTextToFilterBy(event.target.value);
    };

    return(
      <div className={styles.home}>
          <div className={styles.filterBox}>
              <div className={styles.badge}>100</div>
              <input className={styles.filterInput} type="text" placeholder='Filter podcasts...' value={textToFilterBy} onChange={onInputChange}/>
          </div>
          <div className={styles.podcastList}>
              { podcasts
                  .filter(podcastMatchesFilter(textToFilterBy))
                  .map(podcast =>
                  <div role='button' className={styles.podcast} key={podcast.id}>
                      <Link style={{textDecoration: 'none'}} to={routes.podcastDetail.replace(':podcastId', podcast.id)}>
                          <Podcast {...podcast}/>
                      </Link>
                  </div>)
              }
          </div>
      </div>
    );
};
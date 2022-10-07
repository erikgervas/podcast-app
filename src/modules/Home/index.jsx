import {useEffect, useState} from "react";
import {Podcast} from "./Podcast/Podcast";
import styles from './Home.module.css'
import {Link} from "react-router-dom";
import {routes} from "../../routes";
import {useDispatch, useSelector} from "react-redux";
import {getTopPodcasts} from "../../redux/topPodcasts.slice";

const podcastMatchesFilter = (textToFilterBy) => (podcast) => {
    const textInUpperCase = textToFilterBy.toUpperCase();
    return textToFilterBy ? (
        podcast.name.toUpperCase().includes(textInUpperCase) || podcast.artist.toUpperCase().includes(textInUpperCase))
        : true;
}

export const Home = () => {
    const { topPodcasts, error } = useSelector(state => state.topPodcasts);
    const dispatch = useDispatch();
    const [textToFilterBy, setTextToFilterBy] = useState('');

    useEffect( () => {
        dispatch(getTopPodcasts({}));
    }, [dispatch])

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
              { topPodcasts
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
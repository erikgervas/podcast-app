import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Episodes} from "./Episodes/Episodes";
import {Podcast} from "./Podcast/Podcast";
import styles from './PodcastDetail.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPodcastDetail} from "../../redux/podcastDetail.slice";

export const PodcastDetail = () => {
    const params = useParams();
    const { podcastDetail } = useSelector(state => state.podcastDetail);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getPodcastDetail(params.podcastId));
    }, [dispatch, params.podcastId]);

    return (
        <div className={styles.layout}>
            <div className={styles.podcastCard}>
                <Podcast {...podcastDetail}/>
            </div>
            <div className={styles.podcastEpisodes}>
                <Episodes podcastId={podcastDetail.id} episodes={podcastDetail.episodes}/>
            </div>
        </div>
    )
};
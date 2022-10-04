import {useEffect, useState} from "react";
import podcastService from "../../services/PodcastService";
import {useParams} from "react-router-dom";
import {Episodes} from "./Episodes/Episodes";
import {Podcast} from "./Podcast/Podcast";
import styles from './PodcastDetail.module.css'

export const PodcastDetail = () => {
    const [podcastDetail, setPodcastDetail] = useState({ episodes: [] });
    const params = useParams();

    useEffect( () => {
        const fetchPodcastDetail = async () => {
            const podcastDetail = await podcastService.getPodcastDetail(params.podcastId);
            setPodcastDetail(podcastDetail);
        }
        fetchPodcastDetail();
    }, [params.podcastId])

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
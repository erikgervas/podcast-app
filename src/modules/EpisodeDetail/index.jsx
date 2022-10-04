import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import podcastService from "../../services/PodcastService";
import styles from "./EpisodeDetail.module.css";
import {Podcast} from "../PodcastDetail/Podcast/Podcast";
import {Card} from "../../components/Card/Card";

export const EpisodeDetail = () => {
    const [podcastDetail, setPodcastDetail] = useState({ episode: { audio: {}} });
    const params = useParams();
    const { episode } = podcastDetail;

    useEffect( () => {
        const fetchPodcastDetail = async () => {
            const podcastDetail = await podcastService.getPodcastDetail(params.podcastId);
            const episode = podcastDetail.episodes.find(({ id }) => id.toString() === params.episodeId);
            setPodcastDetail({ ...podcastDetail, episode });
        }
        fetchPodcastDetail();
    }, [params.podcastId, params.episodeId])

    return (
        <div className={styles.layout}>
            <div className={styles.podcastCard}>
                <Podcast {...podcastDetail}/>
            </div>
            <div className={styles.podcastEpisode}>
                <Card>
                    <div className={styles.episodeTitle}>{ episode.title }</div>
                    <div dangerouslySetInnerHTML={{__html: episode.description}}/>
                    <audio src={episode.audio.url} controls className={styles.audio}>
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                </Card>
            </div>
        </div>
    )
};
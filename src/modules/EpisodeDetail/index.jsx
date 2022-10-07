import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import podcastService from "../../services/PodcastService";
import styles from "./EpisodeDetail.module.css";
import {Podcast} from "../PodcastDetail/Podcast/Podcast";
import {Card} from "../../components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {getPodcastDetail} from "../../redux/podcastDetail.slice";

export const EpisodeDetail = () => {
    const { podcastDetail } = useSelector(state => state.podcastDetail);
    const params = useParams();
    const dispatch = useDispatch();

    const episode = podcastDetail.episodes.find(({ id }) => id.toString() === params.episodeId);

    useEffect( () => {
        dispatch(getPodcastDetail(params.podcastId));
    }, [dispatch, params.podcastId]);

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
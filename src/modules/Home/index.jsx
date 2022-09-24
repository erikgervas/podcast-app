import {useEffect, useState} from "react";
import podcastService from "../../services/PodcastService";
import {Podcast} from "./Podcast/Podcast";
import './Home.css'

export const Home = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect( () => {
        const fetchPodcasts = async () => {
            const podcasts = await podcastService.getTopPodcasts();
            setPodcasts(podcasts);
        }
        fetchPodcasts();
    }, [])

    return(
      <div className='podcast-list'>
          { podcasts.map(podcast => <Podcast {...podcast}/>) }
      </div>
    );
};
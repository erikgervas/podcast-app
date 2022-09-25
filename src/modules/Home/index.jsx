import {useEffect, useState} from "react";
import podcastService from "../../services/PodcastService";
import {Podcast} from "./Podcast/Podcast";
import './Home.css'

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
      <div className='home'>
          <div className='filter-box'>
              <div className='badge'>100</div>
              <input className='filter-input' type="text" placeholder='Filter podcasts...' value={textToFilterBy} onChange={onInputChange}/>
          </div>
          <div className='podcast-list'>
              { podcasts
                  .filter(podcastMatchesFilter(textToFilterBy))
                  .map(podcast => <div className='podcast'><Podcast {...podcast}/></div>)
              }
          </div>
      </div>
    );
};
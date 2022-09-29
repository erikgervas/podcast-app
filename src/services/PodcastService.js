import axios from 'axios';
import {xml2json} from "xml-js";

const DEFAULT_TTL_IN_MILLIS = 3600 * 1000 * 24; //1 DAY

export class PodcastService {

    static baseURL = 'https://itunes.apple.com';
    static allOrigins = 'https://api.allorigins.win'

    getTopPodcasts(limit = 100, genre = 1310) {
        const request = async () => {
            const podcasts = (await axios.get(`${PodcastService.baseURL}/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`)).data.feed.entry;
            return podcasts.map(p =>
                ({
                    id: p.id.attributes['im:id'],
                    name: p['im:name'].label,
                    artist: p['im:artist'].label,
                    imageUrl: p['im:image'][2].label,
                }))
        }

        return this.handleRequestWithExpiry(request,'topPodcasts');
    }

    getPodcastDetail(podcastId) {
        const request = async () => {
            const podcast = (await axios.get(`${PodcastService.allOrigins}/raw?url=${PodcastService.baseURL}/lookup?id=${podcastId}`)).data.results[0];
            const feedXmlResponse = await axios.get(`${PodcastService.allOrigins}/raw?url=${podcast.feedUrl}`);
            const feed = JSON.parse(xml2json(feedXmlResponse.data, {compact: true, spaces: 2})).rss.channel;
            return ({
                id: podcastId,
                name: podcast.trackName,
                description: feed.description._text || feed.description._cdata,
                artist: podcast.artistName,
                imageUrl: podcast.artworkUrl600,
                episodes: feed.item.map(episode => ({
                    title: episode.title._text,
                    description: episode.description._text,
                    duration: episode['itunes:duration']._text,
                    publishedAt: episode.pubDate._text,
                    audioUrl: episode.enclosure._attributes.url,
                }))
            });
        };

        return this.handleRequestWithExpiry(request,`podcastDetail-${podcastId}`);
    }

    async handleRequestWithExpiry(request, key, ttl = DEFAULT_TTL_IN_MILLIS) {
        const responseInLocalStorage = this.#getFromLocalStorage(key);

        if(responseInLocalStorage === null) {
            const response = await request();
            this.#setInLocalStorage(key, response, ttl);
            return response;
        } else {
            return responseInLocalStorage
        }
    }

    //private

    #setInLocalStorage(key, value, ttl) {
        const now = new Date();

        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }

        localStorage.setItem(key, JSON.stringify(item));
    }

    #getFromLocalStorage(key) {
        const request = localStorage.getItem(key);

        if (!request) {
            return null;
        }

        const item = JSON.parse(request);
        const now = new Date();

        if (now.getTime() >= item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    }
}

export default new PodcastService();
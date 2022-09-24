import axios from 'axios';

export class PodcastService {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://itunes.apple.com/us/rss',
            timeout: 1000,
        });
    }

    getTopPodcasts(limit = 100, genre = 1310) {
        return this.axiosInstance.get(`/toppodcasts/limit=${limit}/genre=${genre}/json`)
            .then((response) => response.data.feed.entry)
            .then(podcasts => podcasts.map(p => {
                return ({
                    id: p.id.attributes['im:id'],
                    name: p['im:name'].label,
                    artist: p['im:artist'].label,
                    imageUrl: p['im:image'][2].label,
                });
            }));
    }
}

export default new PodcastService();
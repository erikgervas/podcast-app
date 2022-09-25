import axios from 'axios';

const DEFAULT_TTL_IN_MILLIS = 3600 * 1000 * 24; //1 DAY

export class PodcastService {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://itunes.apple.com/us/rss',
            timeout: 1000,
        });
    }

    getTopPodcasts(limit = 100, genre = 1310) {
        const request = () => this.axiosInstance.get(`/toppodcasts/limit=${limit}/genre=${genre}/json`)
            .then((response) => response.data.feed.entry)
            .then(podcasts => podcasts.map(p => {
                return ({
                    id: p.id.attributes['im:id'],
                    name: p['im:name'].label,
                    artist: p['im:artist'].label,
                    imageUrl: p['im:image'][2].label,
                });
            }))

        return this.handleRequestWithExpiry(request,'topPodcasts');
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
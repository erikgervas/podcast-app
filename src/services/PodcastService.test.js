import axios from "axios";
import { PodcastService } from "./PodcastService";

jest.mock("axios");

const podcastName = "Björk: Sonic Symbolism";
const podcastArtist = "Mailchimp";
const podcastImage = "https://is5-ssl.mzstatic.com/image/thumb/Podcasts112/v4/30/b6/62/30b662d2-9f51-ebb9-1a0f-6f8266d809c9/mza_8443931357531296046.jpeg/170x170bb.png";

describe('PodcastService', () => {

    beforeEach(() => {
        localStorage.clear();

        axios.create.mockImplementation(() => ({ get() {
                return Promise.resolve({ data: { feed: { entry: [apiMockPodcast] } } }) }
            }));
    })

    describe('getTopPodcasts', () => {

        it('builds the top podcasts list correctly', async () => {
            const podcastService = new PodcastService();

            const firstPodcast = (await podcastService.getTopPodcasts())[0];

            expect(firstPodcast.name).toEqual(podcastName);
            expect(firstPodcast.artist).toEqual(podcastArtist);
            expect(firstPodcast.imageUrl).toEqual(podcastImage);
        });
    });

    describe('handleRequestWithExpiry', () => {

        it('request gets called once before expiring and the response is saved in localStorage', async () => {
            const podcastService = new PodcastService();
            const request = jest.fn(() => Promise.resolve("my-value"));

            await podcastService.handleRequestWithExpiry(request, 'my-request');

            //2nd request grabs value from localstorage
            await podcastService.handleRequestWithExpiry(request, 'my-request');

            expect(request).toHaveBeenCalledTimes(1);
            expect(JSON.parse(localStorage.getItem('my-request')).value).toEqual('my-value');
        });

        describe('when request is expired', () => {

            let podcastService = new PodcastService();
            const ttl = 3600 * 1000; //1 hour
            const requestKey = 'my-request';

            beforeEach(async () => {
                jest.useFakeTimers();

                const request = () => Promise.resolve("my-value");
                await podcastService.handleRequestWithExpiry(request, requestKey, ttl);

                jest.advanceTimersByTime(ttl);
            });

            it('same tagged request gets called again and new response is saved', async () => {
                const request = jest.fn(() => Promise.resolve("my-value-updated"));

                await podcastService.handleRequestWithExpiry(request, requestKey);

                expect(request).toHaveBeenCalledTimes(1);
                expect(JSON.parse(localStorage.getItem(requestKey)).value).toEqual('my-value-updated');
            })
        })
    })
});

const apiMockPodcast = {
    "im:name": {
        "label": podcastName
    },
    "im:price": {
        "label": "Get",
        "attributes": {
            "amount": "0",
            "currency": "USD"
        }
    },
    "im:image": [
        {
            "label": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts112/v4/30/b6/62/30b662d2-9f51-ebb9-1a0f-6f8266d809c9/mza_8443931357531296046.jpeg/55x55bb.png",
            "attributes": {
                "height": "55"
            }
        },
        {
            "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/30/b6/62/30b662d2-9f51-ebb9-1a0f-6f8266d809c9/mza_8443931357531296046.jpeg/60x60bb.png",
            "attributes": {
                "height": "60"
            }
        },
        {
            "label": podcastImage,
            "attributes": {
                "height": "170"
            }
        }
    ],
    "summary": {
        "label": "Join Björk in conversations with collaborators about her sound experiences. In the podcast you’ll learn about the moods, timbers, and tempos that vibrate through each album."
    },
    "im:artist": {
        "label": podcastArtist
    },
    "title": {
        "label": "Björk: Sonic Symbolism - Mailchimp"
    },
    "link": {
        "attributes": {
            "rel": "alternate",
            "type": "text/html",
            "href": "https://podcasts.apple.com/us/podcast/bj%C3%B6rk-sonic-symbolism/id1641171534?uo=2"
        }
    },
    "id": {
        "label": "https://podcasts.apple.com/us/podcast/bj%C3%B6rk-sonic-symbolism/id1641171534?uo=2",
        "attributes": {
            "im:id": "1641171534"
        }
    },
    "im:contentType": {
        "attributes": {
            "term": "Podcast",
            "label": "Podcast"
        }
    },
    "category": {
        "attributes": {
            "im:id": "1525",
            "term": "Music Interviews",
            "scheme": "https://podcasts.apple.com/us/genre/podcasts-music-music-interviews/id1525?uo=2",
            "label": "Music Interviews"
        }
    },
    "im:releaseDate": {
        "label": "2022-09-15T01:00:00-07:00",
        "attributes": {
            "label": "September 15, 2022"
        }
    }
}
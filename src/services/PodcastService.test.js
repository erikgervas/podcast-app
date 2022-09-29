import axios from "axios";
import { PodcastService } from "./PodcastService";

jest.mock("axios");

const podcastName = "Björk: Sonic Symbolism";
const podcastArtist = "Mailchimp";
const podcastImage = "https://is5-ssl.mzstatic.com/image/thumb/Podcasts112/v4/30/b6/62/30b662d2-9f51-ebb9-1a0f-6f8266d809c9/mza_8443931357531296046.jpeg/170x170bb.png";
const podcastDescription = "Join Björk in conversations with collaborators about her sound experiences. In the podcast you’ll learn about the moods, timbers, and tempos that vibrate through each album.";
const episodeTitle = "Volta";
const episodeDescription = "Justice, fire, anthropology, wanderlust, activist, brass, boats, feminist, red, neon green, electric blue, flags, trumpets, tribal beats, bombastic.";
const episodePubDate = "Thu, 22 Sep 2022 08:00:00 -0000";
const episodeDuration = "2353";
const episodeAudioUrl = "https://traffic.megaphone.fm/MC8192665151.mp3?updated=1662485439";

jest.mock('xml-js', () => ({ xml2json: jest.fn() }));

describe('PodcastService', () => {

    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    })

    describe('getTopPodcasts', () => {

        beforeEach(() => {
            const apiMockPodcast = {
                "im:name": {
                    "label": podcastName
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
                "im:artist": {
                    "label": podcastArtist
                },
                "id": {
                    "attributes": {
                        "im:id": "1641171534"
                    }
                },
            }

            axios.get.mockImplementation(() => Promise.resolve({ data: { feed: { entry: [apiMockPodcast] } } }));
        })

        it('builds the top podcasts list correctly', async () => {
            const podcastService = new PodcastService();

            const firstPodcast = (await podcastService.getTopPodcasts())[0];

            expect(firstPodcast.name).toEqual(podcastName);
            expect(firstPodcast.artist).toEqual(podcastArtist);
            expect(firstPodcast.imageUrl).toEqual(podcastImage);
        });
    });

    describe('getPodcastDetail', () => {

        beforeEach(() => {
            const apiMockPodcastDetail = {
                "results": [
                    {
                        "artistName": podcastArtist,
                        "trackName": podcastName,
                        "artworkUrl600": podcastImage,
                    }
                ]
            }

            axios.get.mockImplementation(() => Promise.resolve({ data: apiMockPodcastDetail }));

            const feed = {
                "rss": {
                    "channel": {
                        "description": {
                            "_text": podcastDescription
                        },
                        "item": [
                            {
                                "title": {
                                    "_text": episodeTitle
                                },
                                "description": {
                                    "_text": episodeDescription
                                },
                                "pubDate": {
                                    "_text": episodePubDate
                                },
                                "enclosure": {
                                    "_attributes": {
                                        "url": episodeAudioUrl,
                                        "length": "0",
                                        "type": "audio/mpeg"
                                    }
                                },
                                "itunes:duration": {
                                    "_text": episodeDuration
                                },
                            }
                        ]
                    }
                }
            }

            jest.spyOn(JSON, 'parse').mockReturnValue(feed);
        })

        it('builds the podcast detail correctly', async () => {
            const podcastService = new PodcastService();

            const podcastDetail = (await podcastService.getPodcastDetail(12345));

            expect(podcastDetail.id).toEqual(12345);
            expect(podcastDetail.name).toEqual(podcastName);
            expect(podcastDetail.artist).toEqual(podcastArtist);
            expect(podcastDetail.imageUrl).toEqual(podcastImage);
            expect(podcastDetail.episodes).toEqual([{
                title: episodeTitle,
                duration: episodeDuration,
                description: episodeDescription,
                publishedAt: episodePubDate,
                audioUrl: episodeAudioUrl,
            }]);
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
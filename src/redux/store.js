import { configureStore } from '@reduxjs/toolkit'
import topPodcastsReducer from './topPodcasts.slice';
import podcastDetailReducer from './podcastDetail.slice';

export const store = configureStore({
    reducer: { topPodcasts: topPodcastsReducer, podcastDetail: podcastDetailReducer },
})

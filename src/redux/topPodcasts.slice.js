import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import podcastService from "../services/PodcastService";

export const getTopPodcasts = createAsyncThunk(
    'podcasts/topPodcasts',
        async ({ limit, genre }, { getState, requestId }) => {
            const { currentRequestId, loading } = getState().topPodcasts;
            if (!loading || requestId !== currentRequestId) {
                return;
            }
            return podcastService.getTopPodcasts(limit, genre);
        }
)

const topPodcastsSlice = createSlice({
    name: 'topPodcasts',
    initialState: {
        topPodcasts: [],
        loading: false,
        currentRequestId: undefined,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTopPodcasts.pending, (state, action) => {
                if (state.loading === false) {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getTopPodcasts.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.loading &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = false;
                    state.topPodcasts = action.payload;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getTopPodcasts.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.loading &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = false;
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    },
})

export default topPodcastsSlice.reducer;
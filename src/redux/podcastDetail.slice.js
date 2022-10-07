import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import podcastService from "../services/PodcastService";

export const getPodcastDetail = createAsyncThunk(
    'podcasts/detail',
        async (podcastId, { getState, requestId }) => {
            const { currentRequestId, loading } = getState().podcastDetail;
            if (!loading || requestId !== currentRequestId) {
                return;
            }
            return podcastService.getPodcastDetail(podcastId);
        }
)

const podcastDetailSlice = createSlice({
    name: 'podcastDetail',
    initialState: {
        podcastDetail: { episodes: [] },
        loading: false,
        currentRequestId: undefined,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPodcastDetail.pending, (state, action) => {
                if (!state.loading) {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getPodcastDetail.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.loading &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = false;
                    state.podcastDetail = action.payload;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getPodcastDetail.rejected, (state, action) => {
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

export default podcastDetailSlice.reducer;
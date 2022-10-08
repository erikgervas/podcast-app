import React from 'react'
import {fireEvent, waitFor, screen} from '@testing-library/react'
import {renderWithProviders} from "../../utils/test-utils";
import {Home} from "./index";

const aPodcast = { id: '1', name: 'A great podcast', artist: 'Best artist ever', imageUrl: '' };
const anotherPodcast = { id: '2', name: 'An awesome podcast', artist: 'Not a good artist', imageUrl: '' };

jest.mock('../../services/PodcastService', () => ({
    getTopPodcasts: () => {
        return [aPodcast, anotherPodcast]
    }
}));

describe('Home', () => {

    it('podcasts can be filtered by title', async () => {
        renderWithProviders(<Home/>);

        await waitFor(() => {
            expect(screen.getByText('A GREAT PODCAST')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.getByText('AN AWESOME PODCAST')).toBeInTheDocument();
        })

        const inputToFilterPodcasts = screen.getByPlaceholderText('Filter podcasts...');
        fireEvent.change(inputToFilterPodcasts, {target: { value: 'great' }})

        await waitFor(() => {
            expect(screen.getByText('A GREAT PODCAST')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.queryByText('AN AWESOME PODCAST')).toBeNull();
        })
    })

    it('podcasts can be filtered by author', async () => {
        renderWithProviders(<Home/>);

        await waitFor(() => {
            expect(screen.getByText('A GREAT PODCAST')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.getByText('AN AWESOME PODCAST')).toBeInTheDocument();
        })

        const inputToFilterPodcasts = screen.getByPlaceholderText('Filter podcasts...');
        fireEvent.change(inputToFilterPodcasts, {target: { value: 'Not a good' }})

        await waitFor(() => {
            expect(screen.getByText('AN AWESOME PODCAST')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.queryByText('A GREAT PODCAST')).toBeNull();
        })
    })

});
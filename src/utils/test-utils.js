import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";

import { store } from '../redux/store'

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Router><Provider store={store}>{children}</Provider></Router>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
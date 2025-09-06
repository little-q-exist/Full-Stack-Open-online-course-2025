import React from 'react'
import ReactDOM from 'react-dom/client'
import noteReducer from './reducers/noteReducer'
import App from './App'

import { createStore } from 'redux'


const store = createStore(noteReducer)

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'the app state is in the redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App store={store} />)
}

renderApp()
store.subscribe(renderApp)
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

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

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <App />
    </Provider>
)

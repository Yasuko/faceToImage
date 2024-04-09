import React from 'react';
import { Provider } from 'react-redux';

// import rootReducer from './reducers'
import { createStore } from '../_store/configureStore'

// import components
import GPOIndex from './GyarunoPanty/index'

interface FaceInterface {
    page: string
}

const store = createStore()

const Gpo = (p: FaceInterface): JSX.Element => {

    return (
        <Provider store={store}>
            { changer(p.page) }
        </Provider>
    )
}

const changer = (p: string): JSX.Element => {
    if (p === 'whisper') return <GPOIndex />
    return <GPOIndex />
}

export default Gpo

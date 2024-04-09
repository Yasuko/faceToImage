import React from 'react'
import { useSelector } from 'react-redux'

// import reducer
import {
    ShowScreenPropsInterface, ShowScreenInterface,
    initialState
} from '../../_domain/gyaruno_panty/reducers/ShowScreen'

// import component
import Home from './Home'
import FaceCapture from './FaceCapture'
import ShowImage from './ShowImage'
import ShowFace from './ShowFace'
import TokenForm from '../component/token/InputToken'


export const Screen = (): JSX.Element => {
    const ss = useSelector((state: ShowScreenPropsInterface): ShowScreenInterface => {
        return state.ShowScreen === undefined ? initialState : state.ShowScreen
    })
    return (
        <div>
            { checkScreen(ss) }
        </div>
    )
}

const checkScreen = (ss: ShowScreenInterface): JSX.Element => {
    if (ss.target === '') {
        return <Home />
    }
    if (ss.target === 'faceCapture') {
        return <FaceCapture />
    }
    if (ss.target === 'showFace') {
        return <ShowFace />
    }
    if (ss.target === 'showImage') {
        return <ShowImage />
    }
    if (ss.target === 'token') {
        return <TokenForm />
    }

    return <div></div>
}

export default Screen

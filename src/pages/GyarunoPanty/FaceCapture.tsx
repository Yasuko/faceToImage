import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    FaceDetectionPropsInterface,
    FaceDetectionInterface, initialState
} from '../../_domain/gyaruno_panty/reducers/FaceDetection'
// import Component

// import Hook
import FaceDetectionHook from '../_hook/FaceDetection'

export const FaceCapture = (): JSX.Element => {
    const dispatch = useDispatch()

    const f: FaceDetectionInterface = useSelector((state: FaceDetectionPropsInterface) => {
        return (state.FaceDetection) ? state.FaceDetection : initialState
    });

    useEffect(() => {
        dispatch({
            type: 'GyarunoPantyAction/faceCapture',
            videoId: 'faceOrientation',
        })
    }, [])

    return (
    <div className='container-fluid full'>
        <div className="panty-base center-block">
                
            <div className="face-detect-video center-block">
                <video id="faceOrientation" className="facevideo" width={600}></video>
            </div>
            {(f.doneInitial) ? <FaceDetectionHook
                className='textvideo'
                videoId='faceOrientation'
                dispatch='GyarunoPantyAction/faceDetect'
            /> : <div></div>}
            <div className="face-detect-message-box">
                { orientationMessage(f.faceOrientation)}
            </div>
            <div className="testcanvas">
                <canvas
                    id="faceOrientationCanvas"
                    className="facecanvas center-block">
                </canvas>
            </div>
        </div>
    </div>
    )
}

const orientationMessage = (messages: string[]): JSX.Element | JSX.Element[] => {
    if (messages.length === 0) return <div></div>
    return messages.map((message: string, index: number) => {
        return <div key={index} className="face-detect-message">{message}</div>
    })
}

export default FaceCapture

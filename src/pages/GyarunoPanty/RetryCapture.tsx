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

export const RetryCapture = (): JSX.Element => {
    const dispatch = useDispatch()

    const f: FaceDetectionInterface = useSelector((state: FaceDetectionPropsInterface) => {
        return (state.FaceDetection) ? state.FaceDetection : initialState
    });

    useEffect(() => {
        dispatch({
            type: 'GyarunoPantyAction/faceCapture',
            videoId: 'faceOrientation',
        })
    },[])

    return (
    <div className='container-fluid'>
        <div className="row">
            <div className="form-group col">
                
                <div className="testvideo">
                    <video id="faceOrientation" className="facevideo"></video>
                </div>
                {(f.doneInitial) ? <FaceDetectionHook
                    className='textvideo'
                    videoId='faceOrientation'
                    dispatch='GyarunoPantyAction/faceDetect'
                /> : <div></div>}
                <div>
                    { orientationMessage(f.faceOrientation)}
                </div>
                <div className="testcanvas">
                    <canvas id="faceOrientationCanvas" className="facecanvas"></canvas>
                </div>
            </div>
        </div>
    </div>
    )
}

const orientationMessage = (messages: string[]): JSX.Element | JSX.Element[] => {
    if (messages.length === 0) return <div></div>
    return messages.map((message: string, index: number) => {
        return <div key={index}>{message}</div>
    })
}

export default RetryCapture

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {
    FaceDetectionHelper
} from '../../_domain/gyaruno_panty/helper/FaceDetectHelper'

interface FaceInterface
{
    className   : string,
    videoId     : string,
    dispatch    : string,
}

const FaceDetectionHook = ((s: FaceInterface): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        FaceDetectionHelper.call().doDetection((result: any) => {
            dispatch({
                type    : s.dispatch,
                result  : result
            });
        });
    }, [])

    return (
        <div>
            <div className={s.className}>
                <video id={s.videoId}></video>
            </div>
        </div>
    );
})

export default FaceDetectionHook

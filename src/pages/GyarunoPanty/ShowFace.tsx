import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    PantyImagePropsInterface,
    PantyImageInterface,
    initialState,
} from '../../_domain/gyaruno_panty/reducers/PantyImage';

// import Hook

export const ShowFace = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const pi = useSelector((state: PantyImagePropsInterface): PantyImageInterface => {
        return state.PantyImage === undefined ? initialState : state.PantyImage;
    })

    useEffect(() => {
        dispatch({
            type: 'GyarunoPantyAction/convertText',
        })
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col face-text-base'>
                    <div className=''>
                        <img
                            className='face-text-image'
                            src={pi.face}>
                        </img>
                    </div>
                    <button
                        className='panty-generate-agein'
                        onClick={() => {
                            dispatch({
                                type: 'GyarunoPantyAction/generateImage',
                            })
                        }}>
                        Generate Panty
                    </button>
                </div>
                <div className='col face-text-base'>
                    <div>
                        <span>
                            {pi.face_detect}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ShowFace;

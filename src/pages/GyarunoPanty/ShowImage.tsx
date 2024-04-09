import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    PantyImagePropsInterface,
    PantyImageInterface,
    initialState,
} from '../../_domain/gyaruno_panty/reducers/PantyImage';

// import Hook

export const ShowText = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const pi = useSelector((state: PantyImagePropsInterface): PantyImageInterface => {
        return state.PantyImage === undefined ? initialState : state.PantyImage;
    })

    if (pi.image === '') return <div></div>

    return (
        <div className='container-fluid whisper-show-text'>
            <div className='panty-base'>
                <img
                    className='panty-image'
                    width='50%'
                    src={pi.image}>
                </img>
            </div>
            <button
                className='panty-generate-agein'
                onClick={() => {
                    dispatch({
                        type: 'ShowScreen/set',
                        target: '',
                        show: true
                    })
                }}>
                Re: Generate Panty
            </button>
        </div>
    )
};

export default ShowText;

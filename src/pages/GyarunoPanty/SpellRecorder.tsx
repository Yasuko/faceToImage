import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import reducer
import CountDownAnimation from '../animation/countdown.animation'

export type ShowTextProps = {
    state?      : any,
}

export const SpellRecorder = (state: ShowTextProps): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'AudioAction/recorder',
        })
    }, [])
    return (
        <div className='container'>
            <audio id="whisper"></audio>
            <audio id="super"></audio>
            <canvas
                id="analyser_whisper"
                className='whisper-visualise'>
            </canvas>
            <CountDownAnimation />
        </div>
    )
}

export default SpellRecorder

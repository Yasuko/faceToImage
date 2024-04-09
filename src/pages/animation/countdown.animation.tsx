import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer
import {
    initialState,
    CountDownAnimationPropsInterface,
    CountDownAnimationInterface
} from './countdown.animation.reducer'
import './countdown.css'

const CountDownAnimation = (): JSX.Element => 
{
    const dispatch = useDispatch();
    const c = useSelector((state: CountDownAnimationPropsInterface) => {
        return (state.CountDownAnimation) ? state.CountDownAnimation : initialState;
    })
    
    if (c.show) {
        setTimeout(() => {
            if (c.count === 0) {
                dispatch({
                    type    : 'CountDownAnimation/show',
                    show    : false
                })
            }
            if (c.count > 0) {
                dispatch({
                    type    : 'CountDownAnimation/setCount',
                    count   : c.count - 1
                })
            }
        }, 1000)

        return (
            <div className={'CountDown-board '} >
                <div
                    className='show-CountDownBar'
                    style={{ animationDuration: c.count + 's'}}
                >

                </div>
                <div
                    className={'toggle-CountDown CountDown-text'}>
                    { c.count } { c.message } 
                </div>
            </div>
        )
    } else {
        return (<></>);
    }
}

export default CountDownAnimation

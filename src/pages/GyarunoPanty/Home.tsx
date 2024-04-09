import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import reducer

// import Component

// import Hook

export const Home = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type    : 'TokenAction/checkToken',
        })
    }, [])
    return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-12 form-group col center">
                <div
                    className='gyaruno-panty-start'
                    onClick={
                        () => {
                            dispatch({
                                type    : 'ShowScreen/set',
                                target  : 'faceCapture',
                                show    : false
                            })
                        }
                    }>
                    revolution
                </div>
            </div>
        </div>
    </div>
    )
}


export default Home
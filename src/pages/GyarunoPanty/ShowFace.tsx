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
                    <br></br>
                    <br></br>
                    <div>
                        <label className="sr-only" htmlFor="text1">生成プロンプト</label>
                        <textarea
                            cols={80}
                            rows={8}
                            className="form-control mb-2"
                            id="text1"
                            placeholder="Input Sample"
                            defaultValue={pi.prompt}
                            onChange={(e) => {
                                dispatch({
                                    type    : 'PantyImage/setPrompt',
                                    prompt  : e.target.value
                                })
                            }} />
                        <span>
                            顔写真から作成した人相とプロンプトをあわせて、柄を生成します。
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ShowFace;

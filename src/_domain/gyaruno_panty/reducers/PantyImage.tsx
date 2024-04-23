import { createSlice } from '@reduxjs/toolkit'

export interface PantyImagePropsInterface {
    PantyImage?: PantyImageInterface
    dispatch?: any
}

export interface PantyImageInterface {
    image       : string
    face        : string
    face_detect : string
    prompt      : string
}

export const initialState: PantyImageInterface = {
    image       : '',
    face        : '',
    face_detect : '',
    prompt      : '日本の四季、花鳥風月、を全面に押し出した和風で素敵な柄のデザインを作って下さい。'
};

const slice = createSlice({
    name: 'PantyImage',
    initialState,
    reducers: {
        setPrompt: (state: any, action: any) => {
            return Object.assign({}, state, {
                prompt: action.prompt
            })
        },
        setImage: (state: any, action: any) => {
            return Object.assign({}, state, {
                image: action.image
            })
        },
        setFace: (state: any, action: any) => {
            return Object.assign({}, state, {
                face: action.face
            })
        },
        setFaceDetect: (state: any, action: any) => {
            return Object.assign({}, state, {
                face_detect: action.face_detect
            })
        },
        reset: (state: any, action: any) => {
            return initialState
        }
    }
});

export default slice.reducer

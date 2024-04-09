import { createSlice } from '@reduxjs/toolkit'

export type ShowScreenPropsInterface = {
    ShowScreen?: ShowScreenInterface
    dispatch?: any
}

export type ShowScreenInterface = {
    target      : string
    show        : boolean
}

export const initialState: ShowScreenInterface = {
    target      : '',
    show        : false,
}

const slice = createSlice({
    name: 'ShowScreen',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                target: action.target,
                show: action.show,
            })
        },
        setShow: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show,
            })
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;

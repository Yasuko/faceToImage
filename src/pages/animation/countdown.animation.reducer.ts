import { createSlice } from '@reduxjs/toolkit'

export interface CountDownAnimationPropsInterface {
    CountDownAnimation?: CountDownAnimationInterface
    dispatch?: any
}

export interface CountDownAnimationInterface {
    show: boolean
    count: number
    message: string
}

export const initialState: CountDownAnimationInterface = {
    show: false,
    count: 0,
    message: ''
};

const slice = createSlice({
    name: 'CountDownAnimation',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show,
                count: action.count,
                message: action.message
            });
        },
        show: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show
            });
        },
        setCount: (state: any, action: any) => {
            return Object.assign({}, state, {
                count: action.count
            });
        },
        setMessage: (state: any, action: any) => {
            return Object.assign({}, state, {
                message: action.message
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface FaceDetectionPropsInterface
{
    FaceDetection?  : FaceDetectionInterface,
    dispatch?       : any;
}

export interface FaceDetectionInterface
{
    initial         : boolean,  // 処理開始フラグ( true: 処理開始、 false: 処理中止)
    doneInitial     : boolean,
    onLoad          : boolean,  // モデルデータ読み込みフラグ(true: 読込完了、false: 未処理)
    doneLoad        : boolean,
    onCapture       : boolean,  // キャプチャ中フラグ(true: キャプチャ中、false: None)
    faceOrientation : string[]  // 顔の向き
}

export const initialState: FaceDetectionInterface = {
    initial         : false,
    doneInitial     : false,
    onLoad          : false,
    doneLoad        : false,
    onCapture       : false,
    faceOrientation : []
}

const slice = createSlice({
    name: 'FaceDetection',
    initialState,
    reducers: {
        toggleInitial: (state: any, action: any) => {
            return Object.assign({}, state,
                { initial     : action.initial, }
            )
        },
        toggleDoneInitial: (state: any, action: any) => {
            return Object.assign({}, state,
                { doneInitial     : action.doneInitial, }
            )
        },
        toggleOnLoad: (state: any, action: any) => {
            return Object.assign({}, state,
                { onLoad    : action.onLoad, }
            )
        },
        toggleDoneLoad: (state: any, action: any) => {
            return Object.assign({}, state,
                { doneLoad    : action.doneLoad, }
            )
        },
        toggleOnCapture: (state: any, action: any) => {
            return Object.assign({}, state,
                { onCapture : action.onCapture, }
            )
        },
        setFaceOrientation: (state: any, action: any) => {
            return Object.assign({}, state,
                { faceOrientation : action.faceOrientation, }
            )
        },
        resetContent: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;

import { put, takeEvery } from 'redux-saga/effects'

// import helper
import { VideoHelper } from './helper/video.helper'

// import reducer

// Root Saga登録配列
export const RootVideoAction = [
    // フック
    takeEvery('VideoAction/hook', hook),
    // 録画開始
    takeEvery('VideoAction/camera', camera),
    // 録画終了
    takeEvery('VideoAction/doneCamera', doneCamera),
    // 録画を保存
    takeEvery('VideoAction/setMove', setMove),
];

/**
 * Video Hook受け口
 * @param val 
 */
export function* hook(val: any): any {
    yield put({
        type        : val.task,
        data        : val.data,
    })
}

/**
 * 録画開始
 * @param val 
 * @returns any
 */
export function* camera(val: any): any {
    yield put({
        type        : 'WhisperOption/setRecVideo',
        recVideo    : true,
    })

    yield VideoHelper.call()
                .setTask('VideoAction/setMove')
                .setup()
    yield VideoHelper.call().start()
}

/**
 * 録画終了処理
 * @param val 
 */
export function* doneCamera(val: any): any {
    yield VideoHelper.call().stop()
    const cams = yield VideoHelper.call().getMoves()
    console.log(cams)


    yield put({
        type        : 'WhisperOption/setRecVideo',
        recVideo    : false,
    })
}

export function* setMove(val: any): any {
    yield put({
        type        : 'WhisperOption/addRecorder',
        recorder    : {
            rec         : val.data.move,
            time        : val.data.time,
            name        : val.data.name + '.' + val.data.extension,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : val.data.extension,
        }
    });
}

export function*showLoading(show: boolean, message: string = ''): any
{
    yield put({
        type        : 'LoadingAction/showLoading',
        show        : true,
        message     : message
    });
} 


import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { SocketHelper } from './helper/socket.helper'

import { loadingHide } from '../animation/animation'
// import reducer
import {
    JobStackPropsInterface,
    JobStackInterface,
    initialState
} from '../_all/reducers/JobStack'

const JobStack = (state: JobStackPropsInterface) => state.JobStack

// Root Saga登録配列
export const RootSocketAction = [
    takeEvery('SocketAction/hub', hub),
    takeEvery('SocketAction/send', send),
    takeEvery('SocketAction/sendMessage', sendMessage)
];

/**
 * Socketの受信受け口
 * @param val 
 * @returns 
 */
export function* hub(val: any): any {
    if (val.data === undefined
        || val.data.data === undefined
    ) {
        console.log(val)
        yield errorJob(val)
        return
    }
    console.log(val)
    switch (val.data.task) {
        case 'chat':
            yield setResult(val.data.data[0])
        case 'whisper':
            const text = (val.data.hasOwnProperty('data'))
                        ? val.data.data
                        : val.data
            yield setResult(text)
        case 'image':
            yield setResult(val.data.data.result.data[0].b64_json)
            break
        default:
            console.log(val)
            yield errorJob(val)
            break
    }

    yield put({
        type    : 'JobStack/reset'
    })
}

function* setResult(data: any): any {
    // ジョブスタックからジョブ情報を取得
    const job = yield select(JobStack)
    yield put({
        type                : job.jobs[0].dispatch,
        [job.jobs[0].task]  : data,
        key                 : job.jobs[0].key,
        ...job.jobs[0].options
    })
}

/**
 * データを送信
 * @param val 
 * @returns
 */
export function* sendMessage(val: any): any {
    yield SocketHelper.call()
            .send(
                yield SocketHelper.call().fileToBase64(val.message)
            )
}

export function* send(val: any): any {
    //console.log(JSON.stringify(val.message))
    yield SocketHelper.call().send(val.message)
}

/**
 * エラー発生時の処理
 * @param val 
 */
function* errorJob(val: any): any {
    yield put({
        type    : 'JobStack/reset'
    })

    yield loadingHide()
    
    // トースターアニメーションで失敗を通知
    yield put({
        type        : 'toasterAnimation/setShow',
        show        : true,
        text        : '失敗しました',
        mode        : 'error',
    })
}


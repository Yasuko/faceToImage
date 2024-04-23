import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { FaceOrientationHelper } from './helper/FaceOrientation.helper'
import { FaceDetectionHelper } from './helper/FaceDetectHelper'

import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { ImageModel } from '../_model/image.model'
import { VisionModel } from '../_model/vision.model'

// import reducer
import {
    PantyImagePropsInterface,
} from './reducers/PantyImage'
import {
    ShowScreenPropsInterface,
} from './reducers/ShowScreen'
import {
    TokenFormPropsInterface,
} from '../token/reducers/TokenForm'


const Token = (state: TokenFormPropsInterface) => state.TokenForm
const PantyImage = (state: PantyImagePropsInterface) => state.PantyImage
const Screen = (state: ShowScreenPropsInterface) => state.ShowScreen

// Root Saga登録配列
export const RootGyarunoPantyAction = [
    // 顔撮影開始
    takeEvery('GyarunoPantyAction/faceCapture', faceCapture),
    // 顔切り出し
    takeEvery('GyarunoPantyAction/faceDetect', faceDetect),

    // whisperAPIに送信
    takeEvery('GyarunoPantyAction/convertText', convertText),

    // 柄生成
    takeEvery('GyarunoPantyAction/generateImage', generateImage),

]


/**
 * ビデオデバイスの接続・初期化・映像取得まで行う
 * @param val 
 */
function* faceCapture(val: any): any
{
    const screen = yield select(Screen)

    if (screen.show === true) return

    yield put({
        type        : 'ShowScreen/setShow',
        show        : true,
    })

    yield FaceDetectionHelper.call().getVideoStream()
    yield FaceDetectionHelper.call().playVideo(val.videoId)
    yield put({
        type        : 'FaceDetection/toggleDoneInitial',
        doneInitial : true
    });
}

function* faceDetect(val: any): any
{
    const detect = yield FaceOrientationHelper.call().detect(val.result)
    const orientation = yield FaceOrientationHelper.call().orientationCheck(detect)

    if (orientation === true) {
        yield put({
            type    : 'FaceDetection/setFaceOrientation',
            faceOrientation: []
        })
        const faceShot = yield FaceDetectionHelper.call().getImageToVideo()
        yield FaceDetectionHelper.call().stopDetection()
        yield FaceDetectionHelper.call().stopVideo()

        yield put({
            type    : 'PantyImage/setFace',
            face    : faceShot
        })

        yield put({
            type    : 'ShowScreen/set',
            target  : 'showFace',
            show    : true,
        })
    } else {
        yield put({
            type    : 'FaceDetection/setFaceOrientation',
            faceOrientation: orientation
        })
    }

}

/**
 * 顔の説明取得
 * @param val 
 */
function* convertText(val: any): any {
    yield loadingShow('Now Bonnou Kiite Masu Now')

    yield put({
        type        : 'ShowScreen/setShow',
        show        : true,
    })

    const image = yield select(PantyImage)
    const token = yield select(Token)
    
    const i = yield VisionModel.call(token.token).question(image.face)

    yield put({
        type        : 'PantyImage/setFaceDetect',
        face_detect : i.message.content
    })

    yield loadingHide()
}

/**
 * 柄作成開始
 * @param val 
 * @returns 
 */
function* generateImage(val: any): any
{
    yield put({
        type        : 'ShowScreen/set',
        target      : 'showImage',
        show        : true,
    })

    yield loadingShow('Now Summons The Suteki Image Now')

    const p = yield select(PantyImage)
    const token = yield select(Token)
    
    const i = yield ImageModel.call(token.token)
                    .generate(p.face_detect, p.prompt)
                    
    console.log('Face convert image', i)

    yield loadingHide()

    yield put({
        type    : 'PantyImage/setImage',
        image   : 'data:image/png;base64,' + i.data[0].b64_json,
    })

    yield put({
        type    : 'ShowScreen/set',
        target  : 'showImage',
        next    : '',
    })
}


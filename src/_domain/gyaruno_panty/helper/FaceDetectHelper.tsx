import { MediaService } from '../../../_lib/mediaDevice/media.service'
import { FaceDetectService } from '../../../_lib/tfjs/face-detect2.service'
import { ImageStreamService } from '../../../_lib/image/image_stream.service'

export class FaceDetectionHelper
{
    private static instance: FaceDetectionHelper

    private loopCallBack: Object = () => {}

    /**
     * TestHelperインスタンス取得
     * @returns TestHelper
     */
    public static call(): FaceDetectionHelper
    {
        if (!FaceDetectionHelper.instance) 
        {
            FaceDetectionHelper.instance = new FaceDetectionHelper()
        }
        return FaceDetectionHelper.instance
    }

    public setCallBack(callBack: Object): FaceDetectionHelper
    {
        this.loopCallBack = callBack
        return this
    }


    /**
     * WebCAMを使いビデオストリーム取得
     */
    public async getVideoStream(): Promise<void>
    {
        await MediaService.call()
                .getLocalStream(
                    MediaService.call()
                        .callStreamModeService() // 配信モード作成インスタンス取得
                        .onVideo()               // ビデオを有効化
                        .getStreamMode(),        // MediaAPIに渡す配信オプションを取得
                    'getUserMedia'
                )
        return
    }

    /**
     * 顔を検出
     * 一度呼び出すと「stopDetection」を呼ぶまで自動ループ
     * @param next Function 顔検出時の処理
     */
    public async doDetection(next: Function)
    {
        FaceDetectService.call()
            .setVideoTarget(MediaService.call().getVideoTarget())
            .faceWatch(true, 500, next)
    }

    public async getImageToVideo(): Promise<string>
    {
        return await ImageStreamService.call()
            .setVideoTarget(MediaService.call().getVideoTarget())
            .getImageToStream()
    }

    /**
     * 顔検出停止
     */
    public stopDetection()
    {
        FaceDetectService.call().clearProcess()
    }

    /**
     * 映像ストリームを取得
     * @returns MediaStream
     */
    public getStream(): MediaStream
    {
        return MediaService.call().getStream()
    }

    /**
     * 映像再生
     * @param target string videoタグのid名
     * @return Promise<void>
     */
    public async playVideo(target: string): Promise<void>
    {
        await MediaService.call()
            .setVideoTarget(target)
            .playVideo()
    }

    /**
     * 映像停止
     * @return void
     */
    public stopVideo(): void
    {
        MediaService.call()
            .stopVideo()
    }

    /**
     * Promiseを使って擬似的にスリープさせる
     * @param time number default = 1000
     * @returns Promise<boolean>
     */
    public async sleep(time: number = 1000): Promise<boolean>
    {
        return new Promise((result) => {
            const sleep = async (val: boolean = false) => {
                if (val) {
                    result(true)
                    return
                }
                setTimeout(sleep, time, true)
            }
            sleep()
        })
    }

}

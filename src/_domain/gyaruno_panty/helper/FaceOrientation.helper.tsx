import { FaceService } from '../../../_lib/tfjs/face.service';
import { FaceOrientationService } from '../../../_lib/tfjs/face-orientation.service';

export class FaceOrientationHelper
{
    private static instance: FaceOrientationHelper;
    private fds: FaceService;

    public constructor()
    {
        this.fds = new FaceService();
    }

    /**
     * FaceOrientationHelperインスタンス取得
     * @returns FaceOrientationHelper
     */
    public static call(): FaceOrientationHelper
    {
        if (!FaceOrientationHelper.instance) 
        {
            FaceOrientationHelper.instance = new FaceOrientationHelper();
        }
        return FaceOrientationHelper.instance;
    }


    public async detect(
        mesh: any
    ): Promise<number[]> {
        return await FaceOrientationService.call()
                        .setFaceMesh(mesh)
                        .do()
                        .getRote()
    }

    public orientationCheck(
        result: number[]
    ): string[] | true {
        const messages = ['下を向いて', '上を向いて', '右を向いて', '左を向いて']
        const _result = messages.filter((val, key) => {
            if (result[key] > 0.2) {
                return val
            }
        })
        console.log(_result)
        return (_result.length === 0) ? true : _result as string[]
    }

    /**
     * 顔の向きを検出　Test3の内容
     * @returns 
     */
    public async faceOrientation(
        video: string, canvas: string
    ): Promise<any> {
        // 顔検知サービス初期化、Videoタグを渡す
        this.fds
            .callDetectService()
            .setStream(video);
        // 向き修正用のサポート機能有効化
        this.fds
            .setCanvasTarget(canvas)
            .onFaceOrientation()
            .onSupport();

        return await this.fds
            .faceWatch().then(() => {
                this.fds.stopLoop();
            });
    }


    public async sleep(time: number = 1000): Promise<boolean>
    {
        return new Promise((result) => {
            const sleep = async (val: boolean = false) => {
                if (val) {
                    result(true);
                    return;
                }
                setTimeout(sleep, time, true);
            }
            sleep();
        });
    }


}

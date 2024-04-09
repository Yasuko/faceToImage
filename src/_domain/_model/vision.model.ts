import { VisionService } from '../../_lib/gpt/vision.service'

export type VisionReturn = {
    choices: {
        finish_reason: string,
        index: number,
        logprobs: any,
        message: {
            content: string,
            role: string
        }
    }[],
    created: number,
    id: string,
    model: string
    object: string
    system_fingerprint: string
}

export class VisionModel {
    private static instance: VisionModel

    private faceWord: string = '写っている人の顔の特徴を、村上春樹風の抽象表現を駆使し、表現豊かに200文字以内で表現して下さい'

    public static call(key: string): VisionModel {
        if (!VisionModel.instance) {
            VisionModel.instance = new VisionModel(key)
        }
        return VisionModel.instance
    }

    public constructor(key: string) {
        VisionService.call().setAPIKey(key)
    }

    public async question(
        image: string
    ): Promise<VisionReturn> {
        VisionService.call()
            .setImage(image, this.faceWord)
        
        await VisionService.call().do()
        return VisionService.call().getResult()
    }
}
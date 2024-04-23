import { ImageService } from '../../_lib/gpt/image.service'

export type ImageReturn = {
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

export class ImageModel {
    private static instance: ImageModel

    public static call(key: string): ImageModel {
        if (!ImageModel.instance) {
            ImageModel.instance = new ImageModel(key)
        }
        return ImageModel.instance
    }

    public constructor(key: string) {
        ImageService.call().setAPIKey(key)
    }

    public async generate(
        detect: string,
        spice : string,
    ): Promise<ImageReturn> {
        ImageService.call()
            .setJob('generate')
            .setOptions({
                prompt  : '「' + detect + '」この文章をアクセントに加え、' + spice + 'を加えた画像を生成してください。',
            })
        
        ImageService.call().ini()
        await ImageService.call().do()
        return ImageService.call().getResult()
    }
}
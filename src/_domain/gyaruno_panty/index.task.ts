import { RootVideoAction } from './video.action'
import { RootGyarunoPantyAction } from './gyaruno_panty.action'

export const RootWhisperDomain = [
    ...RootVideoAction,
    ...RootGyarunoPantyAction
]

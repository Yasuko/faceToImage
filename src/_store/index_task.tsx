import { all } from 'redux-saga/effects'

import { RootWhisperDomain } from '../_domain/gyaruno_panty/index.task'
import { RootSocketAction } from '../_domain/socket/socket.action'
import { RootTokenAction } from '../_domain/token/token.action'
// Load AnimationAction
import { AnimationTask } from '../pages/animation/index.task'



export default function* rootSaga() {
    yield all([
        ...RootWhisperDomain,
        ...RootSocketAction,
        ...RootTokenAction,
        ...AnimationTask
    ]);
}

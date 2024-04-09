import { animationReducers } from '../pages/animation/index.reducer'
import { GyarunoPantyReducer } from '../_domain/gyaruno_panty/index.reducers'
import { TokenReducer } from '../_domain/token/index.reducers'

import ShowContent from '../_domain/_all/reducers/ShowContent'
import FileForm from '../_domain/_all/reducers/FileForm'

import JobStack from '../_domain/_all/reducers/JobStack'

export const reducer = {
    ...animationReducers,
    ...GyarunoPantyReducer,
    ...TokenReducer,
    ShowContent,
    FileForm,
    JobStack,
}

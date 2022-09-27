import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'
import toastErrors from './middleware/toastErrors'
import api from './middleware/api'
import func from './middleware/func'

const createStore= ()=>{
    return configureStore({
        reducer,
        middleware:[
            ...getDefaultMiddleware(),
            func,
            toastErrors,
            api
        ]
    })
}
export default createStore

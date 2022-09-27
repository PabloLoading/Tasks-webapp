
const logger=store=>next=>action=>{
    console.log('store: ',store.getState())
    console.log('action: ',action.type)
    return next(action)
}

export default logger
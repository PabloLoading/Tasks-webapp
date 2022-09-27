import { createSlice } from "@reduxjs/toolkit";
import {createSelector} from 'reselect'
import {apiCallBegan} from './api.js'
import moment from 'moment'

const slice=createSlice({
    name:'tasks',
    initialState:{
        list:[],
        loading:false,
        lastFetch: null
    },
    reducers:{
        tasksRequested:(tasks,action)=>{
            tasks.loading=true
        },
        taskAdded:(tasks,action)=>{
            tasks.list.push(action.payload)
        },
        taskDone: (tasks,action)=>{
            const { id} = action.payload
            const pos = tasks.list.findIndex(task=>task.id==id)
            tasks.list[pos].done=true
        },
        taskRemoved: (tasks,action)=>{
            let newList=tasks.list.filter(task=>task.id!=action.payload.taskId)
            tasks.list=newList
        },
        taskToUser: (tasks,action)=>{
            const { id,userId} = action.payload
            const pos = tasks.list.findIndex(task=>task.id==id)
            tasks.list[pos].userId=userId
        },
        tasksReceived:(tasks,action)=>{
            tasks.list=action.payload
            tasks.loading=false
            tasks.lastFetch=Date.now()
        },
        tasksRequestFailed:(tasks,action)=>{
            tasks.loading=false
        }
    }
})
const tasksReducer = slice.reducer
export default tasksReducer
const {taskAdded,taskDone,taskRemoved,taskToUser,tasksReceived,tasksRequested,tasksRequestFailed}=slice.actions

const url='tasks/'

export const loadTasks=()=>(dispatch,getState)=>{
    /*
    const {lastFetch} = getState().entities.tasks
    const diffMinutes= moment().diff(moment(lastFetch),'minutes')
    if(diffMinutes<1)return*/

    dispatch(
        apiCallBegan({
            url, 
            onStart:tasksRequested.type,
            onSuccess: tasksReceived.type,
            onError:tasksRequestFailed.type
        })
    )

}
export const addTask=task=>apiCallBegan({
    url,
    method:'post',
    data:task,
    onSuccess:taskAdded.type
})
export const removeTask=(taskId)=>apiCallBegan({
    url:`${url}${taskId}`,
    method:'delete',
    data:{taskId},
    onSuccess:taskRemoved.type
})

export const setTaskToUser=(taskId,userId)=>apiCallBegan({
    url,
    method:'put',
    data: {taskId,userId},
    onSuccess:taskToUser.type
})
export const doTask=taskId=>apiCallBegan({
    url,
    method:'put',
    data: {taskId,done:true},
    onSuccess:taskDone.type
})

export const getUndoneTasks = createSelector(
    state=>state.entities.tasks.list || [],
    tasks => tasks.filter(task=>!task.done)
)
export const getTaskByUser= userId=> 
    createSelector(
        state=>state.entities.tasks || [],
        tasks=>tasks.filter(task=>task.userId===userId)
    )

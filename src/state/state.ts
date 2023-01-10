import * as types from "../logics/types";

let cardMaker: types.CanvasType = {
    name: "Card Maker",
    size: { 
        width: 800, 
        height: 600
     },
    bgColor: "#fff",
    listObjects: [],    
}


// let todos: Todos = getTodosFromStorage()
let changeStateHandler: Function = () => {}

function getState(): types.CanvasType {
    return cardMaker
}

function setState(newCardMaker: types.CanvasType) {
    cardMaker = newCardMaker
    changeStateHandler()
    // setTodosToStorage()
}

function dispatch(modifyFn: Function, payload: Object) {
    setState(modifyFn(cardMaker, payload))
}

function addChangeStateHandler(handler: Function) {
    changeStateHandler = handler
}

// function setTodosToStorage() {
//     window.localStorage.setItem(KEY, JSON.stringify(todos))
// }

// function getTodosFromStorage(): types.CanvasType {
//     const todos = window.localStorage.getItem(KEY)
//     return todos ? JSON.parse(todos) : []
// }

export {
    getState,
    dispatch,
    addChangeStateHandler,
}
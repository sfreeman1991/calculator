import { createStore } from "redux";

let initialState = {
  result: "",
  keysPressed: []
};

let store = createStore((state = initialState, action) => {
  if (action && action.type=="add") {
      console.log(action);
    return {
      result: action.payLoad.result,
      keysPressed: action.payLoad.keysPressed
    };
  }else{
    return state;
  }
}, initialState);

store.subscribe(()=>{
    console.log(store.getState());
});
window.store = store;
console.log(store);
export default store;

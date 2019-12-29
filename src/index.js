import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./Calculator/component";
import { Provider } from "react-redux";
import "./Global/styles.css";
import store from './Global/store';

class App extends React.Component{
  render(){
    return (
    <Provider store={store}>
    <div className="App">
      <h2>Calculator: React and Redux</h2>
      <Calculator />
    </div>
    </Provider>
  );
  }
  
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

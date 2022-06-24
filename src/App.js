import React, { useState } from 'react';
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import './App.css';
import Header from './common/Header';
import Home from './Components/Home';
import TaskCrud from './Components/TaskCrud';
import TaskList from './Components/TaskList';
import allReducers from './redux/rootReducer';
let composeEnhancers = compose;
const store = createStore(allReducers, composeEnhancers);
const persistor = persistStore(store);
function App() {
  const [activeItem, setActiveItem] = useState("home")
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <Header activeItem={activeItem} setActiveItem={setActiveItem} />
          {activeItem === "home" && <Home />}
          {activeItem === "taskCrud" && <TaskCrud />}
          {activeItem === "taskList" && <TaskList />}
        </div>
      </PersistGate>
    </ Provider>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducer'
import { Provider } from 'react-redux'
import rootSaga from './saga'
import  Header from './containers/header'
import  Sidebar from './containers/sidebar'
import  Content from './containers/content'
import createSagaMiddleware from 'redux-saga'
import { loadState, saveState } from './localStorage'
import throttle  from 'lodash/throttle'
import * as projectActions from './redux/action/projectAction'
const logger = store => next => action => {

  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
const persistedState = loadState()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000))

store.dispatch(projectActions.start())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid main-container">
          <div className="row sidebar-content">
            <div className="col-md-2 side-bar">
              <Sidebar/>
            </div>
            <div className="col-md-10 content">
              <Content/>
            </div>
          </div>
        </div>
      </Provider>

    );
  }
}

export default App;

import { all } from 'redux-saga/effects';
// import listenerSaga from './listenerSaga'
import pushSaga from './pushSaga'
// import projectSaga from './projectSaga'
import channelSaga from './channelSaga'
import pheonixSocketSaga from './pheonixSocketSaga';
function *watchAll() {
    yield all([...pheonixSocketSaga, ...channelSaga]);
}
export default watchAll;
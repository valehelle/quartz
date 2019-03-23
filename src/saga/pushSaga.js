import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import pushTypes from '../redux/type/pushType'
import * as pushActions from '../redux/action/pushAction'
import { getAllPushIds } from '../redux/reducer';
const uuidv4 = require('uuid/v4');

function* removePush(action) {
    const state = yield select();
    const pushIds = getAllPushIds(state)
    if(pushIds.length <= 0){
        const pushId = uuidv4()
        const params = {
            pushId
        }
        yield put(pushActions.createPush(params))
    }
}

export const pushSaga = [
    takeLatest(pushTypes.REMOVE_PUSH, removePush),
]

export default pushSaga;
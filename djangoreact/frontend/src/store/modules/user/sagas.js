import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../libs/createRequestSaga';
import * as usersAPI from '../../../libs/api/users';
import * as USER from './actions';

const postAuthJwtSaga = createRequestSaga(
  USER.POST_AUTH_JWT,
  usersAPI.postAuthJwt,
);

// const getUserInfoSaga = createRequestSaga(
//   USER.GET_USER_INFO,
//   usersAPI.getUserInfo,
// );

export default function* rootSaga() {
  yield [
    yield takeLatest(USER.POST_AUTH_JWT, postAuthJwtSaga),
    // yield takeLatest(USER.GET_USER_INFO, getUserInfoSaga),
  ];
}
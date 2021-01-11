import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../libs/createRequestSaga';

export const RESET_MSG = 'user/RESET_MSG';
export const reset_msg = createAction(RESET_MSG);

// Redux 값을 저장할 때
export const SET_NEWS_QUERY = 'user/SET_NEWS_QUERY';
export const set_news_query = createAction(SET_NEWS_QUERY);

// API 호출 시
export const [
  POST_AUTH_JWT,
  POST_AUTH_JWT_SUCCESS,
  POST_AUTH_JWT_FAILED,
] = createRequestActionTypes('user/POST_AUTH_JWT');
export const post_auth_jwt = createAction(POST_AUTH_JWT);
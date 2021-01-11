import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as USER from './actions';

const initialState = {
  id: '',
  pw: '',
  jwt: '',
  query: '',
  news: [],
}

const user = handleActions(
  {
    [USER.POST_AUTH_JWT_SUCCESS]: (state, action) => {
      console.log('POST_AUTH_JWT_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.news = action.payload.items;
      });
    },
    [USER.POST_AUTH_JWT_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        draft.errorMsg = '요청실패';
        draft.errorCode = '404';
      })
    },
    [USER.SET_NEWS_QUERY]: (state, action) => {
      return produce(state, (draft) => {
        console.log('Query in reducer => ', action.payload)
        draft.query = action.payload;
      })
    }
  },
  initialState,
);

export default user;
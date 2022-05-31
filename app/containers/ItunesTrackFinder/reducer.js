import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: searchContainerTypes, Creators: searchContainerCreators } = createActions({
  requestGetSongs: ['searchedTerm'],
  requestGetSongDetails: ['trackId'],
  successGetSongs: ['data'],
  successGetSongDetails: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});

export const initialState = { searchedTerm: null, trackId: null, songsData: {}, trackDetails: {}, songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const searchContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchContainerTypes.REQUEST_GET_SONGS:
        draft.searchedTerm = action.searchedTerm;
        break;

      case searchContainerTypes.CLEAR_SONGS:
        draft.searchedTerm = null;
        draft.songsData = {};
        draft.songsError = null;
        break;

      case searchContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.data;
        break;

      case searchContainerTypes.REQUEST_GET_SONG_DETAILS:
        draft.trackId = action.trackId;
        break;

      case searchContainerTypes.CLEAR_SONG_DETAILS:
        draft.trackId = null;
        draft.trackDetails = {};
        draft.songsError = null;
        break;

      case searchContainerTypes.SUCCESS_GET_SONG_DETAILS:
        draft.trackDetails = action.data;
        break;

      case searchContainerTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default searchContainerReducer;

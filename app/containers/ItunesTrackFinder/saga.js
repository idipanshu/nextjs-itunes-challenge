import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs, getSongDetails } from '@services/songApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';

const { REQUEST_GET_SONGS, REQUEST_GET_SONG_DETAILS } = searchContainerTypes;
const { successGetSongs, successGetSongDetails, failureGetSongs } = searchContainerCreators;

export function* getItunesSongs(action) {
  const response = yield call(getSongs, action.searchedTerm);
  const { data, ok } = response;

  if (ok) {
    const result = {};

    data.results.forEach((song) => {
      result[song.trackId] = { ...song };
    });

    yield put(successGetSongs(result));
  } else {
    yield put(failureGetSongs(data));
  }
}

export function* getTrackDetails(action) {
  const response = yield call(getSongDetails, action.trackId);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetSongDetails(data.results[0]));
  } else {
    yield put(failureGetSongs(data));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getItunesSongs);
  yield takeLatest(REQUEST_GET_SONG_DETAILS, getTrackDetails);
}

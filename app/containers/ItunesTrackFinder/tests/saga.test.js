import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs, getSongDetails } from '@services/songApi';
import { apiResponseGenerator } from '@utils/testUtils';
import searchContainerSaga, { getItunesSongs, getTrackDetails } from '../saga';
import { searchContainerTypes } from '../reducer';

describe('iTunes SearchContainer saga test', () => {
  const generator = searchContainerSaga();
  const searchedTerm = 'Sam';
  const trackId = '1111111';

  let getItunesSongsGenerator = getItunesSongs({ searchedTerm });
  let getItunesTrackDetailsGenerator = getTrackDetails({ trackId });

  it('should start task to watch for actions', () => {
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_GET_SONGS, getItunesSongs));
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_GET_SONG_DETAILS, getTrackDetails));
  });

  it('should ensure that action of type FAILURE_GET_SONGS is dispatched when REQUEST_GET_SONGS fails', () => {
    const data = getItunesSongsGenerator.next().value;
    expect(data).toEqual(call(getSongs, searchedTerm));

    const error = { message: 'Something went wrong' };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(false, error)).value).toEqual(
      put({
        type: searchContainerTypes.FAILURE_GET_SONGS,
        error: error
      })
    );
  });

  it('should ensure that action of type FAILURE_GET_SONGS is dispatched when REQUEST_GET_SONG_DETAILS fails', () => {
    const data = getItunesTrackDetailsGenerator.next().value;
    expect(data).toEqual(call(getSongDetails, trackId));

    const error = { message: 'Something went wrong' };
    expect(getItunesTrackDetailsGenerator.next(apiResponseGenerator(false, error)).value).toEqual(
      put({
        type: searchContainerTypes.FAILURE_GET_SONGS,
        error: error
      })
    );
  });
});

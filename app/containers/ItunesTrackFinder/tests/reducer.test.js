import { initialState, searchContainerReducer, searchContainerTypes } from '../reducer';

describe('SearchContainer Reducer Tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(searchContainerReducer(undefined, [])).toEqual(state);
  });

  it('should return the initial state when action of type REQUEST_GET_SONGS is dispatched', () => {
    const searchedTerm = 'Sam';
    const expectedResult = { ...state, searchedTerm };

    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.REQUEST_GET_SONGS,
        searchedTerm
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when action of type REQUEST_GET_SONG_DETAILS is dispatched', () => {
    const trackDetails = {};
    const trackId = null;
    const expectedResult = { ...state, trackDetails };

    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.REQUEST_GET_SONG_DETAILS,
        trackDetails,
        trackId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that songsError has some data and loading = false when action of type FAILURE_GET_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error };

    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when action of type CLEAR_SONGS is dispatched', () => {
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.CLEAR_SONGS
      })
    ).toEqual(initialState);
  });
});

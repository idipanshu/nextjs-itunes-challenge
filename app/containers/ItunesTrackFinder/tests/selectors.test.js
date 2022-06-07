import {
  selectItunesData,
  selectItunesError,
  selectTrackId,
  selectTrackDetails,
  selectSearchContainerDomain,
  selectSearchedTerm
} from '../selectors';
import { initialState } from '../reducer';

describe('iTunes Search Container Selector Tests => ', () => {
  let mockState;
  let searchedTerm;
  let songsData;
  let trackId;
  let trackDetails;
  let songsError;

  beforeEach(() => {
    searchedTerm = 'Sam';
    songsData = {
      741296001: {
        trackId: 741296001,
        artistName: 'Francis Lawrence',
        collectionName: 'Sam Claflin: 4-Film Collection',
        trackName: 'The Hunger Games: Catching Fire'
      }
    };
    trackId = '111111';
    trackDetails = {
      trackId
    };

    songsError = 'Something went wrong';

    mockState = {
      iTunes: {
        searchedTerm,
        songsData,
        songsError,
        trackId,
        trackDetails
      }
    };
  });

  it('should select the searchedTerm', () => {
    const songSelector = selectSearchedTerm();
    expect(songSelector(mockState)).toEqual(searchedTerm);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectItunesData();
    expect(songsDataSelector(mockState)).toEqual(songsData);
  });

  it('should select trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockState)).toEqual(trackDetails);
  });

  it('should select trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockState)).toEqual(trackId);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectItunesError();
    expect(songsErrorSelector(mockState)).toEqual(songsError);
  });

  it('should select the global state', () => {
    const selector = selectSearchContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});

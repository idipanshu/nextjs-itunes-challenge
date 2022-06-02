import React from 'react';
import { renderProvider, timeout } from '@app/utils/testUtils';

import { searchContainerTypes } from '../../reducer';
import { SongDetailsPageTest as SongDetailsPage, mapDispatchToProps } from '../index';

describe('<TrackDetails /> tests', () => {
  let submitSpy;
  const query = { trackId: '11111111111' };

  const mockData = {
    trackId: 741296001,
    artistName: 'Francis Lawrence',
    collectionName: 'Sam Claflin: 4-Film Collection',
    trackName: 'The Hunger Games: Catching Fire'
  };

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <SongDetailsPage dispatchGetSongDetails={submitSpy} fetchedTracks={mockData} match={{ query }} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchGetItunesTracks when no data is present in the store', async () => {
    const searchedTerm = '11111111111';

    renderProvider(<SongDetailsPage dispatchGetSongDetails={submitSpy} fetchedTracks={{}} match={{ query }} />);

    await timeout(500);

    expect(submitSpy).toBeCalledWith(searchedTerm);
  });

  it('should NOT dispatchGetItunesTracks if matching data is found', async () => {
    const data = { 11111111111: {} };

    renderProvider(
      <SongDetailsPage
        songsData={{ ...data }}
        dispatchGetSongDetails={submitSpy}
        fetchedTracks={{}}
        match={{ query }}
      />
    );

    await timeout(500);

    expect(submitSpy).toBeCalledTimes(0);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSongsDataSpy = jest.fn();
    const trackId = '11111111111';

    const actions = {
      dispatchGetSongDetails: { trackId, type: searchContainerTypes.REQUEST_GET_SONG_DETAILS }
    };

    const props = mapDispatchToProps(dispatchSongsDataSpy);
    props.dispatchGetSongDetails(trackId);
    expect(dispatchSongsDataSpy).toHaveBeenCalledWith(actions.dispatchGetSongDetails);
  });
});

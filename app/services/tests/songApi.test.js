import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getSongDetails } from '../songApi';

describe('RepoApi tests', () => {
  const searchedTerm = 'arijit';
  const trackId = '11111111';
  const data = [
    {
      results: [
        {
          trackId: 741296001,
          artistName: 'Francis Lawrence'
        }
      ]
    }
  ];

  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);

    mock.onGet(`/search?term=${searchedTerm}`).reply(200, data);
    const res = await getSongs(searchedTerm);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);

    mock.onGet(`/search?term=${trackId}`).reply(200, data);
    const res = await getSongDetails(trackId);
    expect(res.data).toEqual(data);
  });
});

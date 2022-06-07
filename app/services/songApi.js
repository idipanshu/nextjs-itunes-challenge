import { generateApiClient } from '@utils/apiUtils';

const songApi = generateApiClient('itunes');

export const getSongs = (searchString) => songApi.get(`/search?term=${searchString}`);
export const getSongDetails = (trackId) => songApi.get(`/search?term=${trackId}`);

import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { SEARCHED_TERM, SONGS_DATA, SONGS_ERROR, TRACK_DETAILS, TRACK_ID } from './keys';
/**
 * Direct selector to the searchContainer state domain
 */

export const selectSearchContainerDomain = (state) => state.iTunes || initialState;

/**
 * Default selector used by SearchContainer
 */

export const selectItunesData = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, SONGS_DATA));

export const selectItunesError = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, SONGS_ERROR));

export const selectSearchedTerm = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, SEARCHED_TERM));

export const selectTrackDetails = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, TRACK_DETAILS));

export const selectTrackId = () => createSelector(selectSearchContainerDomain, (substate) => get(substate, TRACK_ID));

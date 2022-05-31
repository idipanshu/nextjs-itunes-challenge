import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchContainer state domain
 */

export const selectSearchContainerDomain = (state) => state.iTunes || initialState;

/**
 * Default selector used by SearchContainer
 */

export const selectItunesData = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'songsData'));

export const selectItunesError = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'songsError'));

export const selectSearchedTerm = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'searchedTerm'));

export const selectTrackDetails = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackDetails'));

export const selectTrackId = () => createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackId'));

/*
Combine all reducers in this file and export the combined reducers.
*/

import { enableAllPlugins } from 'immer';
import { combineReducers } from 'redux';

import appReducer from '@app/store/reducers/app';

enableAllPlugins();

export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    iTunes: appReducer
  });

  return rootReducer;
}

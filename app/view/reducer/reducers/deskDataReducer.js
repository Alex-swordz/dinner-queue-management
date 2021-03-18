'use strict';

import { cloneDeep } from 'lodash';
import actionList from '../../action/actionList';
const initialState = {};

function deskDataReducer(state = initialState, action) {
  let newState = cloneDeep(state);

  switch (action.type) {
    case actionList.DESK_DATA.INIT:
    case actionList.DESK_DATA.UPDATE:
      newState = action.deskData;
      return newState;
    default:
      return newState;
  }
}

export default deskDataReducer;
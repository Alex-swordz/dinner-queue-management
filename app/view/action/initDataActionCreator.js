'use strict';

import actionList from './actionList';

function updateDeskDataAction(deskData={}) {
  return {
    type: actionList.DESK_DATA.UPDATE,
    deskData: deskData
  };
}

function initDeskDataAction(deskData={}) {
  console.log('initDeskData action deskData:', deskData);
  return {
    type: actionList.DESK_DATA.INIT,
    deskData: deskData
  };
}

export {
  updateDeskDataAction,
  initDeskDataAction
};
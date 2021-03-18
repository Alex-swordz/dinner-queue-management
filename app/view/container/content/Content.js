'use strict';

import { connect } from 'react-redux';
import Content from '../../component/Content/Content';
import { getSetting } from '../../utils/WebAPIUtils';
import { initDeskDataAction } from '../../action/initDataActionCreator'

function mapStateToProps(state) {
  return {
    deskData: state.deskData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initDeskDataRequest: function (companyId, callback) {
      return getSetting(companyId, function (result) {
        callback(null, result);
      }, function (err){
        callback(err);
      });
    },
    initDeskData: function(deskData){
      dispatch(initDeskDataAction(deskData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
'use strict';

import { connect } from 'react-redux';
import initDataPane from '../component/initDataPane/initDataPane';
import { updateDeskDataAction } from '../action/initDataActionCreator';

function mapStateToProps(state) {
  return {
    deskData: state.deskData||{}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveDeskData: function (deskData) {
      dispatch(updateDeskDataAction(deskData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(initDataPane);
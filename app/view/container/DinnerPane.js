'use strict';

import { connect } from 'react-redux';
import dinnerPane from '../component/dinnerPane/dinnerPane';

function mapStateToProps(state) {
  return {
    deskData: state.deskData||{}
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(dinnerPane);
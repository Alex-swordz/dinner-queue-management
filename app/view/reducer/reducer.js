'use strict';

import {combineReducers} from 'redux';
import deskData from './reducers/deskDataReducer';

let appReducer = combineReducers({ deskData });

export default appReducer;
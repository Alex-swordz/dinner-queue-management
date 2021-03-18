/**
 * Created by alex on 2021-03-08.
 */

'use strict';

import React from 'react';
import Header from '../../component/Header/Header';
// import Content from '../../component/Content/Content';
import Content from '../../container/content/Content';
import './App.less';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Content />
      </React.Fragment>
    );
  }
}

export default App;

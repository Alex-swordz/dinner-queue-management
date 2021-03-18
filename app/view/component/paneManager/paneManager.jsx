import React from "react";
// import DinnerPane from "../dinnerPane/dinnerPane";
import DinnerPane from "../../container/DinnerPane";
import MoneyPane from "../moneyPane/moneyPane";
// import InitDataPane from "../initDataPane/initDataPane";
import InitDataPane from "../../container/InitDataPane";
import "./paneManager.less";

class PaneManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paneList: {
        dinner: <DinnerPane />,
        money: <MoneyPane />,
        init: <InitDataPane />
      }
    };
  }

  render() {
    let { paneList } = this.state;
    let actived = this.props.actived;
    return (
      <div id="paneManager">{actived ? paneList[actived] : "暂无激活面板"}</div>
    );
  }
}

export default PaneManager;

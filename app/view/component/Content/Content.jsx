import React from "react";
import "./Content.less";
import PaneManager from "../paneManager/paneManager";
import PropTypes from 'prop-types';
import utils from '../../utils/utils';

const menuList = utils.menuList;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: menuList,
      actived: menuList[0].key,
      deskData: {},
      errMsg: null
    };
  }

  componentWillMount() { //子组件加载前
    this.initDeskData.call(this, null);
  }

  initDeskData(companyId){
    this.props.initDeskDataRequest(companyId, function(err, result) {
      if(err) {
        this.setState({
          errMsg: '初始化失败'
        });
        return;
      }
      this.props.initDeskData(result.data);
      this.setState({
        deskData: result.data
      });
    }.bind(this));
  }

  handleActivedClick(actived) {
    this.setState({
      actived: actived
    });
  }

  render() {
    let { menuList, actived } = this.state;
    return (
      <div id="Content">
        <div className="menu">
          {menuList.map((item, i) => {
            return (
              <div
                key={item.key}
                className={"item" + (item.key===actived ? " actived": "")}
                onClick={this.handleActivedClick.bind(this, item.key)}
              >
                {item.text}
              </div>
            );
          })}
        </div>
        <PaneManager actived={actived} />
      </div>
    );
  }
}

export default Content;

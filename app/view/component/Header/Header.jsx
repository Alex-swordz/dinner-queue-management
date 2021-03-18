import React from "react";
import "./Header.less";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: []
    };
  }
  static defaultProps = {
    title: "点餐排队系统"
  };

  render() {
    let { title } = this.props;
    let { settings } = this.state;
    return (
      <div id="Header">
        <div className="title">{title}</div>
        <div className="setting">
          {settings.map((item, i) => {
            return (
              <div key={"setting_" + i} className="item">
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Header;

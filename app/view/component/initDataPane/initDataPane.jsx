import React from "react";
import AddModalBtn from "../ModalBtn/AddModalBtn";
import { CloseCircleFilled } from "@ant-design/icons";
import "./initDataPane.less";
import { saveSetting } from "../../utils/WebAPIUtils";

class InitDataPane extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: props.deskData,
      modalVisible: false
    };
  }

  addDataToParent(peopleNum, deskNum) {
    let key = "peopleNum_" + peopleNum;
    let { data } = this.state;
    data[key] = { peopleNum, deskNum };
    this.setState({ data });
  }

  deleteData(peopleNum) {
    let key = "peopleNum_" + peopleNum;
    let { data } = this.state;
    delete data[key];
    this.setState({ data });
  }

  saveDeskData() {
    let { data } = this.state;

    saveSetting(data, ()=>{
      this.props.saveDeskData(data);
      alert('添加成功');
    }, ()=>{
      alert('添加失败');
    });
  }

  render() {
    let { data } = this.state;
    let dataArr = Object.values(data);
    return (
      <div id="initDataPane" className="pane">
        <h2>InitDataPane</h2>
        <div className="pane-content">
          <div className="operation">
            <AddModalBtn text="添加" parent={this} />
          </div>
          <div className="settingData">
            <h3>配置面板：</h3>
            <div className="settingData-list">
              {dataArr.map((item) => {
                return (
                  <div className="settingData-item" key={'peopleNum_'+item.peopleNum}>
                    <CloseCircleFilled
                      className="icon_delete"
                      onClick={this.deleteData.bind(this, item.peopleNum)}
                    />
                    {item.peopleNum}人桌 | 数目：{item.deskNum}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="finish">
            <button
              className="ant-btn ant-btn-finish"
              onClick={this.saveDeskData.bind(this)}
            >
              完成配置
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InitDataPane;

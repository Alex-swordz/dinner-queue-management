import React from "react";
import moment from "moment";
import { isEqual } from "lodash";
import Scheduler from './Scheduler';
import DinnerInModalBtn from '../ModalBtn/DinnerInModalBtn';
import DinnerOutModalBtn from '../ModalBtn/DinnerOutModalBtn';
import { Modal, Input } from 'antd';
import './dinnerPane.less';

//统一用餐2小时
const dinnerTime = 60*1000*60*2;
function eatDinnerPromise(peopleNum, deskNum) {
  return new Promise((resolve, reject) => {
    let start = moment();
    console.log(`我们是${peopleNum}人桌，桌子编号【${deskNum}】,【${start.format('HH:mm:ss')}】开始用餐，将会进行2小时。`);
    setTimeout(() => {
      let end = moment();
      let timeDiff = end.diff(start, 'minutes');
      console.log(`我们用餐结束【${end.format('HH:mm:ss')}】，桌子编号【${deskNum}】,用时：${timeDiff}分钟`);
      resolve();
    }, dinnerTime);
  });
}

class DinnerPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deskData: props.deskData||{},
      scheduler: null,
      isInit: false,
      isVisible_watch: false,
      isVisible_dinnerIn: false,
      isVisible_dinnerOut: false,
      watchDeskId: null
    };
  }

  componentWillUpdate() {
    let current = this.state.deskData;
    let storeDeskData = this.props.deskData;
    if (Object.keys(current).length === 0 || !isEqual(current, storeDeskData)) {
      this.setState({
        deskData: storeDeskData
      });
    }
  }

  initScheduler() {
    let { deskData } = this.state;
    let deskSettings = Object.values(deskData);
    deskSettings = deskSettings.map(item => {
      return {
        peopleNum: Number(item.peopleNum),
        maxExecutingNum: Number(item.deskNum)
      };
    });
    let scheduler = new Scheduler(deskSettings);
    this.setState({
      scheduler: scheduler,
      isInit: true
    });
  }

  watchSchedulerInfo() {
    let { scheduler } = this.state;
    let taskMapper = scheduler.getTaskMapper();

    Modal.info({
      title: '桌子使用信息',
      content: (
        <div>
          {
            Object.values(taskMapper).map(item => {
              return (<p>
                {item.peopleNum}人桌|共{item.maxTaskNum}张:<br />
                空闲桌子编号：{item.idList.join(',')}<br />
                现用餐桌子编号：{item.executingTasks.map(elem => elem.id).join(',')}
              </p>);
            })
          }
        </div>
      ),
      onOk() { },
    });
  }

  showModal(key) {
    this.setState({
      [key]: true
    });
  }

  handleOk() {
    let { watchDeskId, scheduler } = this.state;
    if (!watchDeskId) {
      return Modal.warning({
        title: '异常操作',
        content: '请输入桌子编号',
      });
    }
    let deskInfo = scheduler.show(watchDeskId);

    Modal.info({
      title: `【${watchDeskId}】用餐情况`,
      content: (
        <div>
          {
            (deskInfo && deskInfo.isExist) ? (
              <p>
                { deskInfo.executingIndex >= 0 ? '您的编号正在用餐' :
                  `您的${deskInfo.peopleNum}人桌编号为${watchDeskId},有${deskInfo.executingTaskNum}桌在用餐\n` +
                  `排在您前面的还有${deskInfo.preTaskNum}桌`
                }
              </p>
            ) : (
              <p>暂无此桌点餐信息</p>
            )
          }
        </div>
      ),
      onOk: function () {
        this.setState({ isVisible_watch: false });
      }.bind(this),
    });
  }

  handleCancel(key) {
    this.setState({ [key]: false });
  }
  handleChange(e) {
    let dom = e.target;
    this.setState({ watchDeskId: dom.value });
  }

  handleOK_dinnerIn() {
    let { addPeopleNum, scheduler, deskData } = this.state;
    if (!addPeopleNum) {
      return Modal.warning({
        title: '异常操作',
        content: '请输入用餐人数',
      });
    }
    if (!deskData['peopleNum_'+addPeopleNum]) {
      return Modal.warning({
        title: '输入异常',
        content: '无此人数的用餐桌子'
      });
    }

    let deskId = scheduler.add(eatDinnerPromise, addPeopleNum);

    Modal.info({
      title: '取号情况',
      content: '您的用餐桌子编号为：' + deskId,
      onOk: function() {
        this.setState({
          scheduler: scheduler,
          isVisible_dinnerIn: false
        });
      }.bind(this)
    });
  }
  handleChange_dinnerIn(e) {
    let dom = e.target;
    console.log("peopleNum:", dom.value);
    this.setState({ addPeopleNum: dom.value });
  }

  handleOK_dinnerOut() {
    let { deleteDeskId, scheduler } = this.state;
    if (!deleteDeskId) {
      Modal.warning({
        title: '异常操作',
        content: '请输入桌子编号',
      });
    }

    scheduler.remove(deleteDeskId);
    this.setState({
      scheduler: scheduler,
      isVisible_dinnerOut: false
    })
  }

  handleChange_dinnerOut(e) {
    let dom = e.target;
    this.setState({ deleteDeskId: dom.value });
  }


  render() {
    let { deskData, isInit, isVisible_watch, isVisible_dinnerIn, isVisible_dinnerOut, scheduler } = this.state;
    let taskMapper = {};
    if (isInit) {
      taskMapper = scheduler.getTaskMapper();
    }
    let dataArr = Object.values(deskData || {});

    return (
      <div id="DinnerPane" className="pane">
        <h2>DinnerPane</h2>
        <div className="pane-content">
          <div className="settingData">
            <h3>餐桌数据面板：</h3>
            <div className="area settingData-list">
              {dataArr.map((item) => {
                let taskObj = taskMapper['peopleNum_'+item.peopleNum];
                return (
                  <div className="settingData-item" key={'peopleNum_' + item.peopleNum}>
                    {item.peopleNum}人桌 | 数目:{item.deskNum}<br/>
                    {taskObj ? '用餐:'+ taskObj.executingTasks.length : ''}
                    {taskObj ? ' | 排队:'+ taskObj.tasks.length : ''}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="area operation-setting">
            <button
              className="ant-btn ant-btn-finish"
              style={{ 'backgroundColor': '#b4264b', 'borderColor': '#b4264b' }}
              onClick={this.initScheduler.bind(this)}
            >
              点餐初始化
          </button>
            {
              isInit ? (
                <React.Fragment>
                  <button
                    className="ant-btn ant-btn-finish"
                    style={{ 'backgroundColor': '#b4264b', 'borderColor': '#b4264b' }}
                    onClick={this.watchSchedulerInfo.bind(this)}
                  >
                    查看桌子使用信息
                </button>
                  <button
                    className="ant-btn ant-btn-finish"
                    style={{ 'backgroundColor': '#b4264b', 'borderColor': '#b4264b' }}
                    onClick={this.showModal.bind(this, 'isVisible_watch')}
                  >
                    查看某桌排队情况
                </button>
                  <Modal
                    visible={isVisible_watch}
                    title="查看某桌排队情况"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this, 'isVisible_watch')}
                    cancelText="取消"
                    okText="确定"
                  >
                    <p>桌子编号：</p>
                    <Input
                      placeholder="请输入桌子编号"
                      id="deskId"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Modal>
                </React.Fragment>
              ) : null
            }
          </div>
          {
            isInit ? (
              <div className="area operation-order">
                <DinnerInModalBtn
                  isVisible={isVisible_dinnerIn}
                  showModal={this.showModal.bind(this, 'isVisible_dinnerIn')}
                  handleOK={this.handleOK_dinnerIn.bind(this)}
                  handleCancel={this.handleCancel.bind(this, 'isVisible_dinnerIn')}
                  handleChange={this.handleChange_dinnerIn.bind(this)}
                />
                <DinnerOutModalBtn
                  isVisible={isVisible_dinnerOut}
                  showModal={this.showModal.bind(this, 'isVisible_dinnerOut')}
                  handleOK={this.handleOK_dinnerOut.bind(this)}
                  handleCancel={this.handleCancel.bind(this, 'isVisible_dinnerOut')}
                  handleChange={this.handleChange_dinnerOut.bind(this)}
                />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default DinnerPane;

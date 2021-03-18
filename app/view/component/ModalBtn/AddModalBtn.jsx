import React from "react";
import { Modal, Button, Input } from "antd";
import "antd/dist/antd.css";

class AddModalBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      peopleNum: 0,
      deskNum: 0
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk() {
    this.setState({ loading: true });
    let { peopleNum, deskNum } = this.state;

    if (!peopleNum || !deskNum) {
      return Modal.warning({
        title: '操作异常',
        content: '请输入正确信息'
      });
    }

    setTimeout(() => {
      if (this.props.parent.addDataToParent) {
        this.props.parent.addDataToParent(peopleNum, deskNum);
      }
      this.setState({ loading: false, visible: false });
    }, 500);
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleChange(e) {
    let dom = e.target;
    let field = dom.id;
    let isInRange = 1 <= Number(dom.value) && Number(dom.value) <= 25;
    if (field === 'peopleNum' && !isInRange) {
      dom.value = 1;
      return Modal.warning({
        title: '操作异常',
        content: '桌子使用人数的范围为1到25人'
      });
    }
    this.setState({ [field]: dom.value });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <React.Fragment>
        <Button type="primary" onClick={this.showModal}>
          {this.props.text || "添加"}
        </Button>
        <Modal
          visible={visible}
          title="添加配置数据"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <p>桌子使用人数：</p>
          <Input
            placeholder="请输入桌子使用人数"
            id="peopleNum"
            onChange={this.handleChange}
          />
          <p>桌子现存张数：</p>
          <Input
            placeholder="请输入桌子现存张数"
            id="deskNum"
            onChange={this.handleChange}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddModalBtn;

import React from "react";
import { Modal, Button, Input } from "antd";
import "antd/dist/antd.css";

class DinnerInModalBtn extends React.Component {
  render() {
    const { isVisible,showModal,handleOK,handleCancel,handleChange } = this.props;
    
    return (
      <React.Fragment>
        <Button type="primary" onClick={showModal}>
          {this.props.text || "用餐入座"}
        </Button>
        <Modal
          visible={isVisible}
          title="添加用餐信息"
          onOk={handleOK}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <p>桌子使用人数：</p>
          <Input
            placeholder="请输入桌子使用人数"
            id="peopleNum"
            onChange={handleChange}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default DinnerInModalBtn;

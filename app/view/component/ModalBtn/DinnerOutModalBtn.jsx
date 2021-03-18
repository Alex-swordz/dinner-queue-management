import React from "react";
import { Modal, Button, Input } from "antd";
import "antd/dist/antd.css";

class DinnerOutModalBtn extends React.Component {
  render() {
    const { isVisible,showModal,handleOK,handleCancel,handleChange } = this.props;
    return (
      <React.Fragment>
        <Button type="primary" onClick={showModal}>
          {this.props.text || "结束用餐"}
        </Button>
        <Modal
          visible={isVisible}
          title="移除用餐座位"
          onOk={handleOK}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <p>桌子编号：</p>
          <Input
            placeholder="请输入桌子编号"
            id="deskId"
            onChange={handleChange}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default DinnerOutModalBtn;

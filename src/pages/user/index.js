import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import { Option } from "antd/es/mentions";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import "./user.scss";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, { gender }) => (
        <>
          <div>{gender === 1 ? "male" : "female"}</div>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Notify",
      dataIndex: "isNotify",
      key: "isNotify",
      render: (_, { isNotify }) => (
        <>
          <Switch defaultChecked={!!isNotify} onChange={handleNotifyChange} />
        </>
      ),
    },
    {
      title: "NotifyTime",
      dataIndex: "notifyTime",
      key: "notifyTime",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleItemEdit(record)}> edit</a>
          <Popconfirm
            title="Delete the task"
            description={`Are you sure to delete 【${record.name}】 ?`}
            onConfirm={onDeleteConfirm}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "悟空",
      gender: "1",
      email: "160636@qq.com",
      isNotify: 1,
      notifyTime: "16:51:00",
    },
    {
      key: "2",
      name: "八戒",
      gender: "1",
      email: "16063655@qq.com",
      isNotify: 0,
      notifyTime: "16:52:00",
    },
    {
      key: "3",
      name: "蛛儿",
      gender: "2",
      email: "160636551@qq.com",
      isNotify: 1,
      notifyTime: "16:53:00",
    },
  ];
  const handleNotifyChange = (val) => {
    console.log("handleNotifyChange", val);
  };

  const handleItemEdit = (item) => {
    console.log("item", item);

    setCurrentEditItem(
      item.key
        ? item
        : {
            key: "empty",
            name: "",
            gender: "",
            email: "",
            isNotify: "",
            notifyTime: null,
          }
    );
    console.log("---");
  };
  useEffect(() => {
    console.log("currentEditItem====", currentEditItem);

    if (currentEditItem && currentEditItem.key) {
      console.log(
        'dayjs(currentEditItem.notifyTime, "HH:mm:ss").toDate()',
        dayjs(currentEditItem.notifyTime, "HH:mm:ss").toDate()
      );
      form.setFieldsValue({
        ...currentEditItem,
        notifyTime: currentEditItem.notifyTime
          ? dayjs(currentEditItem.notifyTime, "HH:mm:ss")
          : null,
      });
      setIsModalOpen(true);
    }
  }, [currentEditItem]);

  const onDeleteConfirm = () => {
    console.log("onDeleteConfirm");
  };
  const handleOk = () => {
    console.log(form.getFieldValue());
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <Button type="primary" className="add" onClick={() => handleItemEdit({})}>
        add
      </Button>
      <Table columns={columns} dataSource={data} />;
      <Modal
        title="User Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="user-form" {...layout} onFinish={handleOk}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={currentEditItem.name} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="gender"
              value={currentEditItem.gender}
              allowClear
            >
              <Select.Option value="1">male</Select.Option>
              <Select.Option value="2">female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={currentEditItem.email} />
          </Form.Item>

          <Form.Item
            name="isNotify"
            label="Notify"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch defaultChecked={!!currentEditItem.isNotify} />
          </Form.Item>
          <Form.Item
            name="notifyTime"
            label="NotifyTime"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default User;

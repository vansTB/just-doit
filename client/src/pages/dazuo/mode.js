import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import "./mode.scss";
import { http } from "@/utlis";

const Theme = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => (
        <>
          <Tag color={type == 1 ? "green" : type == 2 ? "blue" : "orange"}>
            {type == 1 ? "正计时" : type == 2 ? "倒计时" : "不计时"}
          </Tag>
        </>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (_, { time }) => (
        <>
          <div>{time ? time + "min" : "-"}</div>
        </>
      ),
    },
    {
      title: "CreateTime",
      dataIndex: "create_at",
      key: "create_at",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      width: 200,
      ellipsis: {
        showTitle: true,
      },
      render: (remark) =>
        remark.length > 15 ? (
          <Tooltip placement="topLeft" title={remark}>
            {remark}
          </Tooltip>
        ) : (
          remark
        ),
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
  // const data = [
  //   {
  //     key: "1",
  //     name: "番茄钟",
  //     type: 2,
  //     time: 25,
  //     create_at: "2025-01-15",
  //     remark:
  //       "倒计时25分钟，即为番茄钟，这是一个很热门的学习时段，符合人的精力规律",
  //   },
  //   {
  //     key: "3",
  //     name: "测试正计时2",
  //     type: 1,
  //     time: 30,
  //     create_at: "2025-01-15",
  //     remark: "这是个正计时",
  //   },
  //   {
  //     key: "2",
  //     name: "测试倒计时",
  //     type: 2,
  //     time: 40,
  //     create_at: "2025-01-15",
  //     remark: "",
  //   },
  // ];

  const handleItemEdit = (item) => {
    console.log("item", item);
    let params = item.id
      ? item
      : {
          key: "empty",
          name: "",
          type: "",
          time: "",
          remark: "",
        };
    form.setFieldsValue(params);
    setIsModalOpen(true);
  };
  // 获取数据，相当于created
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    http.get("/mode/list").then((res) => {
      setLoading(false);
      console.log("res.data", res.data);
      if (res.code == 200) {
        setData(res.data);
      }
    });
  };

  const onDeleteConfirm = () => {
    console.log("onDeleteConfirm");
  };
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (res) => {
        let params = form.getFieldValue();
        params.id = params.id === "empty" ? null : params.id;
        const result = await http.post("/mode/save", params);
        if (result.code == 200) {
          message.success(result.data.message);
          setIsModalOpen(false);
          getData();
        }
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <Button type="primary" className="add" onClick={() => handleItemEdit({})}>
        add
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
      ;
      <Modal
        title="Theme Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
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
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="type" allowClear>
              <Select.Option value={1}>正计时</Select.Option>
              <Select.Option value={2}>倒计时</Select.Option>
              <Select.Option value={3}>不计时</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="time" label="DuringTime">
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Theme;

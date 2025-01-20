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
} from "antd";
import { Option } from "antd/es/mentions";
import { timeFormat } from "@/utlis";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import "./user.scss";
import { http } from "@/utlis";

const Role = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});
  const [roleList, setRoleList] = useState([]);
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
      dataIndex: "username",
      key: "username",
    },
    {
      title: "RoleName",
      dataIndex: "role_name",
      key: "role_name",
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
      render: (_, record) => (
        <>
          <Switch
            disabled
            checked={!!record.isNotify}
            onChange={(val) => handleNotifyChange(val, record)}
          />
        </>
      ),
    },
    {
      title: "NotifyTime",
      dataIndex: "notifyTime",
      key: "notifyTime",
      render: (_, { notifyTime }) =>
        notifyTime ? timeFormat(notifyTime, "hh:mm:ss") : "-",
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
            onConfirm={() => onDeleteConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleNotifyChange = async (val, record) => {
    const params = {
      ...record,
      isNotify: val ? 1 : 0,
      notifyTime: "",
    };
    const result = await http.post("/user/save", params);
    if (result.code == 200) {
      message.success(result.data.message);
      getData();
    }
  };
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // 获取数据，相当于created
  useEffect(() => {
    setLoading(true);
    getData();
    http.get("/role/list").then((res) => {
      setRoleList(res.data);
    });
  }, []);

  const handleItemEdit = (item) => {
    console.log("item", item);

    setCurrentEditItem(
      item.id
        ? item
        : {
            id: "empty",
            role_id: "",
            username: "",
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

    if (currentEditItem && currentEditItem.id) {
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

  const getData = () => {
    http.get("/user/list").then((res) => {
      setLoading(false);
      if (res.code == 200) {
        setData(res.data);
      }
    });
  };

  const onDeleteConfirm = (id) => {
    http.post("/user/delete", { id }).then((res) => {
      if (res.code == 200) {
        message.success(res.data.message);
        getData();
      }
    });
  };
  const handleOk = async () => {
    console.log(form.getFieldValue());
    // setIsModalOpen(false);
    form
      .validateFields()
      .then(async (res) => {
        let params = form.getFieldValue();
        console.log(
          "role",
          roleList.find((i) => i.id == params.role_id)
        );
        params.isNotify = params.isNotify ? 1 : 0;
        params.notifyTime = params.isNotify ? params.notifyTime : "";
        params.id = params.id === "empty" ? null : params.id;
        params.role_name = roleList.find((i) => i.id == params.role_id)["name"];
        const result = await http.post("/user/save", params);
        if (result.code == 200) {
          message.success(result.data.message);
          setIsModalOpen(false);
          getData();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleCancel = () => {
    setCurrentEditItem({});
    setIsModalOpen(false);
  };

  const handleFormIsNotifyChange = (val) => {
    setCurrentEditItem({
      ...currentEditItem,
      isNotify: val,
    });
  };
  return (
    <Fragment>
      <Button type="primary" className="add" onClick={() => handleItemEdit({})}>
        add
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={isLoading}
      />
      <Modal
        title="Role Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} name="user-form" {...layout} onFinish={handleOk}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={currentEditItem.name} />
          </Form.Item>
          <Form.Item
            name="role_id"
            label="Role"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="role"
              value={currentEditItem.role_id}
              allowClear
            >
              {roleList.map((i) => {
                return (
                  <Select.Option key={i.id} value={i.id}>
                    {i.name}
                  </Select.Option>
                );
              })}
            </Select>
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
              <Select.Option key={1} value={1}>
                male
              </Select.Option>
              <Select.Option key={2} value={2}>
                female
              </Select.Option>
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
            <Switch
              checked={!!currentEditItem.isNotify}
              onChange={(e) => {
                handleFormIsNotifyChange(e);
              }}
            />
          </Form.Item>
          {currentEditItem.isNotify ? (
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
          ) : (
            ""
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Role;

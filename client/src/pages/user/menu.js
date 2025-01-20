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

import "./user.scss";
import { http } from "@/utlis";

const Menu = () => {
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
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => (
        <>
          <div>{type === 1 ? "模块" : type === 2 ? "菜单" : "权限"}</div>
        </>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "FileUrl",
      dataIndex: "page_url",
      key: "page_url",
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

  const [data, setData] = useState({
    tableList: [],
    moduleList: [],
  });
  const [isLoading, setLoading] = useState(false);
  // 获取数据，相当于created
  useEffect(() => {
    getData();
  }, []);

  const handleItemEdit = (item) => {
    console.log("item", item);

    let formInfo = item.id
      ? item
      : {
          id: "empty",
          type: "",
          page_url: "",
          path: "",
          icon: "",
          remark: "",
          label: "",
          parent_id: "",
        };
    console.log("formInfo", formInfo);
    form.setFieldsValue(formInfo);
    setIsModalOpen(true);
  };
  const getData = () => {
    setLoading(true);

    http.get("/menu/list").then((res) => {
      setLoading(false);
      console.log("res.data", res.data);
      if (res.code == 200) {
        let tmpArr1 = [];
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          if (item.type == 1) {
            tmpArr1.push(item);
            for (let j = i; j < data.length; j++) {
              let jtem = data[j];
              if (jtem.parent_id === item.id) {
                item.children = item.children || [];
                item.children.push(jtem);
              }
            }
          }
        }
        console.log("res.data", res.data);
        setData({
          tableList: res.data.filter((i) => !i.parent_id),
          moduleList: tmpArr1,
        });
      }
    });
  };

  const onDeleteConfirm = (id) => {
    http.post("/menu/delete", { id }).then((res) => {
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

        params.isNotify = params.isNotify ? 1 : 0;
        params.notifyTime = params.isNotify ? params.notifyTime : "";
        params.id = params.id === "empty" ? null : params.id;
        const result = await http.post("/menu/save", params);
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
        dataSource={data.tableList}
        rowKey={(record) => record.id}
        loading={isLoading}
      />
      <Modal
        title="Menu Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} name="menu-form" {...layout} onFinish={handleOk}>
          <Form.Item
            name="label"
            label="Label"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item name="page_url" label="PageUrl">
            <Input placeholder="请输入文件路径" />
          </Form.Item>
          <Form.Item name="path" label="Path">
            <Input placeholder="请输入访问路由" />
          </Form.Item>
          <Form.Item name="icon" label="Icon">
            <Input placeholder="请输入图标" />
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
              <Select.Option value={1}>模块</Select.Option>
              <Select.Option value={2}>菜单</Select.Option>
              <Select.Option value={3}>权限</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="parent_id" label="Parent">
            <Select placeholder="Parent" allowClear>
              {data.moduleList.map((i) => {
                return (
                  <Select.Option key={i.id} value={i.id}>
                    {i.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Menu;

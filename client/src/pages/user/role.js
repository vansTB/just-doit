import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Cascader,
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
import { handleMenuListToTree, timeFormat } from "@/utlis";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import "./user.scss";
import { http } from "@/utlis";

const Role = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOptions, setMenuOptions] = useState([]);
  const [form] = Form.useForm();
  const { SHOW_CHILD } = Cascader;
  let itemMenuSelecteds = [];
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
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <Switch
            disabled
            checked={!!record.status}
            onChange={(val) => handleNotifyChange(val, record)}
          />
        </>
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
    const result = await http.post("/role/save", params);
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
    http.get("/menu/list").then((res) => {
      const { tree } = handleMenuListToTree(res.data);
      setMenuOptions(tree);
    });
  }, []);

  const handleItemEdit = (item) => {
    console.log("item", item);

    const params = item.id
      ? item
      : {
          id: "empty",
          name: "",
          status: true,
          menuIds: [],
        };

    form.setFieldsValue(params);
    setIsModalOpen(true);
    console.log("---");
  };

  const getData = () => {
    http.get("/role/list").then((res) => {
      setLoading(false);
      if (res.code == 200) {
        res.data.forEach((i) => {
          let menuIds = [],
            menuNames = [];
          if (i.menus.length) {
            i.menuTree = handleMenuListToTree(i.menus).tree;
            i.menuTree.forEach((m) => {
              let tmpMenuIds = [[m.id]];
              menuNames.push(m.label);
              if (m.children) {
                tmpMenuIds = [];
                m.children.map((c) => {
                  menuNames.push(c.label);
                  tmpMenuIds.push([m.id, c.id]);
                  return c.id;
                });
                console.log("menuIds", menuIds);
              }
              menuIds = menuIds.concat(tmpMenuIds);
            });
            i.menuIds = menuIds;
            i.menuNames = menuNames;
          }
        });
        console.log("---res.data", res.data);
        setData(res.data);
      }
    });
  };

  const onDeleteConfirm = (id) => {
    http.post("/role/delete", { id }).then((res) => {
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
        console.log(res);
        let params = form.getFieldValue();
        params.id = params.id === "empty" ? null : params.id;
        params.menuIds = params.menuIds.length
          ? [...new Set(params.menuIds.flat())]
          : [];
        params.status = params.status ? 1 : 0;
        const result = await http.post("/role/save", params);
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

  const handleMenuChange = (val, all) => {
    itemMenuSelecteds = all;
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
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} name="user-form" {...layout} onFinish={handleOk}>
          <Form.Item
            name="name"
            label="RoleName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="menuIds"
            label="Menu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Cascader
              style={{
                width: "100%",
              }}
              options={menuOptions}
              showCheckedStrategy={SHOW_CHILD}
              onChange={handleMenuChange}
              fieldNames={{
                label: "label",
                value: "id",
                children: "children",
              }}
              multiple
              maxTagCount="responsive"
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Role;

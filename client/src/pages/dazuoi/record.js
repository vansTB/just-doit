import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Watermark,
} from "antd";

import "./record.scss";
import dayjs from "dayjs";

const Record = () => {
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

  const [themeData, setThemeData] = useState([
    {
      key: "1",
      name: "番茄钟",
      type: 2,
      duringTime: 25,
      create_at: "2025-01-15",
      remark:
        "倒计时25分钟，即为番茄钟，这是一个很热门的学习时段，符合人的精力规律",
    },
    {
      key: "3",
      name: "测试正计时2",
      type: 1,
      duringTime: 30,
      create_at: "2025-01-15",
      remark: "这是个正计时",
    },
    {
      key: "2",
      name: "测试倒计时",
      type: 2,
      duringTime: 40,
      create_at: "2025-01-15",
      remark: "",
    },
  ]);
  const [recordData, setRecordData] = useState([]);

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
          <Tag color={type == 1 ? "green" : "blue"}>
            {type == 1 ? "正计时" : "倒计时"}
          </Tag>
        </>
      ),
    },
    {
      title: "Time",
      dataIndex: "duringTime",
      key: "duringTime",
      render: (_, { duringTime }) => (
        <>
          <div>{duringTime + "min"}</div>
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleItemEdit(record)}> play</a>
        </Space>
      ),
    },
  ];

  const handleItemEdit = (item) => {
    console.log("item", item);

    setCurrentEditItem(
      item.key
        ? item
        : {
            key: "empty",
            name: "",
            type: "",
            duringTime: "",
            remark: "",
          }
    );
  };
  useEffect(() => {
    if (currentEditItem && currentEditItem.key) {
      form.setFieldsValue(currentEditItem);
      setIsModalOpen(true);
    }
  }, [currentEditItem]);

  const onDeleteConfirm = () => {
    console.log("onDeleteConfirm");
  };
  const handleOk = async () => {
    form
      .validateFields()
      .then((res) => {
        console.log("res", res);
        console.log(form.getFieldValue());
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [playInfo, setPlayInfo] = useState({
    duringTime: 3600,
  });
  const handleBtnClick = (module) => {
    console.log("module");
    if (module === "back") {
      setPlayInfo({
        ...playInfo,
        module,
        isPlay: false,
        modalOpen: false,
      });
      clearInterval(duringTimeInterval.current);
      duringTimeInterval.current = null;
    } else if (module === "full-screen") {
      setPlayInfo({
        ...playInfo,
        module,
        isPlay: true,
        modalOpen: false,
        fullScreen: !playInfo.fullScreen,
      });
    } else {
      setPlayInfo({
        ...playInfo,
        module,
        modalOpen: true,
      });
    }
  };
  const handleBtnConfirm = () => {
    setPlayInfo({
      ...playInfo,
      modalOpen: false,
      isPlay: true,
    });
    handleDuringTimePlay();
  };

  function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;

    return (hours > 0 ? hours + "时" : "") + minutes + "分" + secs + "秒";
  }
  let duringTimeInterval = useRef(null);
  const handleDuringTimePlay = () => {
    console.log("-------------");
    if (duringTimeInterval.current) return;
    duringTimeInterval.current = setInterval(() => {
      setPlayInfo((playInfo) => {
        console.log("playInfo", playInfo);
        let duringTime = --playInfo.duringTime;
        console.log("duringTime", duringTime);
        let duringTimeStr = formatTime(duringTime);
        return {
          ...playInfo,
          modalOpen: false,
          isPlay: true,
          duringTime,
          duringTimeStr,
        };
      });
    }, 1000);
  };

  const handleBtnCancel = () => {
    setPlayInfo({
      ...playInfo,
      modalOpen: false,
      isPlay: false,
    });
  };
  return (
    <div
      className={`record-page-container ${playInfo.isPlay ? "ing" : ""} ${
        playInfo.fullScreen ? "full-screen" : ""
      } `}
    >
      <div className="btn-list">
        {!playInfo.isPlay ? (
          <Fragment>
            <div onClick={() => handleBtnClick("infinite")} className="btn">
              无极模式
            </div>
            <div onClick={() => handleBtnClick("tomato")} className="btn">
              番茄模式
            </div>
            <div onClick={() => handleBtnClick("other")} className="btn">
              其他模式
            </div>
            <div onClick={() => handleBtnClick("record")} className="btn">
              修行记录
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="duringTime-box">{playInfo.duringTimeStr}</div>
            <div onClick={() => handleBtnClick("back")} className="btn">
              返回
            </div>
            <div onClick={() => handleBtnClick("full-screen")} className="btn">
              {!playInfo.fullScreen ? "全屏模式" : "正常模式"}
            </div>
          </Fragment>
        )}
      </div>

      <Modal
        title="确定开始了嘛？"
        open={playInfo.modalOpen}
        onOk={handleBtnConfirm}
        onCancel={handleBtnCancel}
      ></Modal>
    </div>
  );
};
export default Record;

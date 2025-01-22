import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
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
  Watermark,
} from "antd";

import "./record.scss";
import { http } from "@/utlis";

const Record = () => {
  let duringTimeInterval = useRef(null);

  const handleStop = (type) => {
    if (type === "end") {
      setPlayInfo({
        ...playInfo,
        stopModalOpen: true,
      });
    } else {
      setPlayInfo({
        ...playInfo,
        isPause: true,
        modalOpen: false,
      });
      clearInterval(duringTimeInterval.current);
    }
  };

  const [playInfo, setPlayInfo] = useState({
    isPlay: false,
    isPause: false,
    modeId: "",
    targetTime: 3600,
    duringTime: "",
    modalOpen: false,
    stopModalOpen: false,
    runningTime: "", // 倒计时运行时间
  });
  const handleBtnClick = (mode) => {
    console.log("mode");
    if (mode === "full-screen") {
      setPlayInfo({
        ...playInfo,
        mode,
        isPlay: true,
        modalOpen: false,
        fullScreen: !playInfo.fullScreen,
      });
    } else {
      setPlayInfo({
        ...playInfo,
        mode,
        modalOpen: true,
      });
    }
  };
  const handleBtnConfirm = () => {
    if (playInfo.mode == 1) {
      playInfo.duringTime = 0;
    }

    if (playInfo.mode == 2) {
      playInfo.runningTime = playInfo.targetTime;
    }
    setPlayInfo({
      ...playInfo,
      modalOpen: false,
    });
    handleDuringTimePlay();
  };

  function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;

    return (hours > 0 ? hours + "时" : "") + minutes + "分" + secs + "秒";
  }
  const handleDuringTimePlay = () => {
    if (duringTimeInterval.current && !playInfo.isPause) return;
    if (playInfo.mode == "1") {
      duringTimeInterval.current = setInterval(() => {
        setPlayInfo((playInfo) => {
          let duringTime = ++playInfo.duringTime;
          let duringTimeStr = formatTime(duringTime);
          return {
            ...playInfo,
            isPause: false,
            modalOpen: false,
            isPlay: true,
            duringTime,
            duringTimeStr,
          };
        });
      }, 1000);
    } else if (playInfo.mode == "2") {
      duringTimeInterval.current = setInterval(() => {
        setPlayInfo((playInfo) => {
          let runningTime = --playInfo.runningTime;
          let duringTimeStr = formatTime(runningTime);
          return {
            ...playInfo,
            modalOpen: false,
            isPause: false,
            isPlay: true,
            duringTime: ++playInfo.duringTime,
            duringTimeStr,
          };
        });
      }, 1000);
    }
  };

  const handleBtnCancel = () => {
    setPlayInfo({
      ...playInfo,
      modalOpen: false,
      stopModalOpen: false,
      isPlay: false,
    });
  };

  const handleStopConfirm = async () => {
    let params = {};
    if (playInfo.mode == 1) {
      // 无极模式
      params.modeId = 1;
      params.status = 1;
      params.duringTime = playInfo.duringTime;
    } else {
      // 番茄模式
      params.modeId = 2;
      params.status = 0;
      params.duringTime = playInfo.duringTime;
      // 倒计时运行完毕
      if (playInfo.runningTime == 0) {
        params.status = 1;
      }
    }
    const result = await http.post("/record/save", params);
    if (result.code == 200) {
      if (result.status == 1) {
        message.success("恭喜你，完成了~~");
      } else {
        message.success("加油，聚少成多~~");
      }
      clearInterval(duringTimeInterval.current);
      duringTimeInterval.current = null;
      setPlayInfo({
        ...playInfo,
        isPlay: false,
        stopModalOpen: false,
      });
    }
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
            <div onClick={() => handleBtnClick("1")} className="btn">
              无极模式
            </div>
            <div onClick={() => handleBtnClick("2")} className="btn">
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
            {!playInfo.isPause ? (
              <div onClick={() => handleStop("pause")} className="btn">
                暂停
              </div>
            ) : (
              <div onClick={handleDuringTimePlay} className="btn">
                继续
              </div>
            )}

            <div onClick={() => handleStop("end")} className="btn">
              终止
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

      <Modal
        title="确定终止了嘛？"
        open={playInfo.stopModalOpen}
        onOk={handleStopConfirm}
        onCancel={handleBtnCancel}
      ></Modal>
    </div>
  );
};
export default Record;

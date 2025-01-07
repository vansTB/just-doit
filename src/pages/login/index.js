import { Input, Form, Button, message } from "antd";
import "./index.scss";
import { Router, useNavigate } from "react-router-dom";
import { userStore } from "@/store/user";
export default function Login() {
  const navigate = useNavigate();
  const store = userStore();

  const onFinish = async (form) => {
    console.log("onfinish", form);
    if (form.username === "admin" && form.password === "123456") {
      store.setAccessToken("tmpToken");
      store.setUserInfo({
        username: "wukong",
        phone: 18502063115,
      });
      message.success("登录成功");
      navigate("/");
    } else {
      message.error("登录失败");
    }
  };
  const onFinishFailed = () => {
    console.log("handleSubmit-error");
  };

  return (
    <div className="page-container">
      <Form
        className="login-box"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onBlur"
      >
        <div className="title">恭迎天命人~~</div>
        <Form.Item
          name="username"
          label={null}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            // {
            //   pattern: "/[a-z]${1-10}/g",
            //   message: "Please input a-z!",
            // },
          ]}
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item
          name="password"
          label={null}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit{" "}
          </Button>{" "}
        </Form.Item>{" "}
      </Form>{" "}
    </div>
  );
}

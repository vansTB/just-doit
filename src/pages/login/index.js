import { Input, Form, Button } from "antd";
import "./index.scss";
export default function Login() {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <div className="page-container">
      <Form
        className="login-box"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          label={null}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
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

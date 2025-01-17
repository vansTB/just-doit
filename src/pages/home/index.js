import { http } from "@/utlis";
import { Button, message } from "antd";

const handleBtnClick = async () => {
  const res = await http.get("/record/handleRecord");
  // message.success(res.message);
  console.log("res", res);
};

export default function Home() {
  return <Button onClick={handleBtnClick}>handle</Button>;
}

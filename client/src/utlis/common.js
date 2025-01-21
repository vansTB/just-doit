import { createFromIconfontCN } from "@ant-design/icons";

export function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var secs = seconds % 60;

  return (hours > 0 ? hours + "时" : "") + minutes + "分" + secs + "秒";
}

export function timeFormat(originVal, fmt) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  if (fmt === "yyyy-MM-dd") {
    return `${y}-${m}-${d}`;
  }

  if (fmt === "hh:mm:ss") {
    return `${hh}:${mm}:${ss}`;
  }

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4815467_9fmf40kgjwj.js",
});

export function handleMenuListToTree(data) {
  data = JSON.parse(JSON.stringify(data));
  let tmpArr1 = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.icon) {
      // item.iconStr = item.icon;
      item.icon = <IconFont type={item.icon} />;
    }
    item.key = item.path || item.id;
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
  return {
    tree: data.filter((i) => !i.parent_id),
    moduleList: tmpArr1,
  };
}

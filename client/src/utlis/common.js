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

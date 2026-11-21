// 扫描全能王 · Cookie 获取（Luna 极简版，Surge 专用）
// 职责单一：App 打开时从 get_user_attribute 请求里抓 token / cs_ept_d / client_id，
// 存入 Surge 共享存储 camscanner_data，交给「每日签到」模块读取使用。
// 第一行就写日志，触发与否在脚本日志里一目了然。
console.log("[CamScanner Cookie] 已触发");
try {
  const url = ($request && $request.url) || "";
  function q(name) {
    const m = url.match(new RegExp("[?&]" + name + "=([^&]+)"));
    return m ? m[1] : "";
  }
  let token = "";
  const headers = ($request && $request.headers) || {};
  for (const k in headers) {
    if (k.toLowerCase() === "x-is-token") { token = headers[k]; break; }
  }
  if (!token) token = q("token");
  const data = { token: token, cs_ept_d: q("cs_ept_d"), client_id: q("client_id") };
  console.log("[CamScanner Cookie] token=" + (token ? "有" : "无") + " cs_ept_d=" + (data.cs_ept_d ? "有" : "无") + " client_id=" + (data.client_id || "无"));
  if (token) {
    const old = $persistentStore.read("camscanner_data");
    const val = JSON.stringify(data);
    if (old !== val) {
      $persistentStore.write(val, "camscanner_data");
      $notification.post("扫描全能王", "", "✅ Cookie 获取成功");
    } else {
      console.log("[CamScanner Cookie] 与已存一致，跳过通知");
    }
  } else {
    $notification.post("扫描全能王", "", "⚠️ 已触发，但这次请求里没拿到 token");
  }
} catch (e) {
  console.log("[CamScanner Cookie] 出错: " + e);
}
$done({});

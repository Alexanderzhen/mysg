// 扫描全能王 · Cookie 状态（手动查看，Surge 专用）
// 在模块面板点刷新按钮时运行：读共享存储 camscanner_data，汇报抓没抓到、完不完整。
// 注意：抓取动作只能由打开 App 时的请求触发，本脚本只查状态，不抓取。
const raw = $persistentStore.read("camscanner_data");
if (!raw) {
  $notification.post("扫描全能王", "❌ 还没有 Cookie", "请打开扫描全能王 App，进「我的」停留几秒，再回来点刷新查看");
} else {
  let d = {};
  try { d = JSON.parse(raw); } catch (e) {}
  const t = d.token ? String(d.token).slice(0, 8) + "…" : "无";
  const e2 = d.cs_ept_d ? "有" : "无";
  const c = d.client_id || "无";
  const ok = !!(d.token && d.cs_ept_d && d.client_id);
  $notification.post(
    "扫描全能王",
    ok ? "✅ Cookie 完整" : "⚠️ Cookie 还不完整",
    "token=" + t + "，cs_ept_d=" + e2 + "，client_id=" + c + (ok ? "" : "；打开 App 多停留几秒会自动补全")
  );
  console.log("[CamScanner Cookie状态] token=" + t + " cs_ept_d=" + e2 + " client_id=" + c);
}
$done({});

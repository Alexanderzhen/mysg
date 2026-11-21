// WPS · Cookie 状态（手动查看，Surge 专用）
// 在模块面板点刷新按钮时运行：读共享存储 wps_sid，汇报抓没抓到。
// 抓取动作只能由打开 WPS App 进活动页时的请求触发，本脚本只查状态。
const sid = $persistentStore.read("wps_sid");
if (!sid) {
  $notification.post("WPS", "❌ 还没有 Cookie", "请打开 WPS App，进任务中心或福利中心停留几秒，再回来点刷新查看");
} else {
  const masked = sid.length >= 12 ? sid.slice(0, 6) + "***" + sid.slice(-4) : "已获取";
  $notification.post("WPS", "✅ 已抓到 wps_sid", masked + "（长效登录态，抓一次长期可用，退登/改密才需重抓）");
  console.log("[WPS Cookie状态] wps_sid=" + masked);
}
$done({});

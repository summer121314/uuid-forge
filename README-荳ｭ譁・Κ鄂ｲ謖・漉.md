# UUID Forge：英文出海工具站（练习版）

这是一个可直接部署到 Vercel 的静态网站：**不需要付费 API，不需要安装 Node.js，零数据库**。

## 已实现功能
- 安全生成 UUID v4：单次 1–1,000 个。
- 自定义大小写、是否带连接符。
- 单个复制、全部复制、下载 TXT。
- UUID 格式校验。
- 手机 / 电脑适配，英文介绍及 FAQ。
- 页面 title/description、robots.txt、sitemap.xml 模板。

## 1. 电脑上体验
解压 ZIP，双击 `index.html`。部分浏览器在本地 `file://` 方式下禁止安全随机数功能，若遇到错误，可使用 VS Code Live Server，或先部署到 Vercel 后用 HTTPS 访问。

## 2. 上传到 GitHub
1. 登录 https://github.com 并新建公开或私有仓库 `uuid-forge`。
2. 在新仓库页面点击 **Add file → Upload files**。
3. 将 ZIP 内所有文件（不是 ZIP 文件本身）上传到仓库根目录。
4. 点击 **Commit changes**。

## 3. Vercel 部署
1. 登录 https://vercel.com ，可使用 GitHub 账号。
2. 点 **Add New → Project → Import Git Repository**，选择 `uuid-forge`。
3. Framework Preset 选 **Other**（如果检测到静态站点可使用默认项）；无需 Build Command、无需环境变量。
4. 点击 Deploy，完成后获得形如 `xxx.vercel.app` 的预览网址。
5. 实际打开站点，测试 Generate、Copy、Download、Validator 和移动端显示。

## 4. 购买并绑定域名
1. 先确认关键词值得做，再考虑买域名，不必一开始就付费。
2. 在 Vercel Project → Settings → Domains 添加自己的域名。
3. 按照 Vercel **当前给出的 DNS 记录**，到域名商控制台添加 A / CNAME 记录。不要硬套过时的固定 IP。
4. 等待 DNS 和 HTTPS 生效，用自己的域名打开网站。

## 5. 正式发布前更新 SEO 文件
- 将 `sitemap.xml` 中 `https://YOUR-DOMAIN.com/` 改为实际的规范网址，如 `https://example.com/`。
- `robots.txt` 增加：`Sitemap: https://example.com/sitemap.xml`。
- 可选：`index.html` 的 `<head>` 增加 canonical 标签：`<link rel="canonical" href="https://example.com/">`。
- 重新提交 GitHub，Vercel 会自动部署更新。

## 6. Google Search Console (GSC)
1. 打开 https://search.google.com/search-console/ 。
2. 添加 **Domain property**（推荐）；复制 Google 给的 DNS TXT 验证记录，添加到域名商的 DNS 记录中，验证所有权。
3. 在 Sitemaps 提交 `https://example.com/sitemap.xml`。
4. Bing Webmaster Tools：https://www.bing.com/webmasters/ 。
5. 提交和验证 ≠ 保证收录、排名或收入。自然搜索流量通常需要持续迭代。

## 7. 变现之前必须明白
- 本项目的目标是跑通从“功能可用 → 部署 → 域名 → GSC → sitemap”的流程。
- **UUID Generator 是示例，并不是已验证的低竞争关键词。** 它的竞争可能很激烈。
- 目前没有广告代码、统计跟踪、付费收款功能，也没有实际 SEO 数据。
- 建议从 Google Trends、关键词工具、竞品页面中验证搜索意图、竞争程度及商业价值，再选择正式赚钱项目。
- 不要直接依靠“KD 低 / CPC 高”一个指标决定方向。广告收入、联盟佣金、付费意愿都需要单独评估。

## 技术实现
HTML + CSS + Vanilla JavaScript；Web Crypto API 用于安全随机数。无后台、无 cookies、无依赖、无账号。

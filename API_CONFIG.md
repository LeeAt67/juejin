# AI API 配置指南

## 概述
本游戏使用豆包AI服务，您需要配置API密钥来获得真实的AI对话体验。

## 豆包AI配置

豆包AI是字节跳动推出的AI对话服务。

**配置步骤：**
1. 访问 [豆包AI开放平台](https://console.volcengine.com/ark)
2. 注册账号并获取API密钥
3. 在 `script.js` 中找到 `AI_CONFIG` 配置
4. 替换 `apiKey` 和 `model` 字段

```javascript
const AI_CONFIG = {
    apiKey: '25fe9205-b5d3-4747-8df4-dcdfc8528f32', // 替换为您的API密钥
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    model: 'doubao-1-5-pro-32k-250115' // 替换为您的模型ID
};
```

## 使用说明

### 默认行为
- 如果API密钥已配置，优先使用豆包AI回答
- 如果API调用失败，会自动切换到本地逻辑
- 本地逻辑提供简单的"是/否"回答

### 提示词自定义
可以在 `buildPrompt` 方法中修改AI的角色设定和回答风格：

```javascript
buildPrompt(question) {
    return `你是豆包小助手，正在帮助玩家调查一起谋杀案...`;
}
```

## 安全注意事项

⚠️ **重要提醒：**
- 不要将API密钥提交到公共代码仓库
- 考虑使用环境变量存储密钥
- 定期轮换API密钥
- 监控API使用量避免超额费用

## 故障排除

### 常见问题
1. **API调用失败**
   - 检查API密钥是否正确
   - 确认网络连接正常
   - 查看浏览器控制台错误信息

2. **回答不理想**
   - 调整 `buildPrompt` 方法中的提示词
   - 修改API参数（temperature、max_tokens等）

3. **CORS错误**
   - 某些API可能需要服务器端代理
   - 考虑使用本地服务器或部署到支持CORS的平台

## 技术支持
如有问题，请查看：
- [豆包AI官方文档](https://console.volcengine.com/ark)
- 浏览器开发者工具的Network和Console面板
- 本项目的issue页面 
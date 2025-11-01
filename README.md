# Vue 3 + TypeScript + Vite
## 项目启动
* npm install
* npm run dev
## 记录点
* 注意：很重要的一个点，要想api接口调用，发布智能体的时候一定要勾选API的选项
* 申请对话接口https://api.coze.cn/v3/chat  (接口文档：https://www.coze.cn/open/docs/developer_guides/chat_v3)。最核心的就是传下面两个参数
  * 'Authorization': 'Bearer pat_xxxxxxxx', // token（智能体的凭证，会有有效期的，目前是30天有效期）
  * bot_id: '7567750597747720232', // 智能体id(这个智能体的链接 https://www.coze.cn/space/7369827218602278948/bot/7567750597747720232)


This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

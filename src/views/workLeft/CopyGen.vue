<template>
    <div class="copy-generation">
        <div class="copy-generation-t">
            文案生成
        </div>
        <div class="copy-generation-b">
            <div class="copy-generation-b-l">
                <div class="copy-generation-b-l-header">
                    <div class="title">内容主题</div>
                    <!-- 输入框 -->
                    <div class="input-content">
                        <div class="input-content-t">
                            <el-input
                                v-model="textarea"
                                style="width: 240px"
                                :rows="2"
                                resize='none'
                                type="textarea"
                                placeholder="请输入您要写的内容主题"
                            />
                        </div>
                        <div class="input-content-b">
                            <div class="recommend">推荐:</div>
                            <ul>
                                <li
                                    v-for="item in recommendData"
                                    :key="item.id"
                                    @click="changeUserInput(item)"
                                >{{item.label}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="copy-generation-b-l-footer">
                    <div class="start" @click="startCreate">开始创作</div>
                    <div class='delete' >清空内容</div>
                </div>
            </div>
            <div class="copy-generation-b-r">
                <div class="copy-generation-b-title">
                    <!-- 文案生成提示-->
                    <div class="loading-container">
                        <span :class="startAi?'titleActive':''">{{copyTitle}}</span>
                        <div class="title-loading" v-loading="loading"></div>
                    </div>
                </div>
                <div class="copy-content">
                    <!-- 容器 -->
                    <el-input
                        v-model="textContent"
                        style="width: 240px"
                        :rows="2"
                        resize='none'
                        type="textarea"
                        ref="textareaRef"
                        element-loading-text="Loading..."
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ElInput, ElMessage} from 'element-plus'
import {ref} from 'vue'

const textarea = ref<string>('')

// 系统回复的内容
const textContent = ref<string>('')
const textareaRef = ref<InstanceType<typeof ElInput>>()
let loading = ref<boolean>(false)

interface RecommendData {
    id: number,
    label: string,
    content: string
}

let recommendData = ref<RecommendData[]>([
    {
        id: 0,
        label: '美食攻略',
        content: '西安美食攻略'
    },
    {
        id: 1,
        label: '旅游攻略',
        content: '西安旅游攻略'
    },
    {
        id: 2,
        label: '宠物饲养',
        content: '宠物饲养攻略'
    },
])

const changeUserInput = (item: RecommendData) => {
    textarea.value = item.content
}

// 是否开始流失输出
let startFlow = ref<boolean>(false)
// 是否开始创作
let startAi = ref<boolean>(false)
// 文案创作提示
let copyTitle = ref<string>('文案生成中，请稍等...')
// 点击开始创作
const startCreate = async () => {
    // 如果正在生成，否则返回
    if(startFlow.value) {
        ElMessage({
            message: '请等待处理完成',
            type: 'warning'
        })
        return
    }
    // 如果存在内容则清空
    if (textContent.value) {
        textContent.value = ''
    }
    // 开始创作
    startAi.value = true
    // 显示加载
    loading.value = true

    // 申请对话
    let res = await fetch('https://api.coze.cn/v3/chat', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer pat_B4XFTGWfXgHCtEpPGBRtpyIkiH1Hgq19hvASThva524fFQUUKs5b8LGy5e6qTUfh', // token（智能体的凭证，会有有效期的，目前是30天有效期）
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bot_id: '7567750597747720232', // 智能体id(这个智能体的链接 https://www.coze.cn/space/7369827218602278948/bot/7567750597747720232)
            user_id: '123123999',
            stream: true,
            additional_messages: [
                {
                    role: 'user',
                    type: 'question',
                    content_type: 'text',
                    content: `${textarea.value}`
                }
            ]
        })
    })
    if (res.status === 200) { // 流式输出
        startFlow.value = true
        // 创建reader对象
        let reader = res.body.getReader()
        // 创建decoder对象
        let decoder = new TextDecoder('utf-8')
        // 存储未完成的行片段
        let partialData = '';
        if (!reader) return;
        while (true) {
            // 获取流式数据
            let {done, value} = await reader.read()
            if (done) {
                startAi.value = false;
                // 提示加载完成
                ElMessage({
                    message: '文案生成成功',
                    type: 'success'
                })

                loading.value = false
                // 文案生成完成
                startFlow.value = false
                break
            }
            // 文案生成中
            startFlow.value = true
            // 转化流式数据
            let chunk = decoder.decode(value, {stream: true})
            partialData += chunk
            // 处理可能的多个事件（按换行分割）
            const lines = partialData.split('\n');
            partialData = lines.pop() || ''; // 保留未完成的行
            // 查找是否是完整的数据
            let index = lines.findIndex((item) =>{
                // 找到event:coversation.message.completed
                return item == 'event:coversation.message.completed'
            })
            // 判断返回的是否是整体，因为流式输出完成后，它会返回一个整体内容
            // 如果是-1，则不是完整数据，是流式数据的部分
            if (index == -1) {
                for(const line of lines) {
                    // 如果以data: 开头
                    if (line.startsWith('data:')) {
                        const jsonData = line.replace('data:', '').trim();
                        try {
                            const parsed = JSON.parse(jsonData);
                            if (parsed.content) {
                                // 替换{}中的内容
                                let content = parsed.content.replace(/{.*}/g,'').replace(/#|\*/g,'')
                                textContent.value += content
                                // 随着加载滚动
                                // scrollBottom()
                            }
                        } catch (e) {
                            console.error('解析JSON数据时出错:', e)
                        }
                    }
                }
            }
        }

    } else {
        ElMessage({
            message: '申请对话失败，请重试',
            type: 'warning'
        })
    }
}


</script>

<style scoped lang="scss">
.copy-generation{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .copy-generation-t{
        width: 100%;
        height: 62px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background: #333333;
        border-radius: 8px;
        border: 1px solid #7B7B94;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
    }
    .copy-generation-b{
        flex:1;
        margin-top: 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .copy-generation-b-l{
            width: 49.5%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            background: #333333;
            border-radius: 8px;
            border: 1px solid #7B7B94;
            .copy-generation-b-l-header{
                .title{
                    font-weight: 400;
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-bottom: 10px;
                }
                .input-content{
                    width: 100%;
                    height: 250px;
                    padding: 6px 12px 12px 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box;
                    background: #333333;
                    border-radius: 8px;
                    border: 1px solid #565656;
                    .input-content-t{
                        width: 100%;
                        height: 100%;
                    }
                    .input-content-b{
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        .recommend{
                            font-weight: 400;
                            font-size: 14px;
                            color: #FFFFFF;
                        }
                        ul{
                            display: flex;
                            align-items: center;
                            li{
                                width: 80px;
                                height: 32px;
                                margin-left: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: #5b5b5b;
                                border-radius: 6px;
                                font-weight: 400;
                                font-size: 14px;
                                color: #FFFFFF;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .copy-generation-b-l-footer{
                display: flex;
                align-items: center;
                justify-content: center;
                .start{
                    width: 270px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #48FFF1;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #355E5B;
                    cursor: pointer;
                }
                .delete{
                    width: 270px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 12px;
                    background: #5b5b5b;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #FFFFFF;
                    cursor: pointer;
                }
            }
        }
        .copy-generation-b-r{
            width: 49.5%;
            height: 100%;
            padding: 0 20px 20px 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: #333333;
            border-radius: 8px;
            border: 1px solid #7B7B94;
            .copy-generation-b-title{
                padding: 20px 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .loading-container{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span{
                        margin-right: 10px;
                        font-weight: 400;
                        font-size: 16px;
                        color: #48FFF1;
                        visibility: hidden;
                    }
                    div{
                        width: 30px;
                        height: 30px;
                    }
                }
                .titleActive{
                    visibility: visible !important;
                }
                .copy-title{
                    margin:0;
                    font-weight: 400;
                    font-size: 16px;
                    color: #48FFF1;
                    cursor: pointer;
                }
            }
            .copy-content{
                flex: 1;
                width: 100%;
            }
        }
    }
}
/*文本域 */
:deep(.el-textarea){
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    .el-textarea__inner{
        height: 100% !important;
        padding: 0 !important;
        background: transparent !important;
        box-shadow:none !important;
        font-weight: 400;
        font-size: 14px;
        color: #FFFFFF;
    }
    /* 隐藏 el-input 文本域的滚动条 */
    .el-textarea__inner {
        scrollbar-width: none; 
        -ms-overflow-style: none;
    }
    .el-textarea__inner::-webkit-scrollbar {
        display: none; 
    }
}
/*加载 */
:deep(.el-loading-mask){
    background-color:transparent !important;
    display: flex !important;
    align-items: center !important;
    .el-loading-spinner{
        display: flex !important;
        align-items: center !important;
        width:30px !important;
        height:30px !important;
        margin-top: 0 !important;;
        top:0 !important;;
        .circular{
            width:30px !important;
            height:30px !important;
        }
    }
}

</style>
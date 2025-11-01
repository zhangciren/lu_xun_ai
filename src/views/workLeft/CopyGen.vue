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
                    <div class="start" >开始创作</div>
                    <div class='delete' >清空内容</div>
                </div>
            </div>
            <div class="copy-generation-b-r">
                <div class="copy-generation-b-title">
                    <!-- 文案生成提示-->
                    <div class="loading-container">
                        <!-- <span :class="startAi?'titleActive':''">copyTitle</span> -->
                        <!-- <div class="title-loading" v-loading="loading"></div> -->
                    </div>
                </div>
                <div class="copy-content">
                    <!-- 容器 -->
                    <el-input
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
import {ref} from 'vue'

const textarea = ref<string>('')

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
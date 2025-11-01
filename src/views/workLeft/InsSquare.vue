<template>
    <div class="insSquare-container" ref="insSquareRef">
        <el-scrollbar height="Scrollheight">
            <div>
                <div class="insSquare-t">
                    <img src="@/assets/img/swiper.png" alt="">
                </div>
                <div class="insSquare-c">
                    <div class="insSquare-c-title">灵感工具</div>
                    <div class="insSquare-c-content">
                        <div 
                            class="insSquare-c-item"
                            v-for="item in insData"
                            :key="item.id"
                            @click="changeRouter(item)"
                        >
                            <div class="insSquare-c-item-name">
                                <span class="insSquare-item-title">{{item.label}}</span>
                                <span class="insSquare-item-content">{{item.content}}</span>
                            </div>
                            <img :src="item.imgUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="insSquare-b">
                    <div class="insSquare-b-title">灵感素材</div>
                    <div class="imgFlow">
                        <Flow></Flow>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入瀑布流组建
import Flow from '@/components/InsSquare/flow.vue'

// 引入灵感工具的图片
import img1 from '@/assets/img/insSquare-1.png'
import img2 from '@/assets/img/insSquare-2.png'
import img3 from '@/assets/img/insSquare-3.png'

interface insData {
    id: number,
    label: string,
    content: string,
    imgUrl: string,
    pathName: string,
}

let insData = ref<insData[]>([
    {
        id: 0,
        label: '文案生成',
        content: '创意文案,轻松生成',
        imgUrl: img1,
        pathName: 'copyGen',
    }, 
    {
        id: 1,
        label: '图片生成',
        content: '智能生图，千图万变',
        imgUrl: img2,
        pathName: 'imageGen',
    },
    {
        id: 2,
        label: '视频生成',
        content: '智能生视频，动感立现',
        imgUrl: img3,
        pathName: 'videoGen',
    },
])

// 点击进行切换
const changeRouter = (item: insData) => {
    router.push({name: item.pathName})
}

</script>


<style scoped lang='scss'>
.insSquare-container{
    width: 100%;
    height: 100%;
    padding: 31px 20px;
    box-sizing: border-box;
    background: #333333;
    border-radius: 8px;
    border: 1px solid #7B7B94;
    .insSquare-t{
        width: 100%;
        height: 260px;
        cursor: pointer;
        img{
            min-width: 800px;
            width: 100%;
            height: 260px;
            object-fit: cover; // 添加图片适应方式
        }
    }
    .insSquare-c{
        min-width: 800px;
        margin-top: 32px;
        .insSquare-c-title{
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
        }
        .insSquare-c-content{
            width: 100%;
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .insSquare-c-item{
                //width: 360px;
                width: 30%;
                height: 120px;
                padding: 28px 0 0 20px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                border-radius: 8px;
                background: #1E2020;
                overflow: hidden;
                cursor: pointer;
                .insSquare-c-item-name{
                    display: flex;
                    flex-direction: column;
                    .insSquare-item-title{
                        font-weight: 600;
                        font-size: 18px;
                        color: #FFFFFF;
                    }
                    .insSquare-item-content{
                        margin-top: 20px;
                        font-weight: 400;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                img{
                    width: 126px;
                    height: 165px;
                    transform: translate(28px,10px);
                }
            }
        }
    }
    .insSquare-b{
        .insSquare-b-title{
            margin-top: 38px;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
        }
        .imgFlow{
            width: 100%;
            margin-top: 18px;
        }
    }
}
</style>
<template>
    <div class="main">
        <!-- 左侧 -->
        <div class="main-l">
            <div class="logo">
                <img src="@/assets/img/logo3.png" alt="">
            </div>
            <div class="menu-list">
                <div 
                    class="menu-list-item"
                    v-for="item in menuData"
                    :key="item.id"
                >
                    <img :src="item.img" alt="">
                    <span>{{item.label}}</span>
                </div>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="main-r">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MenuData {
    id: number,
    label: string,
    img: string,
    routerName: string,
    isSelect: boolean,
}

import img1 from '../assets/img/aI-retouching.png';
import img2 from '../assets/img/copy-generation.png';
import img3 from '../assets/img/image-generation.png';
import img4 from '../assets/img/video-generation.png';


let menuData = ref<MenuData[]>([
  {
    id: 0,
    label: '灵感广场',
    img: img1,
    routerName: 'insSquare',
    isSelect: true,
  },
  {
    id: 1,
    label: '文案生成',
    img: img2,
    routerName: 'copyGen',
    isSelect: false,
  }, 
  {
    id: 2,
    label: '图片生成',
    img: img3,
    routerName: 'imageGen',
    isSelect: false,
  },
  {
    id: 3,
    label: '视频生成',
    img: img4,
    routerName: 'videoGen',
    isSelect: false,
  },
])


</script>

<style scoped lang='scss'>
.main{
    width: 100vw;
    height: 100vh;
    padding: 12px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    background: #000000;
    .main-l{
        min-width: 220px;
        width: 220px;
        height: 100%;
        box-sizing: border-box;
        background: #333333;
        border-radius: 8px;
        border: 1px solid #7B7B94;
        color: #FFFFFF;
        overflow: hidden;
        .logo{
            width: 100%;
            padding: 22px 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            img{
                width: 79px;
                height: 22px;
                margin-left: 16px;
            }
        }
        .menu-list{
            width: 100%;
            padding: 0px 12px;
            box-sizing: border-box;
            
        }
        .menu-list-item{
            width: 196px;
            height: 42px;
            padding: 0 12px;
            margin-top: 12px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-radius: 8px;
            cursor: pointer;
            img{
                width: 16px;
                height: 16px;
                margin-right: 8px;
            }
            span{
                font-weight: 400;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 14px;
            }
            &:hover{
                background: #365b58;
            }
        }
        .active{
            background: #365b58;
        }
    }
    .main-r{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin-left: 12px;
    }
}
</style>

<template>
	<div class="imgFLow-container" ref="imgflowRefs">
		<div>
			<Waterfall :list="list" :gutter='6' :width='imgWidth'>
				<!-- 作用域匿名插槽 -->
				<template #default="{ item,index }">
					<!-- img外壳容器 -->
					<div class="card" @mouseenter="handleMouseenter(index)" @mouseleave="handleMouserleave(index)">
						<!-- img懒加载 -->
						<LazyImg :url="item.src" @load="handleImageLoad" @click="scaleImg(index)" />
						<!-- 蒙层 -->
						<div class="card-model" v-show="imgIndex==index"></div>
						<!-- 按钮 -->
						<div class="card-btn" :class="imgIndex==index?'card-btn-visible':''" @click="opeanImageGen">生成同款</div>
					</div>
				</template>
			</Waterfall>
		</div>
	</div>
	<teleport to='body' v-if="previewImg">
		<div class="model-container" @click.stop="closeModel"></div>
		<div class="model-main-img">
			<img :src="previewImg" alt="">
		</div>
	</teleport>
</template>

<script lang='ts' setup>
	import {
		onMounted,
		ref,
		nextTick,
		onUnmounted
	} from 'vue'
	import {
		LazyImg,
		Waterfall
	} from 'vue-waterfall-plugin-next'
	import 'vue-waterfall-plugin-next/dist/style.css'

	//批量获取图片
	const importImagePaths = () => {
		// 使用 eager: true 立即获取处理后的路径
		const modules = import.meta.glob('@/assets/img/imgFlow*.png', {
			eager: true
		})
		const imagePaths: {
			src: string
		} [] = []
		for (const path in modules) {
			const module = modules[path] as {
				default: string
			}
			imagePaths.push({
				src: module.default // 存储打包后的正确路径
			})
		}
		return imagePaths
	}
    // 数据 - 存储图片路径和加载函数
	let list = ref(importImagePaths())
	// 处理图片加载
	const handleImageLoad = (e: Event) => {
		const img = e.target as HTMLImageElement
	}
	//计算图片width
	let imgflowRefs = ref < HTMLElement > ()
	let imgWidth = ref < number > (200)
	onMounted(() => {
		nextTick(() => {
			getImgWidth()
		})
	})
	//获取图片宽度
	const getImgWidth = () => {
		let width = imgflowRefs.value.clientWidth
		imgWidth.value = (width - 3 * 6) / 4 - 3
	}
	//监听浏览器窗口变化
	window.addEventListener('resize', () => {
		getImgWidth()
	})


	//鼠标移入的图片
	let imgIndex = ref < number > ()
	//监听鼠标移入
	const handleMouseenter = (index: number) => {
		imgIndex.value = index
	}
	//鼠标移出
	const handleMouserleave = (index: number) => {
		imgIndex.value = null
	}
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()
	//点击打开图片生成
	const opeanImageGen = () => {
		router.push({
			name: 'imageGen'
		})
	}
	//预览的图片
	let previewImg = ref < string > ('')
	//点击打开图片预览
	const scaleImg = (index: number) => {
		//拿到预览的图片URl
		previewImg.value = list.value[index].src
	}
	//关闭图片预览
	const closeModel = () => {
		previewImg.value = ''
	}
</script>

<style scoped lang='scss'>
	:deep(.waterfall-list) {
		display: flex;
		justify-content: space-between;
		background-color: transparent !important;
	}

	.card {
		position: relative;

		.card-model {
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 60px;
			background: linear-gradient(to top, #000000, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
			opacity: 0.6;
		}

		.card-btn {
			position: absolute;
			z-index: 999;
			left: 50%;
			bottom: 0px;
			transform: translateX(-50%);
			width: 90%;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #48FFF1;
			border-radius: 8px;
			font-weight: 500;
			font-size: 12px;
			color: #355E5B;
			cursor: pointer;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.card-btn-visible {
			bottom: 12px;
			/* 显示时的位置 */
			opacity: 1;
			/* 显示时不透明 */
		}
	}

	.model-container {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		opacity: .8;
		overflow: hidden;
	}

	.model-main-img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		overflow: hidden;

		img {
			width: 340px;
			height: auto;
		}
	}
</style>
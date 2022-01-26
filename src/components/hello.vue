<template>
	<div class="box">
		<ul class="ul">
			<li>首页</li>
			<li>列表</li>
			<li>我的</li>
			<div>
				{{msg+"119"}}
			</div>
			<button type="button" @click="print">点击我</button>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"911",
		data(){
			return{
				msg:"911"
			}
		},
		components:{
			//组件登记、注册。
		},
		methods:{
			print(){
				console.log("666")
			}
		}
	}
	
</script>

<style scoped>
	/* css不会影响到外界 */
	.box{
		float: left;
		width: 100%;
		background-color: #005599;
	}
</style>

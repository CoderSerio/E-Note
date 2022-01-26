<template>
    <div class="wrapper">
    <h1>我的奋斗</h1>
    <p>https://mod的企业"的小伙伴等待asdsadasd sadasd你的到来</p>
  </div>
</template>

<script>
  export default {
	name:"card",
    components:{},
    props:{},
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{},
    computed:{},
    watch:{},
  }
</script>
<style scoped>
	*{
		margin: 0px;
	}
	.wrapper{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background-color: #9c9c9c;
		height: 10rem;
		border-radius: 20px;
		text-align: center;
	}
	.wrapper h1{
		color: #ffffff;
		margin-left: 2rem;
		line-height: 5rem;
		height: 2rem;
	}
	.wrapper p{
		margin-left: 2rem;
		color: #ffffff;
		text-align: left;
		width: 80%;
	}
	.wrapper h1::after{
		content: '';
		display: block;
		background-color: #000000;
		height: 1px;
		margin-top: -15px;
	}
</style>
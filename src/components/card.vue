<template>
    <div class="wrapper">
		<div class="pic"></div>
		<h2>{{note.title}}</h2>
		<p>{{note.content}}</p>
    </div>
</template>

<script>
  export default {
	name:"card",
    components:{},
    props:{
        note: Object
    },
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
	padding: 0; 
	margin: 0px;
	}
	.wrapper{
		width: 90%;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		background: linear-gradient(135deg,rgba(170, 166, 166, 0.3),rgba(97, 95, 95, 0.5),rgba(82, 80, 80, 0.8));
		height: 10rem;
		border-radius: 20px;
		/* text-align: center; */
		margin: 25px auto;
		box-shadow: 1px #000;
	}
	.wrapper .pic{
		position: absolute;
		right: 0;
		top: -10px;
		width: 2rem;
		height: 2rem;
		background-image: url(../assets/img/图片1.svg);
	}
	.wrapper h2{
		margin: 0 2rem;
		color: rgb(241, 226, 220);
		line-height: 4rem;
		height: 4rem;
		border-bottom: 1px solid #000;
		overflow: hidden;
	}
	.wrapper p{
		text-indent: 2rem;
		box-sizing: border-box;
		color: #030303;
		height: 5rem;
		text-align: left;
		width: 100%;
		margin: 1rem;
		overflow: hidden;
	}
</style>
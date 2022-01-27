<template>
<div class="wrapper">
    <h1>{{note.title}}</h1>
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
        margin: 5px 0 5px 0;
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
	display:inline-block;
		margin-top: 20px;
	}
	.wrapper h1::after{
		content: '';
		display: block;
		background-color: #000000;
		height: 1px;
		margin-top: -15px;
	}
</style>
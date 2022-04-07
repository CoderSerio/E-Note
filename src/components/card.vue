<template>
    <div class="wrapper">
		<!-- <div class="pic"></div> -->
		<div class="share" @click.stop="share">
			<div class="share-btn"></div>
			<!-- <img src="../assets/img/分享.png" alt="分享"> -->
		</div>
		<h2>{{dealedTitle}}</h2>
		<p>{{pureText}}</p>
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
        shareData:{
            title: this.dealedTitle,
            desc: '易班多媒体电子笔记',
            image_url: '',
            share_url:'https://www.seriocb.top',
        }
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{
		// 暂时只做了分享到qq好友(仅有PC端可以使用)
		share () {
            //此处分享链接内无法携带图片   
            location.href=(
                "https://connect.qq.com/widget/shareqq/index.html?url=" +
                encodeURIComponent(this.shareData.share_url) + "&title=" + this.shareData.title + "&desc=" + this.shareData.desc
            );
        }, 
		
	},
    computed:{
		pureText () {
			// let reg = /[<][/]?\w+[/]?[>]/g
			let reg = /<[^>]*>|<\/[^>]*>/gm
			let res = this.note.content.replace(reg, '')
			// console.log(res)
			return res
		},
		dealedTitle () {
			let title = this.note.title
			// console.log(title)
			if(title.length > 10) {
				return title.slice(0, 10)  
			} else {
				return title
			}

		}
	},
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
		height: 10rem;
		border-radius: 30px;
		/* text-align: center; */
		margin: 30px auto;
		/* background: linear-gradient(225deg, #f3f3f3, #cccccc);
		box-shadow: -7px 7px 14px #aaaaaa,
             		7px -7px 14px #ffffff; */
		background: linear-gradient(45deg, #cccccc, #f3f3f3);
		box-shadow:  7px -7px 14px #aaaaaa,
             		-7px 7px 14px #ffffff;
		cursor: pointer;
		transform-style: preserve-3d;
		user-select: none;
	}
	.wrapper:active {
		box-shadow: inset -7px 7px 14px #aaaaaa,
             		inset 7px -7px 14px #ffffff;
	}
	.wrapper .share{
		box-sizing: border-box;
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: linear-gradient(45deg, #f0f0f0, #cacaca);
		box-shadow:  7px -7px 14px #a6a6a6,
             		-7px 7px 14px #ffffff;

	}
	.share-btn {
		box-sizing: border-box;
		margin: 0.6rem 0.6rem;
		width: 0.8rem;
		height: 0.8rem;
		/* background-image: url(../assets/img/图片1.svg); */
		border-top: 5px solid #eee;
		border-right: 5px solid #eee;
		transform: rotate(45deg);
	}
	.share-btn:hover {
		box-shadow: inset -7px 7px 14px #a6a6a6,
             		inset 7px -7px 14px #ffffff;
	}
	/* .share img {
		width: 100%;
	} */

	.wrapper h2{
		margin: 0 2rem;
		color: rgb(241, 226, 220);
		text-shadow: 2px 2px 3px #000;
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
		line-height: 1.6rem;
	}
</style>
<template>
    <div class="wrapper">
		<!-- <div class="pic"></div> -->
		<div class="share" @click.stop="share(true)" v-if="!note.public && needBtn">
			<div class="share-btn"></div>
			<!-- <img src="../assets/img/分享.png" alt="分享"> -->
		</div>

		<div class="share" @click.stop="share(false)" v-if="note.public && needBtn">
			<div class="share-btn share-btn2"></div>
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
        note: Object,
		needBtn: true
    },
    data(){
      return {
        shareData:{
            title: this.dealedTitle,
            desc: '易班多媒体电子笔记',
            image_url: '',
            share_url:'https://www.seriocb.top',
			back:true,
			
        }
      }
    },
    created(){},
    mounted(){
		},
    activated(){},
    updated(){},
    methods:{
		// 分享到广场
		share (pub) {
			if(this.note.origin && sessionStorage.getItem('user_email') != this.note.origin) {
				alert('克隆内容禁止二次转发!')
				return 
			}
			let str = '确定要取消发布吗？'
			if (pub) {
				str = '确定要发布到广场吗?'
			}
			if (confirm(str)) {
				this.$axios.post('/back/share', JSON.stringify({
					"id":       this.note.id,
					"yb_userid": this.note.yb_userid,
					"title":    this.note.title,
					"content":  this.note.content,
					"public": pub,
					"origin": this.note.origin ? this.note.origin : sessionStorage.getItem('user_email')   
				})).then((res) => {
					console.log('成功接收到响应信息', res)
					this.note.public = !this.note.public
				}).catch((err) => {
					console.warn(err)
				})
			}
        }, 
	},
    computed:{
		pureText () {
			// let reg = /[<][/]?\w+[/]?[>]/g
			let reg = /<[^>]*>|<\/[^>]*>/gm
			let res = this.note.content.replace(reg, '')
			// console.log(res)
			if (!(res.trim(''))) {
				res = '【图片/视频/网页】'
			}
			return res
		},
		dealedTitle () {
			let title = this.note.title
			// console.log(title)
			if (!(title.trim(''))) {
				return '【多媒体信息】'
			} else if(title.length > 10) {
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
		animation: show 1s linear forwards;
	}
	@keyframes show {
    	0% {
      		opacity: 0;
    	}
    	100% {
      		opacity: 1;
    	}
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
		/* cursor: pointer; */
		transform-style: preserve-3d;
		user-select: none;
	}
	.wrapper:active {
		box-shadow: inset -7px 7px 14px #bbbbbb,
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
		text-shadow: 2px 0px 4px #000;
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
	.wrapper:active p {
		font-size: 0.95em;
		margin-top: 0.8rem;
	}
	.wrapper:active h2 {
		margin: 0.1rem 2.2rem;
		font-size: 1.4em;
		text-shadow: 2px -1px 4px #000;
	}
	.wrapper:active .share {
		width: 1.8rem;
		height: 1.8rem;
		right: 1.7rem;
		top: 1.6rem;
	}
	.wrapper:active .share-btn {
		width: 0.72rem;
		height: 0.72rem;
		border-top: 4px solid #eee;
		border-right: 4px solid #eee;
	}
	.share-btn2 {
		transform: rotate(-45deg);
		border-top: 4px solid #ff3700;
		border-right: 4px solid #dd3700;
	}
	.wrapper:active .share-btn2 {
		width: 0.72rem;
		height: 0.72rem;
		border-top: 4px solid #ff3700;
		border-right: 4px solid #dd3700;
	}
</style>
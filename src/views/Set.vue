<template>
    <div class="wrapper">
        <div class="back-btn" @click="back">&lt</div>
        <div class="user-info">
            <div class="head-img">
                <img src="../assets/img/logo.png" alt="头像">
            </div>
            <div class="info-text">
                <div>{{userInfo.email}}</div>
                <div>{{userInfo.regDate}}</div>
            </div>
        </div>
        <div class="hr">
            <div class="hr-content"></div>
        </div>
        <div class="list">
            <div class="list-item" v-for="item in listItem" :key="item.key" @click="item.clickEvent">
                <div class="key">{{item.key}}</div>
                <div class="value">{{item.value}}</div>
            </div>
            <div class="logout-box">
                <div class="logout-btn list-item" @click="logout">LOGOUT</div>

            </div>
        </div>
        <!-- <div class="hr">
            <div class="hr-content"></div>
        </div> -->
        
    </div>
</template>

<script>
  export default {
    name: 'Set',
    components:{},
    props:{},
    data(){
      return { 
        userInfo: {
        email: sessionStorage.getItem('user_email') || '',
        regDate: '易笔记'
        },    
        listItem: [
            {key: '版本号', value: 'V2.1.1', clickEvent: ''},
            {key: '常见问题', value: '>', clickEvent: this.gotoAbout},
            {key: '数据统计', value: '>', clickEvent: this.gotoStatistics}
        ]
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{
        back () {
            this.$router.go(-1)
        },
        devNotice () {
            alert('开发中')
        },
        gotoAbout () {
            this.$router.push('/about')
        },
        gotoStatistics () {
            this.$router.push('/statistics')
        },
        logout () {
            sessionStorage.clear()
            this.$router.push('/')
        }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped >
    
    .back-btn {
        height: 4vh;
        width: 4vh;
        line-height: 4vh;
        font-weight: 900;
        font-size: 1.2rem;
        vertical-align: middle;
        color: #aaa;
        border-radius: 0.5rem;
        border: 2px solid #aaa;
        background: #e0e0e0;
        box-shadow: 7px -7px 14px #aaa,
                    -7px 7px 14px #ffffff;
        transition: border ease-in-out 0.2s;
        margin: 1rem;
    }
    .back-btn:active {
        border: 2px solid #dd3700;
        background: #e0e0e0;
        box-shadow: inset -7px 7px 14px #aaa,
                    inset 7px -7px 14px #ffffff;
    }
   
    
    .user-info {
        /* background: royalblue; */
        display: flex;
        justify-content: space-around;
        height: 20vh;
    }
    .head-img {
        height: 15vh;
        width: 15vh;
        padding: 1rem;
        /* border: 0.2rem solid #aaa; */
        border-radius: 4vh;
        background: linear-gradient(145deg, #cacaca, #f0f0f0);
        box-shadow:  20px 20px 60px #bebebe,
                    -20px -20px 60px #ffffff;
        user-select: none;
    }
    .head-img>img {
        box-sizing: border-box;
        border: 2px solid #cacacaca;
        border-radius: 50%;
        background: linear-gradient(145deg, #cacaca, #f0f0f0);
        box-shadow:  20px 20px 60px #bebebe,
                    -20px -20px 60px #ffffff;
        width: 100%;
        height: 100%;
    }
    .info-text {
        height: 15vh;
        width: calc(100% - 15vh - 7rem);
        padding: 1rem;
        border-radius: 3vh;
        background: linear-gradient(35deg, #cacaca, #f0f0f0);
        box-shadow:   -20px -20px 60px #aaa,
                     20px 20px 60px #ffffff;
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .info-text>div {
        overflow: hidden;
        color: #fff;
        text-shadow: 2px 2px 6px #aaa;
        font-weight: 800;
        font-size: 0.9rem;
        border-radius: 7vh;
        padding: 0.5em 1em;
        background: #e0e0e0;
        box-shadow: inset 2px 2px 4px #bebebe,
                    inset -2px -2px 4px #ffffff;
    }
    .hr {
        height: 2vh;
        padding: 1vh 0.5em;
        margin: 2vh auto;
        border-radius: 1vh;
        width: 90%;
        background: #e0e0e0;
        box-shadow: inset 2px 2px 5px #bebebe,
                inset -2px -2px 5px #ffffff;
    }
    .hr-content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 1px solid #aaae;
        border-radius: 0.5em;
        background: #ff3700;
        box-shadow: 0px 0px 10px #ff0000;
    }
    .list {
        /* margin: 4vh 0 0 0; */
        height: 30vh;
        /* border-radius: 50px; */
        /* background: #e0e0e0;
        box-shadow: inset 30px 30px 60px #bebebe,
            inset -30px -30px 60px #ffffff; */
        width: 100%;
    }
    .list-item {
        display: flex;
        justify-content: space-between;
        width: 90%;
        height: 6vh;
        line-height: 6vh;
        padding: 0.5em;
        margin: 1em auto;
        border-radius: 0.5em;
        background: #eee;
        box-shadow:  5px 5px 10px #b1b1b1,
                    -5px -5px 10px #ffffff;
        color: #fff;
        text-shadow: 1px 1px 4px #000a;
        font-size: 1.2rem;
        font-weight: 900;
        user-select: none;
        /* border-top: #cecece 3px solid; */
        /* border-right: #ccc 3px solid; */
        overflow: hidden;
        animation: outGray 1s ease-out forwards;
        /* transition: border 1s ease-out; */
        /* cursor: pointer; */
    }
    .list .list-item:nth-child(2) {
        animation-delay: 1.5s;
    }
    .list .list-item:nth-child(3) {
        animation-delay: 2s;
    }
    /* .logout-box {
        box-sizing: border-box;
        margin: 8vh auto;
        width: 65%;
        height: 14vh;
        border-radius: 1rem;
        background: #ffffff;
        box-shadow: inset 9px 9px 18px #bababa,
            inset -9px -9px 18px #ffffff;
        overflow: hidden;
        padding: 0 2vw;
    } */

    
    /* .list-item:hover {
       border-top: #cecece 0px solid;
       cursor: pointer;
    } */
    .logout-btn {
        margin: 8vh auto;
        height: 6vh;
        width: 80%;
        line-height: 6vh;
        justify-content: center;
        background: linear-gradient(0deg, #ff0000, #ff3700);  
        /* border-top: #bb0000ee 3px solid; */
        /* border-right: #aa0000ee 3px solid;      */
        animation: outRed 2s ease-in-out forwards;
    }
    @keyframes outRed {
        0% {
           
            border-top: #aa0000ee 0px solid;
        }
        
        100% {
            /* border-top: #bb0000ee 3px solid; */
            border-top: #aa0000ee 0.2em solid;
        }
    }
    @keyframes outGray {
        0% {
           
            border-top: #cecece 0px solid;
        }
        
        100% {
            /* border-top: #bb0000ee 3px solid; */
            border-top: #cecece 0.2em solid;
        }
    }
</style>
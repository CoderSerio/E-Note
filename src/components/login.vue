<template>
    <div :class="[{'wrapper':true}]">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <h2 class="title">WELCOME</h2>
        <div id="form">
          <input type="email" placeholder="Email" v-model="userInfo.email">
          <input type="password"  placeholder="Password" v-model="userInfo.password">
        </div>

        <div class="btns">
          <button class="btn login" @click="login">LOGIN</button>
          <router-link to="/register" class="btn register">REGISTER</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    components:{},
    props:{},
    data(){
      return {
        userInfo: {
          email: '',
          password: ''
        },
        test: true // 
      }
    },
    created(){},
    mounted(){
      if (sessionStorage.getItem('user_email')) {
        this.userInfo.email = sessionStorage.getItem('user_email')
        this.userInfo.password = sessionStorage.getItem('user_password')
      }
    },
    activated(){},
    updated(){},
    methods:{
      login () {
        console.log(this.userInfo)
        this.$axios.post('/back/userlogin', {
          "email": this.userInfo.email,
          "password": this.userInfo.password
        }).then((res) => {
          console.log(res.data)
          if(res.data.code == 1) {
            sessionStorage.setItem('user_email', this.userInfo.email)
            sessionStorage.setItem('user_password', this.userInfo.password)
            alert('登录成功') // 这里先用着这个弹窗，反正到了易班那里会有易班的样式
            this.$router.push('/home')
          }
        }).catch((err) => {
          alert('登录失败，请检查邮箱和密码是否正确')
          console.log(err)
        })
      }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped>
  * {
    user-select: none;
    animation: show 1s ease-in-out forwards;
    overflow: hidden;
  }
  .wrapper {
    width: 80%;
    height: 85vh;
    border-radius: 50px;
    background: linear-gradient(45deg, #a3a3a3, #ffffff);
    box-shadow:  10px 10px 20px #a3a3a3,
                -10px -10px 20px #ffffff;
    /* transition: 1s linear; */
  }
  .logo { 
    margin: 1rem 0 0 0 ;
    height: 64px;
  }
  .logo>img {
    height: 100%;
    animation: show 1s linear forwards;
  }
  /* .wrapper:hover,
  .wrapper:active,
  .wrapper:focus {
    background: #ffffff;
    box-shadow: inset 20px 20px 60px #a3a3a3,
                inset -20px -20px 60px #ffffff;
  } */
  #form {
    height: 40%;
    text-align: center;
  }
  .title {
    font-weight: 900;
    height: 4rem;
    line-height: 4rem;
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
  input {
    width: 60%;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #6668;
    height: 4vh;
    margin: 8vh 0 0 0;
    
  }
  .btns {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .btns>* {
    width: 35vw;
    height: 6vh;
    line-height: 6vh;
    padding: 0.1rem 0;
    margin: 1rem auto;
    font-size: 1.1rem !important;
    font-family: Avenir, Helvetica, Arial, sans-serif !important;
    font-weight: 800;
    outline: none;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    color: #fff; 
    background-color: #000e;
  }
  .login {
    background-color: #fff;
    color: #000e;
  }









  /* .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#CDE6FF;}
  .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#B1D9FF;}
  .st2{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_1_);}
  .st3{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_2_);}
  .st4{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_3_);}
  .st5{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_4_);}
  .st6{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_5_);}
  .st7{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_6_);}
  .st8{fill:url(#SVGID_7_);}
  .st9{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_8_);}
  .st10{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_9_);}
  .st11{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_10_);}
  .st12{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_11_);}
  .st13{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_12_);}
  .st14{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_13_);}
  .st15{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_14_);}
  .st16{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_15_);}
  .st17{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_16_);}
  .st18{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_17_);}
  .st19{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_18_);}
  .st20{fill:url(#SVGID_19_);}
  .st21{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_20_);}
  .st22{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_21_);}
  .st23{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_22_);}
  .st24{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_23_);}
  .st25{fill-rule:evenodd;clip-rule:evenodd;fill:url(#Table_1_);}
  .st26{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_24_);}
  .st27{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_25_);}
  .st28{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_26_);}
  .st29{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_27_);}
  .st30{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_28_);}
  .st31{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_29_);}
  .st32{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_30_);}
  .st33{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_31_);}
  .st34{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_32_);}
  .st35{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_33_);}
  .st36{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_34_);}
  .st37{fill:url(#SVGID_35_);}
  .st38{fill:url(#SVGID_36_);}
  .st39{fill:url(#SVGID_37_);}
  .st40{fill:url(#SVGID_38_);}
  .st41{fill:url(#SVGID_39_);}
  .st42{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_40_);}
  .st43{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_41_);}
  .st44{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_42_);}
  .st45{fill:url(#SVGID_43_);}
  .st46{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_44_);}
  .st47{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_45_);}
  .st48{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_46_);}
  .st49{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_47_);}
  .st50{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_48_);}
  .st51{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_49_);}
  .st52{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_50_);}
  .st53{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_51_);}
  .st54{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_52_);}
  .st55{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_53_);}
  .st56{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_54_);}
  .st57{fill:url(#SVGID_55_);}
  .st58{fill:url(#SVGID_56_);}
  .st59{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_57_);}
  .st60{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_58_);}
  .st61{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_59_);}
  .st62{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_60_);}
  .st63{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_61_);}
  .st64{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_62_);}
  .st65{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_63_);}
  .st66{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_64_);}
  .st67{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_65_);}
  .st68{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_66_);}
  .st69{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_67_);}
  .st70{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_68_);}
  .st71{fill:url(#SVGID_69_);}
  .st72{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_70_);}
  .st73{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_71_);}
  .st74{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_72_);}
  .st75{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_73_);}
  .st76{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
  .st77{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_74_);}
  .st78{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_75_);} */
</style>
<template>
    <div :class="[{'wrapper':true}]">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <h2 class="title">JOIN US</h2>
        <div id="form">
          <input type="email"  placeholder="Email" v-model="userInfo.email">
          <input type="password"  placeholder="Password" v-model="userInfo.password">
          <input type="text" placeholder="Verification" v-model="verification" id="verification" >
          <button id="send-verification" @click="sendVerification">SEND</button>
        </div>
        <div class="btns">
          <button class="btn login" @click="register">REGISTER</button>
          <router-link to="/" class="btn register">BACK</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Register',
    components:{},
    props:{},
    data(){
      return {
        userInfo: {
          email: '',
          password: ''
        },
        verification: '',
        time: 120,
        hasGotVerification: false,
        test: true // 正式运行记得改成false
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{
      register () {
        // 如果还没有请求过验证码，或者 还没有输入验证码
        if (!this.hasGotVerification || !this.verification.trim('')) {
          alert('请先输入验证码进行邮箱验证!')
          return 
        }
        console.log(this.userInfo)
        // 三个框都要有内容才行
        if (this.verification.trim('') && this.userInfo.email.trim('') && this.userInfo.password.trim('')) {
          let emailRXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
          let passwordRXP = /^[\w]{6,16}$/
          if (!emailRXP.test(this.userInfo.email)) {
            alert('请检测邮箱是否有效!')
            return
          } 
          if (!passwordRXP.test(this.userInfo.password)) {
            alert('密码长度为6-16位,且仅包含 数字和字母!')
          }
          this.$axios.post('/back/userregister', {
            "email": this.userInfo.email,
            "password": this.userInfo.password,
            "verification": this.verification
          }).then((res) => {
            console.log(res.data)
            // 暂时先不做验证码的检测
            if(res.data.code == 1) {
              sessionStorage.setItem('user_email', this.userInfo.email)
              sessionStorage.setItem('user_password', this.userInfo.password)
              alert('注册成功') // 这里先用着这个弹窗，反正到了易班那里会有易班的样式
              this.$router.push('/')
            } else {
              alert('注册失败, 邮箱已被注册 或 验证码错误')
            }
          }).catch((err) => {
            alert('注册失败，请检查邮箱是否有效')
            console.log(err)
          })
        } else {
          alert('请检查输入内容是否完整且有效')
        }
        
      },
      // 发送验证码
      sendVerification () {
        if (new Date().getTime() < this.time + 5 * 60 * 1000) {
          let deltaTime = Math.floor((this.time + 5 * 60 * 1000 - new Date().getTime()) / 1000 / 60) 
          alert('验证码已发送,请勿重复请求。请在'+ deltaTime + '分钟后重试')
          return
        }
        // 邮箱和密码不为空
        if (this.userInfo.email.trim('') && this.userInfo.password.trim('')) {
          let emailRXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (!emailRXP.test(this.userInfo.email)) {
            alert('请检测邮箱是否有效!')
          } else {
            this.$axios.post('/back/sendverification', {
              "email": this.userInfo.email.trim(''),
              "date": new Date().getTime() // 观察过期时间
            }).then((res) => {
              
              console.log(res.data)
              // 获取验证码成功
              if(res.data.code == 1) {
                // 设置一个时间间隔
                this.hasGotVerification = true,
                // 前端更新进行请求的时间
                this.time = new Date().getTime()
                
                alert('获取验证码成功，请前往邮箱查看')
              } else {
                alert("请求过于频繁，请稍后再试")
              }
            }).catch((err) => {
              console.warn('获取验证码失败', err)
            })

          }
        } else {
          alert('请先填写必要的信息')
        }
      }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped>
 * {
    user-select: none;
    animation: show 1s linear forwards;
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
    width: 62%;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #6668;
    height: 4vh;
    margin: 5vh 0 0 0;
    
  }
  .btns {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #send-verification,
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
  #verification {
    width: 40%;
  }
  button#send-verification {
    width: 17%;
    margin: 0 0 0 5%;
    font-size: 1rem;
    background-color: #fff;
    color: #000e;
  }
</style>
<template>
  <div class="home">
    <div class="home-top">
      <input type="text" class="search" placeholder="搜索" v-model="searchStr">
    </div>
    
    <div v-for="(i, j, key) in searchNotes" :key="key" @click="edit(i)">
       <card :note="i"></card>
    </div>

    <div class="alert-box" v-if="swi">
      <div class="top">
        <!-- <div class="back" @click="back()">返回</div> -->
        <!-- <div class="save" @click="save(activeNote.id)">保存</div> -->
        <div class="title">{{activeNote.title}}</div>
      </div>
      <alert ref="alert" :actNote="activeNote" :ID="createId()" @back="back" @del="del"></alert>
    </div>

    <div @click="edit({id:-1 , yb_userid: yb_userid, title:'新建文件', content:''})">
	    <div class="plus">
        <img src="../assets/img/加号.png">
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import alert from '@/components/alert'
import card from '@/components/card'
// import axios from 'axios'

// const fs = require('fs')

export default {
  name: 'Home',
  data() {
    return {
      notes: [
              // {id:1, title:'哈哈哈', content:'嘻嘻嘻'},
            ],
      searchStr: '',
      swi: false,
      yb_userid: '39988545',
      activeNote: {id:-1, yb_userid: this.yb_userid, title:'未命名', content:''},
      client_id: 'cab99d7a009889c1',
      client_secret: '3cbe532bdf86f9df02ed8ee98098a453',
      redirect_uri: 'https://f.yiban.cn/iapp1040164',
      // 'http://f.yiban.cn/iapp1040164',
      access_token: '',
      yb_base_url: 'https://openapi.yiban.cn',
      code: '11b332feb6d564def2c4879a7bb2e24faf14cbd0',

    }
  },
  components: {
    card,
    alert
  },
  mounted() {
      // this.test()
      this.getNotes()
  },
  methods: {
    
    // 参数是一个回调，这就是 观察者模式
    getNotes (callback) {
            this.$axios.get('/back/get', {
              params: {
                "yb_userid": this.yb_userid  
              }
            }).then((res) => {
                console.log('文章数据:',res.data)
                for(let i of res.data.data) {
                  // console.log(i)
                  this.notes.push(JSON.parse(i))
                }
                // console.log('notes:', this.notes)
                if(callback) {
                  callback()
                }
            }).catch((err) => {
                console.warn('获取文章数据失败')
                console.warn(err)
            })     
    },
    edit (i) {
      // console.log('233')
      this.activeNote = i
      console.log(this.activeNote)
      this.swi = true      
    },
    
    back() {
      // this.swi = false
      this.$router.go(0)
    },
    del (id) {
      for (let i = 0; i < this.notes.length; i ++) {
        if(this.notes[i].id == id) {
          this.notes.splice(i, 1)
          break
        }
      }
    },
    createId () {
      let ID = Math.floor(Math.random() * 1000)
      for(let i of this.notes) {
        // console.table(i.id)
        if(i.id == ID) {
          return createId()
        }
      }
      return ID
    },
    save (actId) {
      for(let i = 0; i < this.notes.length; i ++) {
        console.log(i, this.notes[i], alert.activeNote)
        if(actId == this.notes[i].id) {
            this.notes[i] = alert.activeNote
            this.back()
            return
        }
      }
      // 没有找到就说明是新的文章
      this.notes.push(alert.activeNote)
      console.log(this.notes)
      this.back()
    } 
  },
  computed: {
    searchNotes() {
      let temp = [...this.notes]
      if(this.searchStr.trim()) {
        temp = this.notes.filter((p) => {
          // console.log(this.searchStr, p.title, p.content, p.title.indexOf(this.searchStr))
          return  (p.title.indexOf(this.searchStr) !== -1) ||
                  (p.content.indexOf(this.searchStr) !== -1)
        })
      }
      // console.log(temp)
      return temp
    }
  }
}
</script>

<style scoped>
  .home-top {
    height: 2rem;
    width: 100%;
    
  }
  .search {
    margin: 1rem 0 1rem 0;
    height: 1rem;
    padding: 0.5rem 0 0.5rem 16px;
    width: 80%;
    border: 0.5px solid rgba(51, 51, 51, 0.5);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .alert-box {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(39, 136, 221, 0.438);
  }
  .top {
    font-weight: 900;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
  }
  /* .back {
    position: absolute;
    left: 1rem;
  } */
  /* .save {
    position: absolute;
    right: 1rem;
  } */
  .plus{
	  width: 5rem;
	  height: 5rem;
	  line-height: 5rem;
	  position: fixed;
    bottom: 20px;  
    right: 20px;
  }
  .plus img{
	  width: 5rem;
	  height: 5rem;
    border-radius: 50%;
    border: 1px solid #d43e158a;
    box-shadow: 1px 2px 10px #d43f15;
  }

</style>


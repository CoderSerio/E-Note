<template>
  <div class="home">
    <div class="home-top">
      <input type="text" class="search" placeholder="搜索" v-model="searchStr">
      <div class="set-btn" @click="gotoSet">
        <img src="../assets/img/设置.png" alt="S">
      </div>
    </div>
    
    <div v-for="(i, j, key) in searchNotes" :key="key" @click="open(i)">
       <card :note="i" :needBtn="false"></card>
    </div>

    <div class="alert-box" v-if="swi">
      <div class="top">
        
        <div class="title">{{activeNote.title}}</div>
      </div>
      <public-alert ref="alert" :actNote="activeNote"  @back="back" @del="del"></public-alert>
    </div>

  </div>
  
</template>

<script>
// @ is an alias to /src
import publicAlert from '@/components/publicAlert'
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
      yb_userid: sessionStorage.getItem('user_email') || '',
      activeNote: {id:-1, yb_userid: this.yb_userid, title:'未命名', content:'', public: true, origin: true},
    }
  },
  components: {
    card,
    "public-alert":publicAlert
  },
  mounted() {
      // this.test()
      // this.init(this.getNotes)
      this.getNotes()
  },
  methods: {
    
    // 获取文章数据
    getNotes () {
            this.$axios.get('/back/get', {
              params: {
                "yb_userid": 'ALL_PUBLIC' // 关键字
              }
            }).then((res) => {
                console.log('文章数据:',res.data)
                for(let i of res.data.data) {
              
                  this.notes.push(JSON.parse(i))
                }
              
            }).catch((err) => {
                console.warn('获取文章数据失败')
                console.warn(err)
            })     
    },
  
    back() {
      this.swi = false 
      // this.$router.go(0)
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
    },
    gotoSet () {
      console.log('设置')
      this.$router.push('/set')
    },
    open (i) {
      this.activeNote = i
      console.log(this.activeNote)
      this.swi = true 
    } 
  },
  computed: {
    searchNotes() {
      let temp = [...this.notes]
      if(this.searchStr.trim()) {
        temp = this.notes.filter((p) => {
          // console.log(this.searchStr, p.title, p.content, p.title.indexOf(this.searchStr))
          return  (p.title.indexOf(this.searchStr) !== -1) ||
                  (p.content.replace(/<[^>]*>|<\/[^>]*>/gm, '').indexOf(this.searchStr) !== -1)
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
  .home-top>* {
    display: inline-block;
  }
  .set-btn {
    height: 4vh;
    width: 4vh;
    vertical-align: middle;
    border-radius: 0.5rem;
    border: 2px solid #aaa;
    background: #e0e0e0;
    box-shadow: 7px -7px 14px #aaa,
                -7px 7px 14px #ffffff;
    transition: border ease-in-out 0.2s;
  }
  .set-btn:active {
    border: 2px solid #dd3700;
    background: #e0e0e0;
    box-shadow: inset -7px 7px 14px #aaa,
                inset 7px -7px 14px #ffffff;
  }
  .set-btn img{
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events:none;
  }

  .search {
    margin: 1rem 1rem 1rem 0;
    height: 1rem;
    padding: 0.5rem 0 0.5rem 16px;
    width: 70%;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.8);
    /* box-shadow: inset 20px 20px 20px #bebebe,
                inset -20px -20px 20px #fff;
    background: #e0e0e0; */
    background: #ffffff;
    box-shadow: inset 10px 10px 15px #c4c4c4,
                inset -10px -10px 15px #ffffff;
    
    
    outline: none;
    border: none;
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
    box-shadow: 1px 5px 20px #d43f15;
  }

</style>


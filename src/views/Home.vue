<template>
  <div class="home">
    <div class="top">
      <input type="text" class="search" placeholder="搜索" v-model="searchStr">
    </div>
    <div v-for="(i, j, key) in searchNotes" :key="key" @click="edit(i)">
       <card :note="i"></card>
    </div>
    <div class="alert-box" v-if="swi">
      <div class="top">
        <div class="back" @click="back()">返回</div>
        <div class="title">{{activeNote.title}}</div>
      </div>
      <alert ref="alert" :actNote="activeNote"></alert>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import alert from '@/components/alert'
import card from '@/components/card'
export default {
  name: 'Home',
  data() {
    return {
      notes: [
              {title:'我的奋斗', content:'https://mod的企业"的小伙伴等待asdsadasd sadasd你的到来'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'}
            ],
      searchStr: '',
      swi: false,
      activeNote: {title:'未命名', content:''}
    }
  },
  components: {
    card,
    alert
  },
  methods: {
    edit(i) {
      // console.log('233')
      this.activeNote = i
      console.log(this.activeNote)
      console.log(i)
      this.swi = true      
    },
    back() {
      this.swi = false
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
  .top {
    background-color: rgba(184, 170, 170, 0.685);
    height: 4rem;
  }
  .search {
    margin: 1rem 0 1rem 0;
    height: 1rem;
    padding: 0.5rem 0 0.5rem 16px;
    width: 80%;
    border: 1px solid #fff;
    border-radius: 10px;
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
  .back {
    position: absolute;
    left: 1rem;
  }
</style>


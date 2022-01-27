<template>
  <div class="home">
    <div class="top">
      <input type="text" class="search" placeholder="搜索" v-model="searchStr">
    </div>
    <div v-for="(i, j, key) in searchNotes" :key="key" @click="edit(i)">
       <card :note="i"></card>
    </div>
	 <div class="plus"><img src="../assets/img/加号.png" ></div>
  </div>

</template>

<script>
// @ is an alias to /src
import card from '@/components/card'
export default {
  name: 'Home',
  data() {
    return {
      notes: [
              {title:'我的奋斗', content:`俞佑回来了。

“只要我去找他，无论什么时候，他还是会等我的。“
深了， 所以才令她觉得无所谓。
`},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'}
            ],
      searchStr: '',      
      search: []       
    }
  },
  components: {
    card
  },
  methods: {
    edit() {
      console.log('功能开发ing')
      alert('功能开发ing')
    }
  },
  computed: {
    searchNotes() {
      let temp = [...this.notes]
      if(this.searchStr.trim()) {
        temp = this.notes.filter((p) => {
          console.log(this.searchStr, p.title, p.content, p.title.indexOf(this.searchStr))
          return  (p.title.indexOf(this.searchStr) !== -1) ||
                  (p.content.indexOf(this.searchStr) !== -1)
        })
      }
      console.log(temp)
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
  .plus{
	  width: 100%;
	  height: 5rem;
	  line-height: 5rem;
	   position: fixed;
      bottom: 20px;  
	  	    width: 160%;
  }
  .plus img{
	  width: 5rem;
	  height: 5rem;
   }
</style>


<template>
  <div class="home">
    <div class="top">
      <input type="text" class="search" placeholder="搜索">
    </div>
    <div v-for="(i, j, key) in notes" :key="key" @click="edit(i)">
       <card :note="i"></card>
    </div>
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
              {title:'我的奋斗', content:'https://mod的企业"的小伙伴等待asdsadasd sadasd你的到来'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'},
              {title:'哈哈哈', content:'嘻嘻嘻'}
            ]       
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
  
</style>


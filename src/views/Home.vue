<template>
  <div class="home">
    <div v-for="i in notes">
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
  }
}
</script>


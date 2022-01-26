<template>
  <div class="home">
    <div v-for="(i, j) in notes" v-bind="i">
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
              {title:'哈哈哈', content:'嘻嘻嘻'},
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

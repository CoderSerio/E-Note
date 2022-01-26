<template>
    <div class="wrapper">
        <div>{{note.title}}</div>
        <div>{{note.content}}</div>
  </div>
</template>

<script>
  export default {
    name: 'card',
    components:{},
    props:{
        note: Object
    },
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{},
    computed:{},
    watch:{},
  }
</script>
<style scoped>
    .wrapper {
        background-color: aliceblue;
        widows: 100%;
        margin: 5px 0 5px 0;   
    }
</style>
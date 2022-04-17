<template>
    <div class="wrapper">
      <div class="back-btn" @click="back">&lt</div>
      <loading>
        developing
      </loading>
      <h1>
        开发中，敬请期待
      </h1>
  </div>
</template>

<script>
  import loading from '@/components/loading'
  export default {
    name: 'Statistics',
    components:{
      loading
    },
    props:{},
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{
      back () {
        this.$router.go(-1)
      }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped>
  .back-btn {
        height: 4vh;
        width: 4vh;
        line-height: 4vh;
        font-weight: 900;
        font-size: 1.2rem;
        vertical-align: middle;
        color: #aaa;
        border-radius: 0.5rem;
        border: 2px solid #aaa;
        background: #e0e0e0;
        box-shadow: 7px -7px 14px #aaa,
                    -7px 7px 14px #ffffff;
        transition: border ease-in-out 0.2s;
        margin: 1rem;
    }
    .back-btn:active {
        border: 2px solid #dd3700;
        background: #e0e0e0;
        box-shadow: inset -7px 7px 14px #aaa,
                    inset 7px -7px 14px #ffffff;
    }
</style>
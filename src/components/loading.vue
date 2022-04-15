<template>
    <div class="wrapper">
        <div>
            <slot>loading</slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'loading',
    components:{},
    props:{},
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
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 10vh;
        width: 15vh;
        background: #fffc;
        backdrop-filter: blur(30px);
        z-index: 9999;
        text-align: center;
        line-height: 10vh;
        border-radius: 1em;
        font-weight: 800;
        font-size: 1.2rem;
    }
</style>
<template>
    <div class="wrapper">
      <div class="back-btn" @click="back">&lt</div>
      <!-- <loading>
        developing
      </loading> -->
        <h2>公有/私有笔记分布</h2><br>
        <div ref="echart1" id="echart1" :style="{width: '100vw', height: '100vw'}"></div>
        <br><br><h2>所有笔记</h2>
        <div ref="echart2" id="echart2" :style="{width: '100vw', height: '100vw'}"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  // import loading from '@/components/loading'
  export default {
    name: 'Statistics',
    components:{
      // loading
    },
    props:{},
    data(){
      return {
        option1: {
            title: {
                // text: '公开/私有',
                // // 默认位置再左上角
                // left: 'center',
                // top: 'top',
                
            },
            series: [
                {
                  type: 'pie',
                  avoidLabelOverlap: false,
                  data: [
                      {
                          value: 1,
                          itemStyle: {
                            shadowColor: '#0049e4', 
                            opacity: 0.4,
                            borderRadius: 20,
                            shadowBlur: 10,
                          },
                          name: '私有'
                      },
                      {
                          value: 1,
                          itemStyle: {
                            shadowColor: '#00aaaa', 
                            opacity: 0.4,
                            borderRadius: 20,
                            shadowBlur: 10,
                          },
                          name: '公有'
                      }
                  ],
                  radius: ['40%', '100%'],
                  label: {
                      show: false,
                      position: 'center',
                      textStyle: {
                          fontSize: 30
                      },
                      
                      emphasis: {
                          show: true,  
                      }
                  },
                  roseType: 'area'
                }
            ]
        },
        option2: {
          xAxis: { // 设置x坐标
            data: ['总数','公开','私有','原创','转载']
          },
          yAxis: { // 设置y坐标
              // data: [1,2,3,4,5,6,7]
          },
          series: [
              {
                  type: 'bar',
                  itemStyle: {
                    shadowColor: 'purple', 
                    opacity: 0.4,
                    borderRadius: 10,
                    shadowBlur: 10,
                  },
                  data: []
              }
          ]
        }
      }
    },
    created(){},
    mounted(){
      this.$axios.get('/back/statistics', {
        params: {
          "yb_userid": sessionStorage.getItem('user_email')
        }
      }).then((res) => {
        console.log(res.data)
        // 
        res.data.private ? 
        this.option1.series[0].data[0].value = res.data.private :
        this.option1.series[0].data[0] = null
        
        res.data.public ?
        this.option1.series[0].data[1].value = res.data.public :
        this.option1.series[0].data[1] = null

        this.echartInit(this.$refs.echart1, this.option1)

        // let {allNum, public, private, origin, notOrigin} = res.data
        this.option2.series[0].data.push(res.data.allNum, res.data.public, res.data.private, res.data.origin, res.data.notOrigin)
        if (! (res.data.allNum || res.data.public || res.data.private || res.data.origin || res.data.notOrigin)) {
          this.option2.series[0].data = [0, 0, 0, 0, 0]
        }
        this.echartInit(this.$refs.echart2, this.option2)
      }).catch((err) => {
        console.warn ('数据统计失败')
      })
    },
    activated(){},
    updated(){},
    methods:{
      back () {
        this.$router.go(-1)
      },
      echartInit (echart, option) {
        
        echarts.init(echart).setOption(option)
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
    #echart1 {
      padding: 2vh 0;
      /* text-align: center; */
      /* margin: 0 auto; */
    }
</style>
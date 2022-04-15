<template>
    <div class="wrapper">
        <input type="file" ref="fileInput">
        <button @click="myUpload">上传对象测试</button>
    </div>
</template>

<script>
let COS = require('cos-js-sdk-v5');

  export default {
    name: 'test',
    components:{},
    props:{},
    data(){
      return {
        cos: new COS({
            SecretId: 'AKIDgBQTIn46rLZXEesviETR9alfJgmbATWJ',
            SecretKey: 'Xpqa3GCsHPHrACySfbHgofGadgSyDBsJ',
        }),
        fileObject: null
      }
    },
    created(){},
    mounted(){
        // SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
        let input = this.$refs.fileInput
        input.addEventListener('input', () => {
            console.log(input.files[0])
            this.fileObject = input.files[0]
        })
    },
    activated(){},
    updated(){},
    methods:{
        myUpload () {
            this.cos.putObject({
                Bucket: 'epic-1306658948', /* 必须 */
                Region: 'ap-chengdu',     /* 存储桶所在地域，必须字段 */
                Key: '测试文件' + new Date(),              /* 必须 */
                StorageClass: 'STANDARD',
                Body: this.fileObject, // 上传文件对象
                onProgress: function(progressData) {
                    console.log(JSON.stringify(progressData));
                }
            }, function(err, data) {
                console.log(err || data);
            })
        },
        myDelete() {
            this.cos.deleteObject({
            });
        }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped lang='scss'>
</style>
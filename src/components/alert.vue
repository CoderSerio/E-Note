<template>
    <div class="wrapper">
        <loading v-if="isLoading">loading</loading>
        <div class="back" @click="back">返回</div>
        <div class="delete" @click="del">删除</div>
        <div id="toolbar-container" class="toolbar"></div>
        <div id="text-container" class="text"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
import loading from '@/components/loading'
var COS = require('cos-js-sdk-v5');
// const fs = require('fs')
let editor

export default {
    name:'alert',
    components:{
        loading
    },
    props:{
        actNote: Object,
        ID: Number,
        originContent: ''
    },
    data(){
      return {
          isLoading: false,
          cos: new COS({
            SecretId: 'AKIDgBQTIn46rLZXEesviETR9alfJgmbATWJ',
            SecretKey: 'Xpqa3GCsHPHrACySfbHgofGadgSyDBsJ',
        })
      }
    },
    created(){},
    mounted(){
        editor = new E('#toolbar-container', '#text-container')
        // editor.config.height = 1000
        editor.config.zIndex = 100
        // editor.config.placeholder = '空空如也'
        editor.config.focus = false
        console.log('editor', editor)

        editor.config.excludeMenus = [
            'lineHeight',
            'list',
            'redo',
            'lineHeight',
            'fontName',
            'italic',
            'code',
            'underline',
            'quote',
            'emoticon',
            'indent',
            'head',
            'splitLine'
        ]
        // editor.on('modalOrPanelShow', modalOrPanel => {
        //     if (modalOrPanel.type !== 'modal') return
        //     const { $elem } = modalOrPanel // modal element

        //     // 设置 modal 样式（定位、z-index）
        //     // 显示蒙层
        // })

        //配置图片
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        editor.config.uploadImgMaxLength = 3 // 一次最多3张
        editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
        // 上传图床,并且做了一点限制，有加载动画
        let that = this
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            if (!that.isLoading) {
                that.isLoading = true
                const file = resultFiles[0];
                            
                that.cos.sliceUploadFile({
                    Bucket: 'epic-1306658948', // 存储桶名称
                    Region: 'ap-chengdu', // 存储桶地域
                    Key: sessionStorage.getItem('user_email') + '/' + that.actNote.id + '/' + new Date().getSeconds(), // 文件名称
                    Body: resultFiles[0], // 文件
                }, 
                function (err, data) {
                    if(err) {
                        console.log(err);
                        that.isLoading = false
                        return;
                    }

                    insertImgFn('//'+ data.Location) // 插入返回的url地址
                    that.isLoading = false
                });        
            }
        };
        
        editor.create()
        // console.log(this.content)
        editor.txt.html(`${this.actNote.content}`)
        if(+this.actNote.id < 0) {
            console.log(this.actNote.id)
            this.actNote.id = +this.ID
        }
        // 获取原内容，之后进行比较，如果没有改动，那么就不需要保存
        this.originContent = this.actNote.content
    },
    activated(){},
    updated(){},
    methods:{
        back() {
            let dataJSON = JSON.stringify(this.actNote)
            // fs.writeFile(`@/notes/${this.actNote.title + this.actNote.id}.json`, dataJSON, (err) => {
            //    if(err) {
            //        console.warn('文件写入失败')
            //        console.warn(err)
            //     } else {
            //         alert('文件写入成功')
            //     }
            // })
            // 不能以数字开头啊
            this.content = editor.txt.html()
            // 原本的内容和该内容一样的话就不用保存了
            // console.log(this.content, this.conetnt == this.originContent)
            // console.log(this.originContent)
            if (this.content == this.originContent) {
                console.log('不需要保存')
                this.$emit('back')
                return
            }
            
            // let title = editor.txt.text().match((/^.*?\s/))[0] || '新建文件'
            let title = editor.txt.text().slice(0, 7)
            console.log(title)
            // if (title == '') { // 如果标题为空，那么说明没有有效内容，不进行保存
            //     this.$emit('back')
            //     return
            // }
            // debugger
            this.$axios.post('/back/set', JSON.stringify({
                "id":       this.actNote.id,
                "yb_userid": this.actNote.yb_userid,
                "title":    title,
                "content":  this.content
            })).then((res) => {
                console.log('成功接收到响应信息', res)
                this.$emit('back')
            }).catch((err) => {
                console.warn(err)
            })
        },
        // deleteFiles (marker, that) {
            
        // },
        del () {
            if(confirm("确定要删除这篇笔记吗")) {
                let that = this
                this.$axios.post(`/back/delete?id=${this.actNote.id}`, {
                    "id": this.actNote.id,
                    "userid": sessionStorage.getItem('user_email')
                }).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.warn(err)
                })
                // this.cos.deleteObject({
                //     Bucket: 'epic-1306658948', // 存储桶名称
                //     Region: 'ap-chengdu', // 存储桶地域
                //     Key: sessionStorage.getItem('user_email') + '/' + that.actNote.id 
                // }, function(err, data) {
                //     console.log(err || data);
                // })
                // this.deleteFiles (marker, that)
                // that.cos.getBucket({
                //     Bucket: 'epic-1306658948', /* 填入您自己的存储桶，必须字段 */
                //     Region: 'ap-chengdu',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                //     Prefix: sessionStorage.getItem('user_email') + '/' + that.actNote.id + '/',
                //     Marker: marker,
                //     MaxKeys: 1000,
                // }, function (listError, listResult) {
                //     if (listError) 
                //         return console.log('list error:', listError);
                //     var nextMarker = listResult.NextMarker;
                //     var objects = listResult.Contents.map(function (item) {
                //         return {Key: item.Key}
                //     });
                //     that.cos.deleteMultipleObject({
                //         Bucket: bucket,
                //         Region: region,
                //         Objects: objects,
                //     }, function (delError, deleteResult) {
                //         if (delError) {
                //             console.log('delete error', delError);
                //             console.log('delete stop');
                //         } else {
                //             console.log('delete result', deleteResult);
                //             if (listResult.IsTruncated === 'true') deleteFiles(nextMarker);
                //             else console.log('delete complete');
                //         }
                //     });
                // });
                this.$emit('back')
                this.$emit('del', this.actNote.id) 
            }
        },
        

    },
    computed:{},
    watch:{},
  }
</script>
<style scoped>
    .toolbar, .text {
        margin: 0;
        padding: 0;
        border: none;
    }
    .toolbar {
        /* border: 1px solid #ccc; */
    }
    .text {
        border: 1px solid #ccc;
        min-height: 400px;
        text-align: left;
        height: 90vh;
    }
    .delete,
    .back {
        width: 2rem;
        position:absolute;
        right: 1rem;
        top: 0.5rem;
        z-index:9999;
        font-weight: 800;
        color: #ff3700;
        cursor: pointer;
    }
    .back {
        left: 1rem;
        color:#000;
    }
</style>
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
// let canvasModule = require('@/tools/canvasModule.js')
let COS = require('cos-js-sdk-v5');
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
    },
    data(){
      return {
          originContent: '',
          isLoading: false,
          cos: new COS({
            SecretId: 'AKIDgBQTIn46rLZXEesviETR9alfJgmbATWJ',
            SecretKey: 'Xpqa3GCsHPHrACySfbHgofGadgSyDBsJ',
        })
      }
    },
    created(){},
    mounted(){
        // 扩展自定义按钮
        let that = this
        const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
        class WebInsertMenu extends BtnMenu {
            constructor(editor) {
                const $elem = E.$(
                    `<div class="w-e-menu" data-title="插入网页">
                        <button style="background: transparent;border:none;color:#aaa;font-weight:800;font-size:16px;">W</button>
                    </div>`
                )
                super($elem, editor)
            }
            // 菜单点击事件
            clickHandler() {
                // 做任何你想做的事情
                // 可参考【常用 API】文档，来操作编辑器
                let src = prompt('输入一个网页的链接')
                if (src.indexOf('seriocb.top') != -1)
                {
                    alert('禁止套娃')
                } else {
                    console.log(src, window, window.top)
                    editor.cmd.do('insertHTML', `<iframe src="${src}}" width="200%" height="100% max-height:70vh;min-height:30vh;" style="margin: 0 auto; overflow:scroll;">`)

                }
            }
        }
        // 手绘 // 很遗憾，canvas的内容难以保存..
        // class CanvasInsertMenu extends BtnMenu {
        //     constructor(editor) {
        //         const $elem = E.$(
        //             `<div class="w-e-menu" data-title="插入画布">
        //                 <button style="background: transparent;border:none;color:#aaa;font-weight:800;font-size:16px;">P</button>
        //             </div>`
        //         )
        //         super($elem, editor)
        //     }
        //     // 菜单点击事件
        //     clickHandler() {
        //         // 做任何你想做的事情
        //         let id = 'canvas' + new Date().getSeconds()
        //         console.log('拿到啦', that)
        //         // that.canvasInit(id)
        //         let time = setTimeout(() => {
        //             that.canvasInit(id)
        //             clearTimeout(time)
        //         }, 400)
        //         editor.cmd.do('insertHTML', `<canvas id="${id}" ref="${id}" width="360" height="400" style="border: 1px solid #aaa3;z-index=9999;"></canvas>`)

        //     }
        // }
        // 音频
        // class VoiceInsertMenu extends BtnMenu {
        //     constructor(editor) {
        //         const $elem = E.$(
        //             `<div class="w-e-menu" data-title="插入音频">
        //                 <button style="background: transparent;border:none;color:#aaa;font-weight:800;font-size:16px;">V</button>
        //             </div>`
        //         )
        //         super($elem, editor)
        //     }
        //     // 菜单点击事件
        //     clickHandler() {
        //         // 做任何你想做的事情
        //         let id = 'canvas' + sessionStorage.getItem('user_email') + new Date().getSeconds()
        //         editor.cmd.do('insertHTML', `<canvas id="${id}"></canvas>`)
        //         that.canvasInit(id)

        //     }
        // }
        const menuKey1 = 'WebInsertMenuKey' 
        // const menuKey2 = 'CanvasInsertMenuKey'
        E.registerMenu(menuKey1, WebInsertMenu)
        // E.registerMenu(menuKey2, CanvasInsertMenu)
        
        // 创建编辑器实例对象
        editor = new E('#toolbar-container', '#text-container')
        console.log(editor.config)
        // editor.config.height = 1000
        editor.config.zIndex = 100
        // editor.config.placeholder = '空空如也'
        // console.log('editor', editor)

        editor.config.excludeMenus = [
            'lineHeight',
            'list',
            'lineHeight',
            'italic',
            'code',
            'underline',
            'quote',
            'indent',
            'head',
            'splitLine',
            // 'redo',
            // 'undo'
        ]
        // editor.on('modalOrPanelShow', modalOrPanel => {
        //     if (modalOrPanel.type !== 'modal') return
        //     const { $elem } = modalOrPanel // modal element

        //     // 设置 modal 样式（定位、z-index）
        //     // 显示蒙层
        // })
        
        // that.isLoading = true
        console.log(that.isLoading)
        // 配置图片
        editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        editor.config.uploadImgMaxLength = 3 // 一次最多3张
        editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M

      
        // 配置视频
        editor.config.showLinkVideo = false
        editor.config.uploadVideoMaxSize = 200 * 1024 * 1024 // 200m
        
        // 上传图床,并且做了一点限制，有加载动画
        editor.config.customUploadVideo = editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            if (!that.isLoading) {
                that.isLoading = true
                console.log(this, that.isLoading, that)
                const file = resultFiles[0];
                            
                that.cos.sliceUploadFile({
                        Bucket: 'epic-1306658948', // 存储桶名称
                        Region: 'ap-chengdu', // 存储桶地域
                        Key: sessionStorage.getItem('user_email') + '/' + that.actNote.id + '/' + (new Date().getSeconds() % 50), // 文件名称
                        Body: resultFiles[0], // 文件
                    }, 
                    function (err, data) {
                        if (err) {
                            console.log(err);
                            that.isLoading = false
                            return;
                        } 

                        that.isLoading = false
                        // 这里顺序不能颠倒，因为下面这个函数可能是
                        insertImgFn('//'+ data.Location) // 插入返回的url地址
                    }
                )        
            }
        };
        // 配置表情包
        editor.config.emotions = [
            {
                title: '熊猫人', // tab 的标题
                type: 'image', // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
                content: [
                    { alt: '[再见]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/bye.jpg`, style:"width:50px;height:50px;" },
                    { alt: '[笑了]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/laugh_cry.jpg` },
                    { alt: '[妙啊]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/nice.jpg` },
                    { alt: '[无语]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/no_word.jpg` },
                    { alt: '[期待]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/expect.jpg` },
                    { alt: '[害怕]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/fear.jpg` },
                    { alt: '[优秀]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/excellent.jpg` },
                    { alt: '[对对对]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/right.jpg` },
                    { alt: '[错错错]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/wrong.jpg` },
                    { alt: '[有意思]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/interesting.gif` },
                    { alt: '[太强了]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/so_strong.jpg` },
                    { alt: '[震惊]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/shocked.jpg` },
                    { alt: '[无语]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/shit.png` },
                    { alt: '[滚]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/go_away.jpg` },
                    { alt: '[恰恰相反]', src: `https://epic-1306658948.cos.ap-chengdu.myqcloud.com/panda_head/reverse.jpg` },
                ]
            },
            {
                title: 'emoji',  // tab 的标题
                type: 'emoji', // 'emoji' / 'image'
                // emoji 表情，content 是一个数组即可
                content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐 😎 😍 🥰 🤑 😫 😴 🤤 😲 🥶 🥵 🤭'.split(/\s/),
            },
           
        ]   













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
            if (this.isLoading) {
                // 如果确定退出，那么继续走后面的流程
                if(confirm('现在退出文件上传会失败,确定要退出吗?')) {
                    this.isLoading = false
                // 取消退出则是保持状态
                } else {
                    return
                }
            }
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
                "content":  this.content,
                "public": false, // 后面改成false,
                "origin": true // 是否为原创 
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
        // 非常遗憾地失败了
        canvasInit: function (id) {
            let canvasEl = document.querySelector(`#${id}`)
            // let canvasEl = this.$refs[id]
            console.log('很奇怪是吧',canvasEl)
            // const pageWidth = '100vw'
            // document.documentElement.clientWidth;
            // const pageHeight = '50vh'
            // document.documentElement.clientHeight;
            // canvasEl.width = pageWidth;
            // canvasEl.height = pageHeight;
            // canvasEl.style.border='1px solid #aaa3'
            // debugger
            const ctx = canvasEl.getContext('2d')
            ctx.lineWidth = 4
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#F44336'
            // ctx.strokeRect(100, 100, 80, 80);
            const handleCopy = (t) => {
                return {
                    id: t.identifier,
                    x: t.clientX,
                    y: t.clientY
                }
            }
        
            // 触屏多点操作
            let touchArr = []
            // 当前绘制点
            let activeMouse = {}
        
            const handleFn = (m, cb) => {
                m.preventDefault();
                [...m.changedTouches].forEach(item => {
                    const current = touchArr.find(v => v.id === item.identifier)
                    if (current) {
                    ctx.beginPath()
                    ctx.moveTo(current.x, current.y)
                    ctx.lineTo(item.clientX, item.clientY)
                    ctx.stroke()
                    cb && cb(current, item)
                    }
                })
            }
        
            const touchStart = (m) => {
                m.preventDefault();
                [...m.changedTouches].forEach(item => {
                    touchArr.push(handleCopy(item))
                })
            }
        
            const touchMove = (m) => {
                m.preventDefault()
                const fn = (current, item) => touchArr.splice(touchArr.findIndex(v => v.id === current.id), 1, handleCopy(item))
                handleFn(m, fn)
            }
        
            const touchEnd = (m) => {
                m.preventDefault()
                const fn = (current) => touchArr.splice(touchArr.findIndex(v => v.id === current.id), 1)
                handleFn(m, fn)
            }
        
            const mouseStart = (e) => {
                e.preventDefault()
                activeMouse = { x: e.clientX, y: e.clientY }
            }
        
            const mouseMove = (e) => {
                e.preventDefault()
                if (!activeMouse.x || !activeMouse.y) return
                ctx.beginPath()
                ctx.moveTo(activeMouse.x, activeMouse.y)
                ctx.lineTo(e.clientX, e.clientY)
                ctx.stroke()
                activeMouse = { x: e.clientX, y: e.clientY }
            }
        
            const mouseEnd = (e) => {
                e.preventDefault()
                activeMouse = {}
            }
            

            canvasEl.addEventListener('touchstart', touchStart)
            canvasEl.addEventListener('touchmove', touchMove)
            canvasEl.addEventListener('touchend', touchEnd)
        
            canvasEl.addEventListener('mousedown', mouseStart)
            canvasEl.addEventListener('mousemove', mouseMove)
            canvasEl.addEventListener('mouseup', mouseEnd)
        }

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
        height: 100vh;
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
     /* 表情包 */
    
</style>
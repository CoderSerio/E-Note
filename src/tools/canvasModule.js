module.exports = {
    canvasInit: function (id) {
        let canvasEl = document.querySelector(`#${id}`)
        console.log(canvasEl)
        const pageWidth = '100vw'
        // document.documentElement.clientWidth;
        const pageHeight = '50vh'
        // document.documentElement.clientHeight;
        canvasEl.width = pageWidth;
        canvasEl.height = pageHeight;
        canvasEl.style.border='1px solid #aaa3'
    
        const ctx = canvasEl.getContext('2d')
        ctx.lineWidth = 4
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#F44336'
        ctx.strokeRect(100, 100, 80, 80);
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
}

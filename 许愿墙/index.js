;
(function () {
    var betterFunctions = {
        /**
         * 随机范围整数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         */
        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    var wishingWallConfig = {
        wrapDom: document.getElementById('container'),
        inpDom: document.getElementById('inp'),
        wishWidth: 220,
        wishHeight: 220,
        zIndex: 1
    }


    initWish();

    bindInputEvent();

    moveEvent();

    onResize();

    /**
     * 浏览器窗口发生时
     * 触发改变卡片位置。卡片距离左右/上下边界保持平衡距离
     */
    function onResize() {
        // 计算左边/右边比例值
        var cds = wishingWallConfig.wrapDom.children;
        for (var i = 0; i < cds.length; i++) {
            var child = cds[i];
            var style = getComputedStyle(child),
                left = parseFloat(style.left),
                top = parseFloat(style.top);
            var right = document.documentElement.clientWidth - left - wishingWallConfig.wishWidth,
                bottom = document.documentElement.clientHeight - top - wishingWallConfig.wishHeight - 50;
            var lvX = left / right,
                lvY = top / bottom;
            child.setAttribute('lv', JSON.stringify({
                lvX,
                lvY
            }))
        }
        window.onresize = function () {
            var cds = wishingWallConfig.wrapDom.children;
            for (var i = 0; i < cds.length; i++) {
                var child = cds[i];
                child.style.left = JSON.parse(child.getAttribute('lv')).lvX / (JSON.parse(child.getAttribute('lv')).lvX + 1) * document.documentElement.clientWidth + 'px';
                child.style.top = JSON.parse(child.getAttribute('lv')).lvY / (JSON.parse(child.getAttribute('lv')).lvY + 1) * (document.documentElement.clientHeight - 50) + 'px';
            }
        }
    }

    /**
     * 心愿移动
     */
    function moveEvent() {

        /**
         * 获取心愿卡片
         */
        function getCurrentTarget(dom) {
            if (dom.className === "wish") {
                return dom;
            } else if (dom.parentElement && dom.parentElement.className === "wish" && dom.tagName === "SPAN") {
                return dom.parentElement;
            }
        }

        /**
         * 心愿卡片move的绑定
         */
        document.onmousedown = function (e) {
            var targetDiv = getCurrentTarget(e.target);
            if (!targetDiv) {
                return
            }
            targetDiv.style.zIndex = ++wishingWallConfig.zIndex;
            var prevX = e.pageX,
                prevY = e.pageY;
            var style = getComputedStyle(e.target),
                left = parseFloat(style.left),
                top = parseFloat(style.top);
            document.onmousemove = function (e) {
                var disX = e.pageX - prevX,
                    disY = e.pageY - prevY;
                var newLeft = left + disX,
                    newTop = top + disY;
                if (newLeft < 0) {
                    newLeft = 0;
                }
                if (newTop < 0) {
                    newTop = 0;
                }
                if (newLeft > document.documentElement.clientWidth - wishingWallConfig.wishWidth) {
                    newLeft = document.documentElement.clientWidth - wishingWallConfig.wishWidth;
                }
                if (newTop > document.documentElement.clientHeight - wishingWallConfig.wishHeight - 50) {
                    newTop = document.documentElement.clientHeight - wishingWallConfig.wishHeight - 50;
                }

                targetDiv.style.left = newLeft + 'px';
                targetDiv.style.top = newTop + 'px';
            }

            document.onmouseup = function () {
                this.onmousemove = null;
            }
        }
    }

    /**
     * 绑定 input 添加心愿
     */
    function bindInputEvent() {
        wishingWallConfig.inpDom.onkeydown = function (e) {
            if (e.keyCode === 13) {
                var value = wishingWallConfig.inpDom.value;
                createOneWish(value);
            }
        }
    }

    /**
     * 创建一个愿望
     */
    function createOneWish(val) {
        var wish = document.createElement('div');
        var left = betterFunctions.getRandomNumber(0, document.documentElement.clientWidth - wishingWallConfig.wishWidth),
            top = betterFunctions.getRandomNumber(0, document.documentElement.clientHeight - wishingWallConfig.wishHeight - 50);
        wish.style.left = left + 'px';
        wish.style.top = top + 'px';
        wish.style.zIndex = ++wishingWallConfig.zIndex;
        wish.style.background = `rgba(${betterFunctions.getRandomNumber(100, 200)},${betterFunctions.getRandomNumber(100, 200)},${betterFunctions.getRandomNumber(100, 200)},${Math.random()+0.5})`
        wish.className = 'wish';
        wish.innerHTML = val;
        var span = document.createElement('span');
        span.innerHTML = '×';
        span.addEventListener('click', function () {
            this.parentNode.remove()
        })
        wish.appendChild(span);
        wishingWallConfig.wrapDom.appendChild(wish);
        wishingWallConfig.inpDom.value = "";

    };


    /**
     * 初始化愿望
     */
    function initWish() {
        var wishArr = ["喜欢你是快乐的", "互相喜欢更是难得的"];
        wishArr.forEach(item => {
            createOneWish(item);
        })
    }

}());
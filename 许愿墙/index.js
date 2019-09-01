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
        vWidth: document.documentElement.clientWidth,
        vHeight: document.documentElement.clientHeight,
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
        window.onresize = function () {
            var wDisW = document.documentElement.clientWidth - wishingWallConfig.vWidth,
                wDisH = document.documentElement.clientHeight - wishingWallConfig.vHeight;
            for (var i = 0; i < wishingWallConfig.wrapDom.children.length; i++) {
                var wishDom = wishingWallConfig.wrapDom.children[i];
                var left = parseFloat(wishDom.style.left),
                    right = document.documentElement.clientWidth - left - wishingWallConfig.wishWidth,
                    newLeft = left + left / (left + right) * wDisW;
                var top = parseFloat(wishDom.style.top),
                    bottom = document.documentElement.clientHeight - top - wishingWallConfig.wishHeight,
                    newTop = top + top / (top + bottom) * wDisH;

                wishDom.style.top = newTop + 'px';
                wishDom.style.left = newLeft + 'px';
            }
            wishingWallConfig.vWidth = document.documentElement.clientWidth;
            wishingWallConfig.vHeight = document.documentElement.clientHeight;
        }
    }

    /**
     * 心愿移动
     */
    function moveEvent() {

        /**
         * 获取心愿卡片节点
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
        var wishArr = ["喜欢你, 想让你知道", "知道喜欢你, 你也喜欢我", "我屮艸芔茻"];
        wishArr.forEach(item => {
            createOneWish(item);
        })
    }

}());
;
(function () {
    // 放大镜相关配置
    var config = {
        wrapDom: document.getElementById('magnifierWrap'),
        smallBgImg: './images/mouse.jpg',
        bigBgImg: './images/mouseBigSize.jpg',
        smallDivSize: {
            width: 350,
            height: 350
        },
        bigDivSize: {
            width: 540,
            height: 540
        },
        bigImgSize: {
            width: 800,
            height: 800
        }
    };
    config.smallDivDom = config.wrapDom.querySelector('.small');
    config.bigDivDom = config.wrapDom.querySelector('.big');
    config.moveDom = config.wrapDom.querySelector('.move');
    //  计算move层的大小: move/small = big/bigBg
    config.moveSize = {
        width: config.bigDivSize.width / config.bigImgSize.width * config.smallDivSize.width,
        height: config.bigDivSize.height / config.bigImgSize.height * config.smallDivSize.height
    };

    init();

    /**
     * 初始化函数
     */
    function init() {

        showBigDiv();
        initSmallDivBg();
        initMoveDiv();
        bindSmallDivEvent();

        /**
         * 绑定小块元素的事件
         */
        function bindSmallDivEvent() {
            config.smallDivDom.onmousemove = function (e) {
                var offset = getCurrentOffset(e);
                setPosition(offset);
            }


            /**
             * 根据鼠标位置设置move层的位置, 并根据 move 位置设置展示右侧大图部分区间
             * @param {Object} offset 鼠标位置对象
             */
            function setPosition(offset) {
                var top = offset.y - config.moveSize.height / 2,
                    left = offset.x - config.moveSize.width / 2;
                // 限定move层的left 和 top 最大值跟最小值
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0
                }
                if (top > config.smallDivSize.height - config.moveSize.height) {
                    top = config.smallDivSize.height - config.moveSize.height;
                }
                if (left > config.smallDivSize.width - config.moveSize.width) {
                    left = config.smallDivSize.width - config.moveSize.width;
                }

                // 1. 给左侧move层定位赋值
                config.moveDom.style.left = left + 'px';
                config.moveDom.style.top = top + 'px';

                // 2. 计算展示大图背景的定位值并设置大图背景展示
                left = config.bigImgSize.width * (left / config.smallDivSize.width);
                top = config.bigImgSize.height * (top / config.smallDivSize.height);
                setBigBackground(left, top);


                /**
                 * 设置右侧div展示部分大图
                 * @param {Number} left 背景图定位在x轴偏移量
                 * @param {Number} top 背景图定位在y周偏移量
                 */
                function setBigBackground(left, top) {
                    config.bigDivDom.style.background = `url("${config.bigBgImg}") no-repeat -${left}px -${top}px`;
                };
            }


            /**
             * 根据事件源对象, 计算当前鼠标位置
             * @param {MouseEvent} e
             */
            function getCurrentOffset(e) {
                if (e.target.className === 'small') { //  如果是small元素直接返回 事件源对象 offset 偏移量
                    return {
                        x: e.offsetX,
                        y: e.offsetY
                    }
                } else { //  如果在 move 层上返回 当前move的定位置值 + 事件源对象的 offset 偏移量
                    var style = getComputedStyle(e.target);
                    return {
                        x: parseFloat(style.left) + e.offsetX,
                        y: parseFloat(style.top) + e.offsetY
                    }
                }
            }
        }

        /**
         * 初始化移动层div
         */
        function initMoveDiv() {
            config.moveDom.style.width = config.moveSize.width + 'px';
            config.moveDom.style.height = config.moveSize.height + 'px';
        }

        /**
         * 初始化div背景
         */
        function initSmallDivBg() {
            config.smallDivDom.style.background = `url("${config.smallBgImg}") no-repeat left top/100% 100%`;
        }

        /**
         * 显示隐藏大的div背景
         */
        function showBigDiv() {
            config.smallDivDom.onmouseenter = function () {
                config.bigDivDom.style.display = 'block';
                config.moveDom.style.display = 'block';
            }
            config.smallDivDom.onmouseleave = function () {
                config.bigDivDom.style.display = 'none';
                config.moveDom.style.display = 'none';
            }
        }

    }

}());
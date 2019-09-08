;
(function () {

    var slideConfig = {
        slideDom: document.getElementById('slide'),
        imgsDom: document.querySelector('.imgs'),
        dotsDom: document.querySelector('.dots'),
        controlsDom: document.querySelector('.controls'),
        currentIndex: 0, //  初始化索引
        imgWidth: 520,
        imgHeight: 280,
        isLoop: true,
    };

    init();
    dotsEvent();

    /**
     * dots 事件
     */
    function dotsEvent() {
        slideConfig.dotsDom.onclick = function (e) {
            if (e.target.nodeName === 'SPAN') {
                var index = Array.from(slideConfig.dotsDom.children).indexOf(e.target);
                if (slideConfig.currentIndex !== index) {
                    slideConfig.currentIndex = index;
                    setCurrent()
                }
            }
        }

        /**
         * 设置轮播
         */
        function setCurrent() {
            // 设置 active
            slideConfig.dotsDom.querySelector('.active').classList.remove('active');
            slideConfig.dotsDom.children[slideConfig.currentIndex].classList.add('active');
            // 设置 margin
            slideConfig.imgsDom.style.marginLeft = -slideConfig.imgWidth * (!slideConfig.isLoop ? slideConfig.currentIndex : slideConfig.currentIndex + 1) + 'px';
        }
    }

    /**
     * 初始化
     */
    function init() {
        initSlide();


        /**
         * 初始化轮播项数据
         */
        function initSlide() {
            var imgsArr = ["images/1.jpg", "images/2.webp", "images/3.jpg", "images/4.jpg", "images/5.webp"];
            var fragImgs = document.createDocumentFragment(),
                fragDots = document.createDocumentFragment();
            for (var i = 0; i < imgsArr.length; i++) {
                var a = document.createElement('a');
                a.href = "#";
                var img = document.createElement('img');
                img.src = imgsArr[i];
                a.appendChild(img);
                var span = document.createElement('span');

                if (i === slideConfig.currentIndex) {
                    span.classList.add('active');
                    slideConfig.imgsDom.style.marginLeft = -i * slideConfig.imgWidth + 'px';
                    if (slideConfig.isLoop) {
                        slideConfig.imgsDom.style.marginLeft = -i * slideConfig.imgWidth - slideConfig.imgWidth + 'px';
                    }
                }

                fragDots.appendChild(span);
                fragImgs.appendChild(a);
            }
            slideConfig.imgsDom.appendChild(fragImgs);
            if (slideConfig.isLoop) {
                var first = document.createElement('a');
                first.href = "#";
                var img = document.createElement('img');
                img.src = imgsArr[imgsArr.length - 1];
                first.appendChild(img);
                slideConfig.imgsDom.insertBefore(first, slideConfig.imgsDom.children[0])
                var last = document.createElement('a');
                last.href = "#";
                var img = document.createElement('img');
                img.src = imgsArr[0];
                last.appendChild(img);
                slideConfig.imgsDom.appendChild(last)
            }
            slideConfig.dotsDom.appendChild(fragDots);
            slideConfig.imgsDom.style.width = !slideConfig.isLoop ? slideConfig.imgWidth * imgsArr.length : slideConfig.imgWidth * (imgsArr.length + 2) + 'px';

        }
    }



}());
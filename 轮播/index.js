// ;
// (function () {

var config = {
    slideDom: document.getElementById('slide'),
    imgsDom: document.querySelector('.imgs'),
    dotsDom: document.querySelector('.dots'),
    controlsDom: document.querySelector('.controls'),
    imgWidth: 520,
    imgHeight: 280,
    currentIndex: 2, //  初始化索引
    timer: {
        id: null,
        duration: 16,
        totalTime: 1000
    },
    imgsArr: ["images/1.jpg", "images/2.webp", "images/3.jpg", "images/4.jpg", "images/5.webp"],
};

init();

/**
 * dots 事件
 */
/* function dotsEvent() {
    config.dotsDom.onclick = function (e) {
        if (e.target.nodeName === 'SPAN') {
            var index = Array.from(config.dotsDom.children).indexOf(e.target);
            if (config.currentIndex !== index) {
                config.currentIndex = index;
                setCurrent()
            }
        }
    }
} */

/**
 * 初始化
 */
function init() {
    initImgs();
    initDots();
}


/**
 * 切换轮播
 */
function switchTo(index, duration = 'right') {
    if (config.currentIndex === index) return;
    config.currentIndex = index;

    //  目标位置
    var newLeft = -(config.currentIndex + 1) * config.imgWidth;

    //  轮播切换动画
    animate()

    //  dot状态改变
    setDotStatus();

    /**
     * 切换动画
     */
    function animate() {
        //  动画执行总次数
        var currentNumber = 0,
            number = Math.ceil(config.timer.totalTime / config.timer.duration),
            distance,
            totalWidth = config.imgsArr.length * config.imgWidth;
        //  计算总距离
        var marginLeft = parseFloat(getComputedStyle(config.imgsDom).marginLeft);
        if (duration === "right") {
            if (newLeft < marginLeft) {
                distance = newLeft - marginLeft;
            } else {
                distance = -(totalWidth - Math.abs(newLeft - marginLeft));
            }
        } else {
            if (newLeft > marginLeft) {
                distance = marginLeft - newLeft;
            } else {
                distance = totalWidth - Math.abs(newLeft - marginLeft);
            }
        }
        console.log(distance)


        config.timer.id = setInterval(function () {
            stopAnimate();

            


            currentNumber++;
            if (currentNumber === number) {
                stopAnimate();
            }

        }, config.timer.duration)
    }

    /**
     * 停止动画
     */
    function stopAnimate() {
        clearInterval(config.timer.id);
        config.timer.id = null;
    }
}

/**
 * 设置dots状态
 */
function setDotStatus() {
    for (var i = 0; i < config.dotsDom.children.length; i++) {
        if (i === config.currentIndex) {
            config.dotsDom.children[i].className = 'active';
        } else {
            config.dotsDom.children[i].className = '';
        }
    }
}

/**
 * 初始化 dots
 */
function initDots() {
    var fragDots = document.createDocumentFragment();
    for (var i = 0; i < config.imgsArr.length; i++) {
        var span = document.createElement('span');
        fragDots.appendChild(span);
    }
    config.dotsDom.appendChild(fragDots);
    setDotStatus();
};

/**
 * 初始化 imgs
 */
function initImgs() {
    var fragImgs = document.createDocumentFragment();
    for (var i = 0; i < config.imgsArr.length; i++) {
        var a = document.createElement('a');
        a.href = "#";
        var img = document.createElement('img');
        img.src = config.imgsArr[i];
        a.appendChild(img);
        fragImgs.appendChild(a);
    }
    config.imgsDom.appendChild(fragImgs);
    var children = config.imgsDom.children;
    var first = children[children.length - 1].cloneNode(true);
    config.imgsDom.insertBefore(first, config.imgsDom.children[0]);
    var last = children[1].cloneNode(true);
    config.imgsDom.appendChild(last);
    config.imgsDom.style.width = config.imgWidth * (config.imgsArr.length + 2) + 'px';
    config.imgsDom.style.marginLeft = -config.imgWidth * (config.currentIndex + 1) + 'px';
}



// }());
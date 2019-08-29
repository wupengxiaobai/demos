var lrc = `[00:01.06]难念的经
[00:03.95]演唱：周华健
[00:06.78]
[00:30.96]笑你我枉花光心计
[00:34.15]爱竞逐镜花那美丽
[00:36.75]怕幸运会转眼远逝
[00:39.32]为贪嗔喜恶怒着迷
[00:41.99]责你我太贪功恋势
[00:44.48]怪大地众生太美丽
[00:47.00]悔旧日太执信约誓
[00:49.66]为悲欢哀怨妒着迷
[00:52.56]啊 舍不得璀灿俗世
[00:57.66]啊 躲不开痴恋的欣慰
[01:02.86]啊 找不到色相代替
[01:08.09]啊 参一生参不透这条难题
[01:13.15]吞风吻雨葬落日未曾彷徨
[01:15.73]欺山赶海践雪径也未绝望
[01:18.23]拈花把酒偏折煞世人情狂
[01:20.90]凭这两眼与百臂或千手不能防
[01:23.76]天阔阔雪漫漫共谁同航
[01:26.09]这沙滚滚水皱皱笑着浪荡
[01:28.68]贪欢一刻偏教那女儿情长埋葬
[01:32.38]
[01:34.09]吞风吻雨葬落日未曾彷徨
[01:36.50]欺山赶海践雪径也未绝望
[01:39.07]拈花把酒偏折煞世人情狂
[01:41.69]凭这两眼与百臂或千手不能防
[01:44.68]天阔阔雪漫漫共谁同航
[01:46.93]这沙滚滚水皱皱笑着浪荡
[01:49.54]贪欢一刻偏教那女儿情长埋葬
[01:53.41]
[02:15.45]笑你我枉花光心计
[02:18.53]爱竞逐镜花那美丽
[02:21.14]怕幸运会转眼远逝
[02:23.76]为贪嗔喜恶怒着迷
[02:26.43]责你我太贪功恋势
[02:28.98]怪大地众生太美丽
[02:31.60]悔旧日太执信约誓
[02:34.26]为悲欢哀怨妒着迷
[02:36.90]啊 舍不得璀灿俗世
[02:42.04]啊 躲不开痴恋的欣慰
[02:47.34]啊 找不到色相代替
[02:52.52]啊 参一生参不透这条难题
[02:57.47]吞风吻雨葬落日未曾彷徨
[03:00.05]欺山赶海践雪径也未绝望
[03:02.64]拈花把酒偏折煞世人情狂
[03:05.27]凭这两眼与百臂或千手不能防
[03:08.22]天阔阔雪漫漫共谁同航
[03:10.49]这沙滚滚水皱皱笑着浪荡
[03:13.06]贪欢一刻偏教那女儿情长埋葬
[03:18.45]吞风吻雨葬落日未曾彷徨
[03:20.90]欺山赶海践雪径也未绝望
[03:23.54]拈花把酒偏折煞世人情狂
[03:26.21]凭这两眼与百臂或千手不能防
[03:29.07]天阔阔雪漫漫共谁同航
[03:31.32]这沙滚滚水皱皱笑着浪荡
[03:33.92]贪欢一刻偏教那女儿情长埋葬
[03:39.32]吞风吻雨葬落日未曾彷徨
[03:41.84]欺山赶海践雪径也未绝望
[03:44.38]拈花把酒偏折煞世人情狂
[03:47.04]凭这两眼与百臂或千手不能防
[03:49.99]天阔阔雪漫漫共谁同航
[03:52.20]这沙滚滚水皱皱笑着浪荡
[03:54.89]贪欢一刻偏教那女儿情长埋葬
[04:00.28]吞风吻雨葬落日未曾彷徨
[04:02.68]欺山赶海践雪径也未绝望
[04:05.25]拈花把酒偏折煞世人情狂
[04:07.90]凭这两眼与百臂或千手不能防
[04:10.85]天阔阔雪漫漫共谁同航
[04:13.08]这沙滚滚水皱皱笑着浪荡
[04:15.75]贪欢一刻偏教那女儿情长埋葬
[04:19.48] O(∩_∩)O 结束了`;

var ul = document.getElementById('ullrc'); //  歌词包裹元素
var audio = document.getElementById('ad'); //   获取audio元素

var config = {
    lrcContainerHeight: 600, //歌词容器高度
    liHeight: 35, //li的高度
    offset: 0.8, //修正值，播放时间会加上该值，然后进行比较
}

ul.style.marginTop = config.lrcContainerHeight / 2 + 'px';

//  第一步: 得到歌词对象数组
var lrcArray = createLrcArray();
//  第二步: 创建li
createLiAndAppendToUl();
//  第三步: 根据播放位置设置ul和li样式
audio.ontimeupdate = function () {
    lyricHightAndMiddle();
}

/**
 * 创建歌词li, 放到歌词容器ul中
 */
function createLiAndAppendToUl() {
    var domFrag = document.createDocumentFragment();
    for (var i = 0; i < lrcArray.length; i++) {
        var li = document.createElement('li');
        li.innerText = lrcArray[i].lyric;
        domFrag.appendChild(li);
    }
    ul.appendChild(domFrag);
}

/**
 * 当前歌词高亮, 当前歌词滚动位置(始终保持中间是高亮的)
 * 1. 高亮 li 添加 active
 * 2. 滚动位置 marin 值为负数 
 */
function lyricHightAndMiddle() {
    var index = getCurrentIndexOfLrcArray();
    // console.log('index---', index, '歌词是：', lrcArray[index])
    if (index < 0) {
        index = 0
    }
    //  1.高亮索引
    var prevHightDom = ul.querySelector('.active');
    prevHightDom && prevHightDom.classList.remove('active');
    ul.children[index] && ul.children[index].classList.add('active');
    //  2.margin赋值
    ul.style.marginTop = config.lrcContainerHeight / 2 - config.liHeight / 2 - index * config.liHeight + 'px';

    /**
     * 获取当前播放位置歌词在歌词数组中索引
     */
    function getCurrentIndexOfLrcArray() {
        // 获取 audio 播放时间, 0秒为 undefined,    offset 为偏移量
        var currentTime = audio.currentTime + config.offset,
            index;
        for (var i = lrcArray.length; i >= 0; i--) {
            if (lrcArray[i] && lrcArray[i].time <= currentTime) {
                index = i;
                break;
            }
        }
        //  考虑当前时间为 0 时
        if (currentTime === 0) {
            index = -1
        }
        return index
    }
}


/**
 * 根据歌词文件处理成希望的数组对象
 * [{ time:30.4秒, lyric:'拈花把酒偏折煞世人情狂' }]
 */
function createLrcArray() {
    var tempArr = lrc.split('\n');
    var tempArr2 = [];
    for (var key in tempArr) {
        var item = tempArr[key].split(']');
        var time = item[0].split(':')
        tempArr2.push({
            time: parseInt(time[0].substr(1)) * 60 + parseFloat(time[1]),
            lyric: item[1]
        })
    }
    return tempArr2;
}
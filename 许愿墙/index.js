;
(function () {
    var wishingWallConfig = {
        wrapDom: document.getElementById('container')
    }

    initWish();

    AddWishOfInp();

    /**
     * input 许愿
     */
    function AddWishOfInp() {}


    /**
     * 创建一个愿望
     */
    function createOneWish(

    );


    /**
     * 初始化愿望
     */
    function initWish() {}
}());

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
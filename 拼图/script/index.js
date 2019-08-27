// 游戏配置对象
var gameConfig = {
    width: 500,
    height: 500,
    rows: 3,
    cols: 3,
    imgUrl: './img/lol.png',
    isOver: false,
    dom: document.getElementById('game')
}

gameConfig.blockWidth = gameConfig.width / gameConfig.cols;
gameConfig.blockHeight = gameConfig.height / gameConfig.rows;
gameConfig.length = gameConfig.rows * gameConfig.cols;

var blocks = []; //  保存小块的数组

// 生成小块的构造函数
function Bock(left, top, isVisitable) {
    this.left = left; //  小块当前的left
    this.top = top; //  小块当前的top
    this.correctLeft = left; //  小块正确的left
    this.correctTop = top; //  小块正确的top
    this.width = gameConfig.width / gameConfig.cols;
    this.height = gameConfig.height / gameConfig.rows;
    this.dom = document.createElement('div');
    this.isVisitable = isVisitable;

    this.dom.style.position = 'absolute';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.border = '1px solid #fff';
    this.dom.style.boxSizing = 'border-box';
    this.dom.style.transition = '.15s linear';
    !isVisitable && (this.dom.style.display = "none");
    this.dom.style.background = `url('${gameConfig.imgUrl}') -${this.correctLeft}px -${this.correctTop}px`;

    this.show = function () {
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    gameConfig.dom.appendChild(this.dom)
    this.show()

}

function init() {
    // 1.初始化容器面板
    initWrapDom();

    // 2.初始化小块
    // 2.1 使用一个数组来装小块的属性 
    initBlocksArray();
    // 2.2 初始打乱数组中的left和top值
    initShuffle()

    // 3 事件绑定
    bindEvent()


    function gameWin() {
        var winBlocks = blocks.filter(item => item.left === item.correctLeft && item.top === item.correctTop);
        if (winBlocks.length === gameConfig.length) {
            // 胜利游戏结束
            gameConfig.isOver = true;
            blocks.forEach(item => {
                item.dom.style.display = 'block';
                item.dom.style.border = 'none';
            })
            console.log('恭喜完成拼图')
        }
    }


    function bindEvent() {
        var visitableBlock = blocks.find(item => !item.isVisitable);

        // 一个坑: 循环绑定事件
        for (var i = 0; i < blocks.length - 1; i++) {
            blocks[i].dom.onclick = (function (i) {
                return function () {
                    if (gameConfig.isOver) {
                        return;
                    }
                    // 条件: 只有在相邻的情况下才可以交换位置
                    if ((visitableBlock.left === blocks[i].left && tackIntegral(Math.abs(visitableBlock.top - blocks[i].top), gameConfig.blockHeight)) || (visitableBlock.top === blocks[i].top && tackIntegral(Math.abs(visitableBlock.left - blocks[i].left), gameConfig.blockWidth))) {
                        // 交换白底块(最后一块)跟当前块的left和top位置
                        transposition(visitableBlock, blocks[i]);
                        // 判断是否完成拼图
                        gameWin();
                    }

                    /* transposition(visitableBlock, blocks[i]);
                    gameWin(); */
                    
                }
            })(i);
        }
    }


    function initShuffle() {
        for (var i = 0; i < blocks.length - 2; i++) {
            //  取出一位， 再随机取出一位， 交换left 和 top值
            var index = randomNum(0, blocks.length - 2);
            // 交换left, 交换 top
            transposition(blocks[i], blocks[index]);

            /* var temp = blocks[i].left;
            blocks[i].left = blocks[index].left;
            blocks[index].left = temp;
            temp = blocks[i].top;
            blocks[i].top = blocks[index].top;
            blocks[index].top = temp; */
        }

        /* for (var i = 0; i < blocks.length - 1; i++) {
            blocks[i].show()
        } */

        // console.log(blocks)
    }


    function initBlocksArray() {
        for (var i = 0; i < gameConfig.rows; i++) {
            for (var j = 0; j < gameConfig.cols; j++) {
                var isVisitable = true;
                if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                    isVisitable = false;
                }
                blocks.push(new Bock(j * gameConfig.blockWidth, i * gameConfig.blockHeight, isVisitable))
            }
        }
    };


    function initWrapDom() {
        gameConfig.dom.style.width = gameConfig.width + 'px';
        gameConfig.dom.style.height = gameConfig.height + 'px';
        gameConfig.dom.style.border = '2px solid #eee';
        gameConfig.dom.style.position = 'relative';
    }


    /**
     * 交换a和b的left 和 top值
     * @param {*} a 
     * @param {*} b 
     */
    function transposition(a, b) {
        var temp = a.left;
        a.left = b.left;
        b.left = temp;
        temp = a.top;
        a.top = b.top;
        b.top = temp;

        a.show();
        b.show();
    }

    // 取整对比
    function tackIntegral(n1, n2) {
        return parseInt(n1) === parseInt(n2);
    }
}

// 游戏初始化
init();

/**
 * 获取范围内随机整数
 * @param {*} min 
 * @param {*} max 
 */
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
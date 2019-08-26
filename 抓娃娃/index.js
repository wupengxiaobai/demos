var toysArr = []; //  娃娃管理的数组
var toysWrap = document.getElementById('toys')

var config = {
    toyWidth: 200, //  娃娃的宽度
    toysWrapWidth: 470, //  娃娃外包容器宽度
};

//  创建一个娃娃
function createToy(left) {
    var timer;
    var dis = 1.5;
    var toy = {
        left: left,
        dom: document.createElement('div'),
        // 设置娃娃位置
        show: function () {
            this.dom.style.left = this.left + 'px';
        },
        // 哇哇停止移动
        stop: function () {
            clearInterval(timer)
        },
        // 娃娃自动移动
        autoMove: function () {
            this.stop()
            timer = setInterval(function () {
                toy.left += dis;
                toy.show()

                //  娃娃超出移动范围移除
                if (toy.left >= config.toysWrapWidth) {
                    toy.remove();
                }
            }, 10)
        },
        // 移除娃娃
        remove: function () {
            // 清除dom，停止定时，处理哇哇管理数组
            this.stop();
            this.dom.remove();
            /* var index = toysArr.indexOf(this)
            toysArr.splice(index, 1); */
            toysArr.shift()

            // 移除完毕：重新添加娃娃到末尾
            var left = toysArr[toysArr.length - 1].left - config.toyWidth;
            createToy(left)
        },
        // 判断该哇哇是否可以被抓取
        isCanClaw() {
            if (this.left >= 110 && this.left <= 140) {
                return true;
            }
            return false;
        },
        //  哇哇被抓取垂直方向移动
        doUp: function () {
            this.stop();
            this.dom.style.bottom = '245px';
            // 一秒后移除娃娃
            setTimeout(() => {
                toy.remove();
            }, 1000);
        }
    };

    // 娃娃显示
    toy.show();
    // 娃娃自动移动
    toy.autoMove();
    toysArr.push(toy);
    toysWrap.appendChild(toy.dom);
    return toy;
}

// 创建多个娃娃
function createToys() {
    var length = 5;
    for (var i = 0; i < length; i++) {
        var left = (i + 1) * (-config.toyWidth);
        createToy(left)
    }
}

createToys()

// 创建一个钩子
var claw = {
    dom: document.getElementById('claw'),
    // 钩子移动, 执行抓一次娃娃
    move: function () {
        flag = true;
        this.dom.style.height = '350px';

        setTimeout(function () {
            claw.dom.classList.remove('open');
            claw.dom.style.height = '80px';
            // 抓到哇哇
            claw.clawToy()

            setTimeout(function () {
                claw.dom.classList.add('open');
                flag = false;
            }, 1000)
        }, 1000)
    },
    // 抓到娃娃
    clawToy() {
        for (var i = 0; i < toysArr.length; i++) {
            var toy = toysArr[i];
            if (toy.isCanClaw()) {
                toy.doUp();
            }
        }
    }
}


// 给按钮添加抓取事件
var flag = false;
var btn = document.getElementById('button');
btn.onclick = function () {
    this.classList.add('down')
    if (flag) return;
    claw.move();
    setTimeout(function () {
        btn.classList.remove('down')
    }, 1000)
}
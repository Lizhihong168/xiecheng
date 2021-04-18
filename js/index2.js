window.addEventListener('load', function() {
    //实现自动轮播功能
    let index = 0;
    let focus = document.querySelector('.focus');
    let focusW = focus.offsetWidth;
    ul = focus.querySelector('ul');
    let ol = focus.querySelector('ol');
    let timer = setInterval(function() {
        index++;
        ul.style.transform = 'translateX(' + -index * focusW + 'px)';
        ul.style.transition = 'all .3s';
    }, 1000);
    //当播放完一张图片时触发 transitionend 事件
    ul.addEventListener('transitionend', function() {
        //实现图片的无缝轮播
        if (index >= ul.children.length - 2) {
            index = 0;
            ul.style.transform = 'translateX(' + -index * focusW + 'px)';
            ul.style.transition = 'none';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            let translateX = -index * focusW;
            ul.style.transform = 'translateX(' + translateX + ')'
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    //手指滑动实现图片的轮播
    let startX = 0;
    let moveX = 0;
    let flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        let translateX = -index * focusW + moveX;
        ul.style.transform = 'translateX(' + translateX + 'px)';
        ul.style.transition = 'none';
        flag = true;
        e.preventDefault(); // 阻止滚动屏幕的行为
    });
    //手指离开时根据距离判断是回弹还是播放上一张或者是下一张
    ul.addEventListener('touchend', function() {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    //播放上一张
                    index--
                } else {
                    //播放下一张
                    index++;
                };
                let translateX = -index * focusW;
                ul.style.transform = 'translateX(' + translateX + 'px)';
                ul.style.transition = 'all .3s';
            } else {
                //距离小于 50px 回弹
                let translateX = -index * focusW;
                ul.style.transform = 'translateX(' + translateX + 'px)';
                ul.style.transition = 'all .3s';
            };
        }
        //手指离开时从新开启定时器
        timer = setInterval(function() {
            index++;
            ul.style.transform = 'translateX(' + -index * focusW + 'px)';
            ul.style.transition = 'all .3s';
        }, 1000);
    })
})
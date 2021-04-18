window.addEventListener('load', function() {
    //自动轮播
    let index = 0;
    let _index = 0;
    let focus = document.querySelector('.focus');
    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('ol');
    let timer = setInterval(function() {
        if (index >= ul.children.length - 2) {
            index = 0;
            ul.style.transform = 'translateX(' + -index * focus.offsetWidth + 'px)';
            ul.style.transition = 'none';
        }
        index++;
        // ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + -index * focus.offsetWidth + 'px)';
        ul.style.transition = 'all .3s';
        _index++;
        if (_index >= 3) {
            _index = 0;
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[_index].classList.add('current');
    }, 1000);
    //手指滑动轮播
    let startX = 0;
    let moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        // console.log(e);
        clearInterval(timer);
        startX = e.touches[0].pageX;
        x = this.offsetLeft;
    });
    ul.addEventListener('touchmove', function(e) {
        // console.log(e);
        moveX = e.targetTouches[0].pageX - startX;
        let translateX = moveX - index * focus.offsetWidth;
        ul.style.transform = 'translateX(' + translateX + 'px)';
        ul.style.transition = 'none';
        e.preventDefault();
    });
    //手指离开根据移动距离判断回弹是播放上一张还是下一张
    ul.addEventListener('touchend', function() {
        if (Math.abs(moveX) > 50) {

            if (moveX > 0) {
                //播放上一张
                index--;
            } else {
                //播放下一张
                index--;
            };
            let translatex = -index * focus.offsetWidth;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';

        } else {
            let translateX = -index * focus.offsetWidth;
            ul.style.transform = 'translateX(' + translateX + 'px)';
            ul.style.transition = 'all .1s';

        };

    })
})
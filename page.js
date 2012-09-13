/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 12-9-11
 * Time: 上午11:21
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function (){

    var pages = $('#article');
    var a = document.getElementById("article").style;
    pages.currentIndex=0;
    var moveX = 0;
    $('#viewWebkit').on(
        'touchstart touchmove touchend',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.type == 'touchstart') {
                pages.moveX = 0;
                pages.velocity = 0;
                pages.lastX = e.originalEvent.targetTouches[0].pageX;
                pages.touchId=e.originalEvent.targetTouches[0].identifier;
            }
            if (e.type == 'touchmove') {
                pages.velocity = e.originalEvent.targetTouches[0].pageX
                    - pages.lastX;
                pages.moveX += e.originalEvent.targetTouches[0].pageX
                    - pages.lastX;
                moveX+= e.originalEvent.targetTouches[0].pageX
                    - pages.lastX;
                pages.css({
                    '-wbkit-transform-style':'preserve-3d'
                });
                pages.lastX = e.originalEvent.targetTouches[0].pageX;
            }
            if (e.type == 'touchend') {
                if (Math.abs(pages.moveX) > 1024 / 3 || Math.abs(pages.velocity)>2) {
                    if (pages.moveX < 0) {
                        console.log($('#article').width());
//                        setTimeout('funA()', 10);
                        pages.currentIndex++;
                    } else {
                        if (pages.currentIndex > 0) {
                            pages.currentIndex--;
                        }
                    }
                } else {
                    if (pages.currentIndex > 0) {
                        pages.currentIndex--;
                    }
                }
                moveX =1024 * -(pages.currentIndex);
                pages.css(
                    {
                        '-webkit-transform' : 'translate3d(' + moveX
                            + 'px,0px,0)',
                        '-webkit-transition-duration' : '0.5s'
                    });
            }

        });
    pages.on('webkitTransitionEnd', function(e) {
        pages.css({
            '-webkit-transition-duration' : '0s'
        });
    });


});

//function funA(){
//    console.log($('#article').width());
//}
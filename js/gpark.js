/**
 * Created by SIRMly on 2016/10/12.
 */
$(document).ready(function () {
    var clickEvent = 'ontouchstart' in document.documentElement ? "touchstart" : "click";
    var click = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    var CONST_CHANCES = 1;
    var award_status = 0;//
    var person_lives = CONST_CHANCES;//
    var recordid = null;//
    var isAward = false;
    // begenning
    page1Load();

    preloadImg();
    /*=== preload ===*/
    //图片预加载
    function preloadImg() {
        var percent = 0;//显示百分比
        var loadedimg = 0;//已加载图片数量
        var images = new Array();

        function preload() {
            //预加载图片总数
            var n = preload.arguments.length;
            for (i = 0; i < preload.arguments.length; i++) {
                images[i] = new Image();
                images[i].src = preload.arguments[i];
                images[i].onload = function () {//每张图片加载成功后执行
                    loadedimg++;
                    percent = Math.round(loadedimg / n * 100);
                    // console.log(percent);
                    if (percent == 100) {//全部加载完成后执行

                    }
                };
            }
            ;
        };
        preload(
            "img/pagem2-pipe2.png",
            "img/pagem2-longpipe.png",
            "img/pagem2-red.png",
            "img/pagem2-clamp.png",
            "img/page2_up_click.png",
            "img/page2_left_click.png",
            "img/page2_down_click.png",
            "img/page2_right_click.png",
            "img/page2_big.png",
            "img/page2_big_b.png",
            "img/page2_big_click.png",
            "img/page2_up_b.png",
            "img/page2_down_b.png",
            "img/page2_right_b.png",
            "img/page2_left_b.png",
            "img/page3_success_submit_bg.png",
            "img/page3_mingtian.png",
            "img/btn_bg.png",
            "img/page3_get_help.png",
            "img/page3_success.png",
            "img/page3_award2.png",
            "img/page3_success_submit.png",
            "img/page3_get.png"
            // "img/result_fail_word.png",
            // "img/result_fail_btn.png",
            // "img/page3_fail_m.png"
        )
    }

    /*=== page1 ===*/
    function page1Load() {
        $('.music_switch').addClass('music_play');
        document.getElementById('bgm').volume = 0.4;
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                setTimeout(function (){
                    document.getElementById('bgm').play();
                    document.getElementById('bgm').volume = 0.4;
                    $('.music_switch').addClass('music_play');
                },0)
            });
        }, false);

        var $page1 = $('#page1');
        var bgm = document.querySelector('#bgm');

        var dead = CONST_CHANCES > 5 ? 0 : 5 - CONST_CHANCES;

        // music switch
        $('.music_switch').on(clickEvent, function () {
            if ($('.music_switch').hasClass('music_play')) {
                bgm.pause();
                $('.music_switch').removeClass('music_play');
            } else {
                bgm.play();
                $('.music_switch').addClass('music_play');
            }
        });


        for (var i = 0; i < dead; i++) {
            $('.page1-live').eq(i).addClass('page1-dead');
        }

        $('#button-begin').on('touchstart', function () {
            $('#button-begin').css('height', '22.6vw');
            document.getElementById('m_btn_big').play();
            if (!CONST_CHANCES) {
                // 0次机会
                $('.pagem2-difficult').removeClass('hide');
                slideOut($page1);
                slideIn($('#page2'));
                $('#page3-fail').show();
                setTimeout(function () {
                    slideOut($('#page2'));
                    page3Load();
                }, 2000);
            } else {
                // 正常机会
                slideOut($page1);
                page2Load();
            }
        });
    }

    /*
     * =====================================
     * =========== page2 ===================
     * =====================================
     */

    function page2Load() {
        var $page2 = $('#page2');
        $('.pagem2-difficult').removeClass('hide');
        slideIn($('#page2'));

        setTimeout(function () {
            $('.pagem2-directions i').addClass('pagem2-dire-blin');
            $('.pagem2-btn').addClass('pagem2-dire-blin');
        }, 2300);

        var buildingArr1 = [
            [81, 80, 91, 92],
            [41, 40, 50, 51],
            [0, 1],
            [85, 84, 94, 95],
            [10, 33, 42, 53, 54, 65],
            [12, 2],
            [34, 35, 46, 45, 57, 58, 68],
            [6, 16, 17, 26],
            [37, 38, 49, 59],
            [8, 9, 19, 29]
        ];
        var buildingArr2 = [
            [111],
            [111],
            [111],
            [111],
            [111],
            [111],
            [111],
            [111],
            [111],
            [111]
        ];
        /*没得奖*/
        var buildingArr = buildingArr1;
        /*已得过奖*/
        var CONST_AWARD = false, CONST_NO_AWARD = false;
        if (CONST_AWARD || isAward || CONST_NO_AWARD) {
            buildingArr = buildingArr2;
        }

        var arr = [];
        var x = 4, y = 4;
        /*10*10数组*/
        for (var i = 0; i < 10; i++) {
            arr[i] = [];
            for (var j = 0; j < 10; j++) {
                arr[i][j] = [];
            }
        }
        ;
        /*100个块的坐标及编号*/
        var count = 0;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                arr[i][j][0] = 0.424 - i * 0.04 + j * 0.04;
                arr[i][j][1] = -0.536 + i * 0.0175 + j * 0.0175;
                arr[i][j][2] = count;
                count++;
            }
        }

        var winW = $(".pagem-1").width();
        var winH = $(".pagem-1").height();
        var leftMin = winW * 0.072;
        var leftMax = winW * 0.78;

        var left, top;
        $(".right").off().on(click, function () {
            document.getElementById('m_btn_mini').play();
            no_blin();
            if (y < 9) {
                y += 1;
                pipe_move();
            }
        });
        $(".left").off().on(click, function () {
            document.getElementById('m_btn_mini').play();
            no_blin();
            if (y > 0) {
                y -= 1;
                pipe_move();
            }
        });
        $(".up").off().on(click, function () {
            document.getElementById('m_btn_mini').play();
            no_blin();
            if (x > 0) {
                x -= 1;
                pipe_move();
            }
        });
        $(".down").off().on(click, function () {
            document.getElementById('m_btn_mini').play();
            no_blin();
            if (x < 9) {
                x += 1;
                pipe_move();
            }
        });
        function pipe_move() {
            no_blin();
            $(".pagem2-difficult").animate({
                "left": arr[x][y][0] * winW + "px",
                "top": arr[x][y][1] * winW + "px"
            }, 50)
        }

        function no_blin() {
            $(".pagem2-direction").removeClass("pagem2-dire-blin");
        }

        /*开始抓*/
        $(".pagem2-btn").off().on(click, function () {
            document.getElementById('m_btn_big').play();
            document.getElementById('m_arm').play();
            $(".pagem2-direction").off(click);
            $(this).off(click);

            var buildingNum;
            var reward = false;
            for (var m = 0; m < 10; m++) {
                for (var n = 0; n < buildingArr[m].length; n++) {
                    if (buildingArr[m][n] == arr[x][y][2]) {
                        reward = true;
                        console.log(m);
                        buildingNum = m + 1;
                        break;
                    }
                }
            }
            ;
            do_clamp();
            function do_clamp() {
                var buildT = parseInt($(".pagem2-building").eq(buildingNum).css("top"));
                var buildTA = buildT + (winH - winW * 0.82)
                var pipeHH = buildTA - (0.8 + arr[x][y][1]) * winW - 0.01 * winW;
                //console.log(buildTA+"+"+ (0.8 + arr[x][y][1]) * winW + "+" +  0.01 * winW);
                $(".pagem2-long-wrapper").height(pipeHH);
                var clamp_move;
                var clampPo = 0;
                if (reward) {
                    console.log('中！');
                    //$.ajax({
                    //    url: 'http://m.fun-x.cn/gpark/request.php',
                    //    type: 'post',
                    //    data: {
                    //        type: 'choujiang',
                    //        award: 'award'
                    //    },
                    //    dataType: 'json',
                    //    success: function (res) {
                    //        if (res.code = 'success') {
                    //            $('#page3-success').show();
                    //            $('#page3-get').hide();
                    //            $('#page3-fail').hide();
                    //            recordid = res.data.recordid;
                    //            person_lives = res.data.count;
                    //            award_status = res.data.giftid;
                    //        }
                    //    },
                    //    error: function (res) {
                    //        // alert('网络连接错误！');
                    //    }
                    //});
                    setTimeout(function () {
                        clamp_move = setInterval(function () {
                            $(".pagem2-clamp").css("background-position", clampPo + "% 0");
                            clampPo += 33.3;
                            if (clampPo > 70) {
                                clearInterval(clamp_move);
                                setTimeout(buildingUp(buildingNum), 1000);
                            }
                        }, 300);
                    }, 1500)
                } else {
                    console.log('没中！')
                    //$.ajax({
                    //    url: 'http://m.fun-x.cn/gpark/request.php',
                    //    type: 'post',
                    //    data: {
                    //        type: 'choujiang'
                    //    },
                    //    dataType: 'json',
                    //    success: function (res) {
                    //        $('#page3-fail').show();
                    //        $('#page3-success').hide();
                    //        $('#page3-get').hide();
                    //        person_lives = res.data.count;
                    //        console.log(res);
                    //    },
                    //    error: function (res) {
                    //        // alert('网络连接错误！')
                    //        console.log(res);
                    //    }
                    //})
                    $(".pagem2-long-wrapper").height(62 * winW / 100);
                    /*抓完向上走*/
                    setTimeout(function () {
                        clamp_move = setInterval(function () {
                            $(".pagem2-clamp").css("background-position", clampPo + "% 0");
                            clampPo += 33.3;
                            if (clampPo > 70) {
                                clearInterval(clamp_move);
                                //setTimeout(buildingUp(buildingNum), 1000);
                                var clampT = parseInt($(".pagem2-long-wrapper").height());
                                var clampUp = setInterval(function () {
                                    clampT -= 5;
                                    $(".pagem2-long-wrapper").css("height", clampT + "px");
                                    if (clampT <= 30) {
                                        clearInterval(clampUp);
                                        toOriginal();
                                    }
                                }, 30)
                            }
                        }, 300);
                    }, 1500)
                }
            }

            function buildingUp(item, bool) {
                console.log(item);
                var thisBuilding = $(".pagem2-building").eq(item);
                var clampT = parseInt($(".pagem2-long-wrapper").height());
                var clampUp = setInterval(function () {
                    thisBuilding.fadeOut(500);
                    $(".pagem2-clamp").css("background-position", "100% 0");
                    clampT -= 5;
                    $(".pagem2-long-wrapper").css("height", clampT + "px");
                    if (clampT <= 30) {
                        console.log(clampT);
                        clearInterval(clampUp);
                        toOriginal();
                    }
                }, 30)
            }

            function toOriginal() {
                $(".pagem2-difficult").stop().delay(2000).animate({
                    "left": arr[9][9][0] * winW + "px",
                    "top": arr[9][9][1] * winW + "px"
                }, 2000, function () {
                    pushBuilding();
                });
            }

            function pushBuilding() {
                document.getElementById('m_drop').play();
                if (reward) {
                    isAward = true;
                    var clampPo2 = 100;
                    var pushTimer = setInterval(function () {
                        $(".pagem2-clamp").css("background-position", clampPo2 + "% 0");
                        clampPo2 -= 33.3;
                        if (clampPo2 <= 0) {
                            clearInterval(pushTimer);
                            $(".pagem2-long-inner .pagem2-building").fadeIn(100).animate({
                                "bottom": -0.66 * winW
                            }).fadeOut(200, function () {
                                slideOut($page2);
                                page3Load();
                            });
                        }
                    }, 200);
                } else {
                    var clampPo2 = 66.667;
                    var pushTimer = setInterval(function () {
                        $(".pagem2-clamp").css("background-position", clampPo2 + "% 0");
                        clampPo2 -= 33.3;
                        if (clampPo2 <= 0) {
                            clearInterval(pushTimer);
                            slideOut($page2);
                            page3Load();
                        }
                    }, 300);
                }
            }
        })
    }


    /*=== page3 ===*/
    function page3Load() {
        var $page3 = $('#page3');
        var $gcode = $('#getCheckcode');
        var $share = $('.share');
        var $submit = $('.page3-submit');

        // page3 show
        slideIn($page3);
        if(isAward){
            $("#page3-success").removeClass("hide");
            $("#page3-fail").addClass("hide");
            $("#page3-get").addClass("hide");
        }else {
            $("#page3-fail").removeClass("hide");
            $("#page3-success").addClass("hide");
            $("#page3-get").addClass("hide");
        }



        // nochance
        if (person_lives == 0) {
            // fail
            $('.page3-fail-btn-0').show();
            $('.page3-fail-btn').hide();
            // success
            $('.page3-get-more').css('background-image', 'url("img/page3_mingtian.png")')
        } else {
            $('.page3-fail-btn').show();
            $('.page3-fail-btn-0').hide();
        }

        /*
         * ============ fail ============
         */

        // load swipe
        if (award_status == 0) {
            swipeLoad();
        }

        // fail-chances
        $('.page3-fail-chances').text('你还剩 ' + person_lives + ' 次机会');

        // btn of fail-tomorrow
        $('.page3-fail-ming').on('touchstart', function () {
            $('.page3-fail-ming a').css({
                'margin-top': '1.3vw',
                'margin-left': '1vw'
            });
            document.getElementById('m_btn_big').play();
        });
        $('.page3-fail-ming').on('touchend', function () {
            $('.page3-fail-ming a').css({
                'margin-top': '2.3vw',
                'margin-left': '2.5vw'
            });
            document.getElementById('m_btn_big').play();
            moveToNext();
        });

        // btn of fail-help
        $('.page3-fail-help').on('touchstart', function () {
            $('.page3-fail-help a').css({
                'margin-top': '1.3vw',
                'margin-left': '1vw'
            });
            document.getElementById('m_btn_big').play();
        })
        $('.page3-fail-help').on('touchend', function () {
            $('.page3-fail-help a').css({
                'margin-top': '2.3vw',
                "margin-left": '2.1vw'
            });
            document.getElementById('m_btn_big').play();
            $('.share').show();
        });

        // btn of fail-onemore
        $('.page3-fail-btn').on(clickEvent, function () {
            document.getElementById('m_btn_big').play();
            if (person_lives == 0) {
                slideOut($page3);
                page4Load();
            } else {
                slideBackOut($page3);
                page2Load();
            }
        });

        /*
         * ============ success ============
         */

        // gift show
        if (award_status) {
            $('.page3-success-award').css('background-image', 'url("img/award' + award_status + '.png")');
        } else {
            $('.page3-success-award').css('visibility', 'hidden');
        }

        // button of get checkCode and submit tel
        $gcode.on(clickEvent, getCode_tel);

        function getCode_tel() {
            document.getElementById('m_btn_big').play();
            // part of get code
            var phone = $('.page3-success-tel').val();
            var time = 60;
            // send check code
            $.ajax({
                url: 'http://m.fun-x.cn/gpark/request.php',
                type: 'post',
                dataType: 'json',
                data: {
                    type: 'sendcode',
                    phone: phone
                },
                success: function (res)      {
                    console.log(res);
                    if (res.code == "success") {
                        phone = $('.page3-success-tel').val();
                        $gcode.off()
                            .css('color', '#aaa')
                            .text('获取验证码 ' + time + 's');
                        var timer = setInterval(function functionName() {
                            time--;
                            $gcode.text('获取验证码 ' + time + 's');
                            if (time === 0) {
                                clearInterval(timer);
                                $gcode.css('color', '#00797f')
                                    .text('获取验证码')
                                    .on(clickEvent, getCode_tel);
                            }
                        }, 1000)
                    } else {
                        alert(res.message);
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });

            // part of submit tel
            $submit.off().on('touchstart', function () {
                document.getElementById('m_btn_big').play();
                $submit.find('i').css({
                    "margin-top": "1.8vw",
                    "margin-left": "2vw"
                })
                $submit.off().on('touchend', function () {
                    document.getElementById('m_btn_big').play();
                    var code = $('.page3-success-checkcode').val();
                    $submit.find('i').css({
                        "margin-top": "2.5vw",
                        "margin-left": "3.5vw"
                    });
                    // send phone number
                    $.ajax({
                        url: 'http://m.fun-x.cn/gpark/request.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            type: 'postrecord',
                            phone: phone,
                            code: code,
                            recordid: recordid
                        },
                        success: function (res) {
                            if (res.code == 'success') {
                                $('#page3-success').hide();
                                $('#page3-fail').hide();
                                $('#page3-get').show();
                                swipeLoad();
                            } else {
                                alert(res.message);
                            }
                        },
                        error: function (res) {
                            console.log(res);
                        }
                    })
                })
            })
        }


        // button of cancel
        $('.page3-cancel').on(clickEvent, function () {
            document.getElementById('m_btn_big').play();
            moveToNext();
        });

        /*
         * ========= get it ========
         */

        // button of get-moretime
        $('.page3-get-more').on('touchstart', function () {
            $('.page3-get-more').css({
                "margin-top": "-1vw",
                "margin-left": "8vw"
            });
            document.getElementById('m_btn_mini').play();
            $('.page3-get-more').on('touchend', function () {
                $('.page3-get-more').css({
                    "margin-top": "0",
                    "margin-left": "9vw"
                });
                document.getElementById('m_btn_mini').play();
                if (person_lives == 0) {
                    moveToNext();
                } else {
                    slideBackOut($page3);
                    page2Load();
                }
            })
        });

        // button of get-help
        $('.page3-get-help').on('touchstart', function () {
            $('.page3-get-help').css({
                "margin-top": "-1vw",
                "margin-right": "5.5vw"
            });
            document.getElementById('m_btn_mini').play();
            $('.page3-get-help').on('touchend', function () {
                $('.page3-get-help').css({
                    "margin-top": "0",
                    "margin-right": "4.5vw"
                });
                document.getElementById('m_btn_mini').play();
                $share.show();
            })
        });

        // close share layer
        $share.on('touchend', function () {
            $share.hide();
        });

        // swipe to next page
        function swipeLoad() {
            var hammertime = new Hammer(document.querySelector('#page3'));
            hammertime.on('swipeup', function (ev) {
                $('#page3 .page3-get-icon').hide();
                moveToNext();
            });
            hammertime.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        }

        // slide to next page
        function moveToNext() {
            slideOut($page3);
            page4Load();
        }
    }

    /*
     *================ page4 ===============
     */
    function page4Load() {
        var $page4 = $('.page4');
        var hide = false;

        slideIn($page4);

        // button of
        $('.page4-btn').on(clickEvent, function () {
            document.getElementById('m_btn_big').play();
        });

        // 模拟滚动
        var moveDistance = 0;
        var moveTop = $('.container_h').height() - $('.page4-container').height() - 40;
        console.log('top:' + moveTop);
        var mc = new Hammer(document.querySelector('.page4'));
        mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
        mc.on("panmove", function (ev) {
            var distance = ev.velocityY * 20;
            document.getElementsByClassName('page4')[0].scrollTop -= distance;
            console.log(document.getElementsByClassName('page4')[0].scrollTop);

            // if (moveDistance > moveTop && moveDistance < 0){
            //   moveDistance += ev.velocityY * 20;
            //   $('.page4-container').css('transform', 'translateY('+ moveDistance +'px)')
            // } else {
            //   if (moveDistance < moveTop){
            //     moveDistance = moveTop + 0.0001;
            //   } else {
            //     moveDistance =  -0.0001;
            //   }
            // }
            if (!hide) {
                $('.page4-arrow').hide();
                hide = true;
            }
        });
    }

    /* ========= functions ===========*/

    function slideOut(obj) {
        obj.css('transform', 'translateY(-100%)');
    }

    function slideBackOut(obj) {
        obj.css('transform', 'translateY(100%)');
    }

    function slideIn(obj) {
        obj.css('transform', 'translateY(0%)');
    }

});

/**
 * Created by SIRMly on 2016/10/12.
 */

var arr = [];
var x = 4, y = 4;
for(var i =0; i < 10; i++) {
    arr[i] = [];
    for ( var j = 0; j < 10; j++) {
        arr[i][j] = [];
    }
};
var count = 0;
for(var i =0; i < 10; i++){
    for(var j=0; j<10; j++){
        arr[i][j][0] = 0.424 - i * 0.04 + j * 0.04;
        arr[i][j][1] = -0.536 + i * 0.0175 + j * 0.0175;
        arr[i][j][2] = count;
        count++;
    }
}

var buildingArr1 = [
    [81,80,91,92],
    [41,40,50,51],
    [0,1],
    [85,84,94,95],
    [10,33,42,53,54,65],
    [12,2],
    [34,35,46,45,57,58,68],
    [6,16,17,26],
    [37,38,49,59],
    [8,9,19,29]
]

var buildingArr1 = []
var click = "ontouchstart" in document.documentElement ? "touchstart" : "click";
document.ontouchmove = function(e){ e.preventDefault();};
var winW = $(".pagem-1").width();
var winH = $(".pagem-1").height();
var leftMin = winW * 0.072;
var leftMax = winW * 0.78;
$(function (){
    "use strict";
    var left,top;
    $(".right").on(click, function(){
        no_blin();
        if(y < 9){
            y += 1;
            pipe_move();
        }
    })
    $(".left").on(click, function(){
        no_blin()
        if(y > 0){
            y -= 1;
            pipe_move();
        }
    });
    $(".up").on(click, function(){
        no_blin()
        if(x > 0){
            x -= 1;
            pipe_move();
        }
    });
    $(".down").on(click, function(){
        no_blin()
        if(x < 9){
            x += 1;
            pipe_move();
        }
    });
    function pipe_move(){
        no_blin()
        $(".pagem2-difficult").animate({
            "left": arr[x][y][0] * winW + "px",
            "top" : arr[x][y][1] * winW + "px"
        }, 50)
    }
    function no_blin(){
        $(".pagem2-direction").removeClass("pagem2-dire-blin");
    }
    /*开始抓*/
    $(".pagem2-btn").on(click, function (){
        $(".pagem2-direction").off(click);
        $(this).off(click);

        var buildingNum;
        var reward = false;
        for(var m = 0; m<10; m++){
            for(var n = 0; n<buildingArr[m].length; n++){
                if(buildingArr[m][n] == arr[x][y][2]){
                    reward = true;
                    console.log(m);
                    buildingNum = m+1;
                    break;
                }
            }
        };
        do_clamp();
        function do_clamp(){
            var pipeH= $(".pagem2-building").eq(buildingNum).attr("data-num");
            console.log(pipeH);
            $(".pagem2-long-wrapper").height(pipeH*winW/100);
            var clamp_move;
            var clampPo = 0;
            if(reward){
                setTimeout(function (){
                    clamp_move = setInterval(function(){
                        $(".pagem2-clamp").css("background-position", clampPo+"% 0");
                        clampPo += 33.3;
                        if(clampPo > 70){
                            clearInterval(clamp_move);
                            setTimeout(buildingUp(buildingNum), 1000);
                        }
                    }, 300);
                },1500)
            }else {
                $(".pagem2-long-wrapper").height(65*winW/100);
                setTimeout(function (){
                    clamp_move = setInterval(function(){
                        $(".pagem2-clamp").css("background-position", clampPo+"% 0");
                        clampPo += 33.3;
                        if(clampPo > 70){
                            clearInterval(clamp_move);
                            //setTimeout(buildingUp(buildingNum), 1000);
                            var clampT = parseInt($(".pagem2-long-wrapper").height());
                            var clampUp = setInterval(function (){
                                clampT-= 5;
                                $(".pagem2-long-wrapper").css("height" , clampT + "px");
                                if(clampT <= 30){
                                    clearInterval(clampUp);
                                    toOriginal();
                                }
                            },30)
                        }
                    }, 300);
                },1500)
            }
        }
        function buildingUp(item, bool){
            console.log(item)
            var thisBuilding = $(".pagem2-building").eq(item);
            var clampT = parseInt($(".pagem2-long-wrapper").height());
            var clampUp = setInterval(function (){
                thisBuilding.fadeOut(500);
                $(".pagem2-clamp").css("background-position", "100% 0");
                clampT-= 5;
                $(".pagem2-long-wrapper").css("height" , clampT + "px");
                if(clampT <= 30){
                    console.log(clampT)
                    clearInterval(clampUp);
                    toOriginal();
                }
            },30)
        }
        function toOriginal(){
            $(".pagem2-difficult").stop().delay(2000).animate({
                "left": arr[9][9][0] * winW + "px",
                "top" : arr[9][9][1] * winW + "px"
            }, 2000, function(){
                pushBuilding();
            });
        }
        function pushBuilding(){
            if(reward){
                var clampPo2 = 100;
                var pushTimer  = setInterval(function(){
                    $(".pagem2-clamp").css("background-position", clampPo2+"% 0");
                    clampPo2 -= 33.3;
                    if(clampPo2 <= 0){
                        clearInterval(pushTimer);
                        $(".pagem2-long-inner .pagem2-building").fadeIn(100).animate({
                            "bottom" : -0.66*winW
                        }).fadeOut(200, function (){
                            alert(123);
                        });
                    }
                }, 200);
            }else {
                var clampPo2 = 66.667;
                var pushTimer  = setInterval(function(){
                    $(".pagem2-clamp").css("background-position", clampPo2+"% 0");
                    clampPo2 -= 33.3;
                    if(clampPo2 <= 0){
                        clearInterval(pushTimer);
                    }
                }, 300);
            }
        }

    })
});








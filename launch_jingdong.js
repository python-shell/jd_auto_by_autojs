// /*检查无障碍服务是否已经启用，
// 如果没有启用则跳转到无障碍服务启用界面，
// 并等待无障碍服务启动；
// 当无障碍服务启动后脚本会继续运行。*/
// var appName = "com.jingdong.app.mall";
// start();
// // 进入浮层活动
// sleep(3000);
// if(desc("浮层icon").exists()){
//     console.log("点击进入浮层活动");
//     var huodong = desc("浮层icon").findOne().bounds();
//     randomClick(huodong.centerX(), huodong.centerY());
// }else{
//     console.log("浮层活动不存在");
// }


// //点击做任务集爆竹
// // var button = className('android.view.View')
// // .depth(14)
// // .indexInParent(18)
// // .drawingOrder(0)
// // .clickable();

// // 测试
// var button = className('android.view.View')
// .depth(14)
// .indexInParent(19)
// .drawingOrder(0)
// .clickable();

// var rec = button.findOne().bounds();
// randomClick(rec.centerX(), rec.centerY());
// sleep(1000);
// headXY = id("a96").findOne().bounds();
// log(headXY);
// log("the end");

// function randomClick(x, y){
//     var recX = x + random(0, 10);
//     var recY = y + random(0, 10);
//     click(recX, recY);
//     sleep(1000);
//     return true;
// }


// function start() {
//     auto.waitFor()
//     if (launch(appName)) {
//         console.info("启动京东APP");
//         console.info("author:tm");
//         console.info("地址:https://github.com/czj2369/jd_tb_auto");
//     }
//     console.show();
// }

// toast(media.isMusicPlaying());
media.stopMusic();
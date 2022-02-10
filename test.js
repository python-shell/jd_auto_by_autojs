// if (text("我的").exists()){
//     text("我的").click();
//     sleep(1000);
//     //点击天天压岁钱
//     if (className("android.view.ViewGroup").depth(13).drawingOrder(1).clickable().exists()){
//         className("android.view.ViewGroup").depth(13).drawingOrder(1).clickable().click();
//         sleep(1000);
//     //点击进入做任务界面
//     var button = className("android.view.View").depth(14).drawingOrder(0).clickable();
//     if (button.exists()){
//         button.click();
//         sleep(1000);
//     }
//     }
// }
// if (text("天天压岁钱").exists()){
//     toast("天天压岁钱");
//     var button = text("天天压岁钱").findOne().bounds();
//     randomClick(button.centerX(), button.centerY());
//     sleep(1000);
// }
// var button_jnh = className("android.view.View")
//                 .textContains("我的年货")
//                 .findOne()
//                 .parent();


// var rect = button_jnh.bounds();
// randomClick(rect.centerX(), rect.centerY());
// sleep(1000);


// function randomClick(x, y){
//     var rx = x + random(0, 10);
//     var ry = y + random(0, 10);
//     click(rx, ry);
//     return true;
// }

// if(text("我的年货") && !text("去浏览")){
//     console.log("没有找到匹配的任务,向下滚动");
//     scrollDown();
// }
// var allSelector = className('android.view.View')
//         .text("去浏览")
//         .depth(16)
//         .drawingOrder(0)
//         .clickable()
//         .find();
var interval;
var JUDGE_TIME = 0;
threads.start(function(){
    if(interval == null){
        JUDGE_TIME = 0;
        console.log("开启定时器");
        interval = setInterval(function(){
            JUDGE_TIME += 1;
        }, 1000);
    }
    
})
allSelector_reward = text("去浏览").clickable().find();
toast("selector length is: "+allSelector_reward.length);
for(let i = 0; i < allSelector_reward.length; i++){
    toast("当前为第"+i+"个任务");
    allSelector_reward[i].click();
    while(true){
        if(JUDGE_TIME >= 5){
            back();
            sleep(1000);
            JUDGE_TIME = 0;
            break;
        }
    }
}
toast("the end...");
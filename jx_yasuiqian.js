/**
 * 京东京喜天天压岁钱
 * 
 * Author: tianming
 * Date: 2022/02/03
 * Time: 2022年2月3日10:59:44
 * Versions: 1.0.0
 * Github: 
 */

// 需要完成的任务列表
var TASK_LIST = ["浏览5秒", ]
// 判断停留时间
var JUDGE_TIME = 0;
// 定时器
var interval;
// 已完成序号
var finished_task_num = new Array();
// 当前序号
var current_task_num = 0;
// 任务数计数
var task_nums;
//app name
var appName = "com.jd.pingou";
// 第一次进入view task的标志
var first = true;
init();

/**
 * 初始化
 */

function init() {
    // 子线程监听脚本
    threads.start(function () {
        events.setKeyInterceptionEnabled("volume_up", true);
        //启用按键监听
        events.observeKey();
        //监听音量上键按下
        events.onKeyDown("volume_up", function (event) {
            console.log("脚本退出!")
            exit();
        });
    });

    start();

    // 子线程开启计时
    threads.start(function () {
        if (interval == null) {
            // 开启计时器，进行卡顿计时
            // 启动定时器前，将计数器归为0
            JUDGE_TIME = 0;
            log("开启定时器");
            interval = setInterval(function () {
                JUDGE_TIME = JUDGE_TIME + 1;
            }, 1000);
        }
    });

    while (true) {

        enterActivity();

        recoverApp();

        var flag = getNeedSelector(); 

        viewTask(flag);

        exitScript(task_nums);
    }
}

/**
 * 启动京东
 */
function start() {
    auto.waitFor()
    if (launch(appName)) {
        console.info("启动京喜APP");
        console.info("author:tianming");
        console.info("地址:https://github.com/");
    }
    sleep(5000);
    console.show();
}

/**
 * 进入做任务界面
 */
function enterActivity() {
    if (!text("当前等级").exists()) {
        sleep(4000);
        if (text("当前等级").exists()) {
            console.info("已经在任务界面");
            sleep(1000);
        } else if(text("摇一摇").exists()){
            console.info("已经再任务界面前一界面");
            var button_jnh = className("android.view.View")
                .textContains("我的年货")
                .findOne()
                .parent();

                var rect = button_jnh.bounds();
                randomClick(rect.centerX(), rect.centerY());
                sleep(1000);
        }else {
            //进入我的选项卡
            if (text("我的").exists()){
                var button_mine = text("我的").findOne().bounds();
                randomClick(button_mine.centerX(), button_mine.centerY());
                sleep(1000);
                //点击天天压岁钱
                var button_tt = className("android.view.ViewGroup")
                .depth(13)
                .drawingOrder(1)
                .clickable()

                if (button_tt.exists()){      
                    button_tt.click();
                    sleep(3000);
                }
                // 处理进入任务界面前的弹框
                if(text("开心收下").exists()){
                    text("开心收下").click();
                    sleep(1000);
                }
                //点击进入做任务界面(定位方法:通过我的年货文本控件再找到它的父控件)
                var button_jnh = className("android.view.View")
                .textContains("我的年货")
                .findOne()
                .parent();

                var rect = button_jnh.bounds();
                randomClick(rect.centerX(), rect.centerY());
                // sleep(1000);

            }
        }
        sleep(1000);
    }
}

/**
 * 去完成任务
 * @param {是否点击任务标识} flag 
 */
function viewTask(flag) {
    // 根据坐标点击任务，判断哪些需要进行
    // sleep(2000);
    if(first){
        JUDGE_TIME = 0;
    }
    while(true&&flag){
        if(JUDGE_TIME >= 6){
            viewAndFollow(); //sleep 1000; back; sleep 3000;
            //处理返回时出现的临时控件,如果有
            if(text("残忍离开").exists()){
                var button_leave = text("残忍离开").findOne().bounds();
                randomClick(button_leave.centerX(), button_leave.centerY());
                back();
                sleep(1000);
            }else if(text("晚点再来").exists()){
                var button_comeLately = text("晚点再来").findOne().bounds();
                randomClick(button_comeLately.centerX(), button_comeLately.centerY());
                sleep(1000);
            }
            finished_task_num[finished_task_num.length] = current_task_num;
            //重置计时器
            JUDGE_TIME = 0;
            //把first标志设置为false
            first = false;
            break;
        }
        if(recoverApp()){
            break;
        }
    }
}

/**
 * 获取需要进行的控件
 * @returns 
 */
function getNeedSelector() {
    //先处理领奖励的控件
    if(text("领奖励")&&text("我的年货")){
        allSelector_reward = text("领奖励").clickable().find();
        for(let j = 0; j < allSelector_reward.length; j++){
            allSelector_reward[j].click();
            sleep(1000);
        }
    }
    //获取所有待点击的控件
    var allSelector = className('android.view.View')
        .text("去浏览")
        .depth(16)
        .drawingOrder(0)
        .clickable()
        .find();
    task_nums = allSelector.length;
    console.log("探测到总任务个数为:" + task_nums);
    for (let index = 0; index < task_nums; index++) {
        for (var i = 0; i < TASK_LIST.length; i++) {
            // 获取具有需要完成任务字符串的控件集合
            var list = allSelector[index].parent().findByText(TASK_LIST[i]);
            // console.log("list.size is:", list.size());
            // 如果长度大于0则表示存在该控件
            if (list.size() > 0) {
                // 获取不在序列中的序号
                if (finished_task_num.indexOf(index) < 0) {
                    console.info("当前已完成序列:", finished_task_num)
                    current_task_num = index;
                    console.log("当前任务号:"+current_task_num);
                } else {
                    continue;
                }

                if (text("我的年货").exists()) {
                    console.info("去完成任务，当前任务序列:", current_task_num)
                    allSelector[i].click();
                    sleep(1000);
                    return true;
                }
            }
        }
    }
}

/**
 * 返回
 */
function viewAndFollow() {
    sleep(1000);
    back();
    sleep(3000);
}

/**
 * 自动判断程序是否卡顿，恢复方法
 * 判断依据：1.不在活动界面 2.停留某个界面长达30s
 * @returns 
 */
function recoverApp() {
    if (JUDGE_TIME > 30) {
        if (back()) {
            // 计时器重置
            JUDGE_TIME = 0;
            console.warn("停留某个页面超过30s,自动返回，重置定时器。");
            return true;
        }
    } else {
        return false;
    }
}


/**
 * 点击
 * @param {横坐标} x 
 * @param {纵坐标} y 
 */
function randomClick(x, y) {
    var rx = random(0, 5);
    var ry = random(0, 5);

    click(x + rx, y + ry);
    sleep(2000);
    return true;
}

/**
 * 没有任务时,退出脚本
 * @param {*} task_nums 
 */
function exitScript(task_nums){
    if(text("当前等级")&&task_nums==0){
        console.log("所有任务已经完成,退出脚本!");
        exit();
    }
}
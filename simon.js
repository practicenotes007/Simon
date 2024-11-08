/**
 * Simon游戏的按钮交互逻辑
 * 为所有游戏按钮添加点击效果
 * 
 * @listens click - 监听.btn元素的点击事件
 * @requires jQuery
 */
$(".btn").on("click", function() {
    /**
     * 被点击的按钮jQuery对象
     * @type {jQuery}
     */
    const $btn = $(this);
    
    // 添加激活状态的class，触发按钮按下的视觉效果
    $btn.addClass("btn-active");

    // 创建音频对象并播放音频
    const sound = new Audio($btn.attr("bg_sound"));
    sound.play();
    
    /**
     * 延时移除按钮激活状态
     * @param {Function} callback - 移除btn-active类的回调函数
     * @param {number} delay - 延迟时间（毫秒）
     */
    setTimeout(() => {
        $btn.removeClass("btn-active");
    }, 200);
});
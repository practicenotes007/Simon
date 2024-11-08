/**
 * Simon游戏模块
 * @namespace
 */
const SimonGame = {
    /**
     * 游戏状态标志
     * @type {boolean}
     * @private
     */
    _gameStarted: false,

    /**
     * 初始化游戏
     * 设置事件监听器
     * @public
     */
    init: function() {
        this._setupButtonListeners();
        this._setupGameStart();
    },

    /**
     * 设置按钮点击事件监听
     * @private
     */
    _setupButtonListeners: function() {
        $(".btn").on("click", (event) => {
            if (!this._gameStarted) return;
            
            const $btn = $(event.currentTarget);
            $btn.addClass("btn-active");
            
            const sound = new Audio($btn.attr("bg_sound"));
            sound.play();
            
            setTimeout(() => {
                $btn.removeClass("btn-active");
            }, 200);
        });
    },

    /**
     * 设置游戏启动事件监听
     * @private
     */
    _setupGameStart: function() {
        $(document).on("keypress", () => {
            this._gameStarted = true;
            game.start();
        });
    }
};

// 在页面加载完成后初始化游戏
$(window).on("load", () => SimonGame.init());
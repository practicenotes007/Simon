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
     * 游戏等级
     * @type {number}
     * @private
     */
    _level: 0,

    /**
     * 当前按键序列
     * @type {Array<string>}
     * @private
     */
    _sequence: [],

    /**
     * 用户输入序列
     * @type {Array<string>}
     * @private
     */
    _userSequence: [],

    /**
     * 是否允许用户输入
     * @type {boolean}
     * @private
     */
    _canUserInput: false,

    /**
     * 用户输入计时器
     * @type {number|null}
     * @private
     */
    _userInputTimer: null,

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
            if (!this._canUserInput) return;
            
            const $btn = $(event.currentTarget);
            const btnId = $btn.attr("id");
            
            this._playButton($btn);
            this._handleUserInput(btnId);
        });
    },

    /**
     * 设置游戏启动事件监听
     * @private
     */
    _setupGameStart: function() {
        $(document).one("keypress", () => {
            this._gameStarted = true;
            this._startNewRound();
        });
    },

    /**
     * 开始新回合
     * @private
     */
    _startNewRound: function() {
        this._canUserInput = false;
        this._userSequence = [];
        this._addNewStep();
        this._playSequence();
    },

    /**
     * 添加新的步骤到序列中
     * @private
     */
    _addNewStep: function() {
        const buttons = ["green_btn", "red_btn", "yellow_btn", "blue_btn"];
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        this._sequence.push(randomButton);
    },

    /**
     * 播放按钮序列
     * @private
     */
    _playSequence: async function() {
        for (const btnId of this._sequence) {
            const $btn = $(`#${btnId}`);
            await this._playButton($btn);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        this._startUserInput();
    },

    /**
     * 播放单个按钮效果
     * @private
     * @param {jQuery} $btn - 按钮jQuery对象
     * @returns {Promise} 动画完成的Promise
     */
    _playButton: function($btn) {
        return new Promise(resolve => {
            $btn.addClass("btn-active");
            const sound = new Audio($btn.attr("bg_sound"));
            sound.play();
            
            setTimeout(() => {
                $btn.removeClass("btn-active");
                resolve();
            }, 200);
        });
    },

    /**
     * 开始接收用户输入
     * @private
     */
    _startUserInput: function() {
        this._canUserInput = true;
        this._resetUserInputTimer();
    },

    /**
     * 重置用户输入计时器
     * @private
     */
    _resetUserInputTimer: function() {
        if (this._userInputTimer) {
            clearTimeout(this._userInputTimer);
        }
        this._userInputTimer = setTimeout(() => {
            if (this._canUserInput) {
                this._gameOver();
            }
        }, 2000);
    },

    /**
     * 处理用户输入
     * @private
     * @param {string} btnId - 按钮ID
     */
    _handleUserInput: function(btnId) {
        this._resetUserInputTimer();
        this._userSequence.push(btnId);
        
        const currentIndex = this._userSequence.length - 1;
        
        if (btnId !== this._sequence[currentIndex]) {
            this._gameOver();
            return;
        }
        
        if (this._userSequence.length === this._sequence.length) {
            this._levelUp();
        }
    },

    /**
     * 升级
     * @private
     */
    _levelUp: function() {
        this._level++;
        this._canUserInput = false;
        setTimeout(() => {
            this._startNewRound();
        }, 1000);
    },

    /**
     * 游戏结束处理
     * @private
     */
    _gameOver: function() {
        alert("游戏失败！");
        this._resetGame();
    },

    /**
     * 重置游戏状态
     * @private
     */
    _resetGame: function() {
        this._gameStarted = false;
        this._canUserInput = false;
        this._level = 0;
        this._sequence = [];
        this._userSequence = [];
        if (this._userInputTimer) {
            clearTimeout(this._userInputTimer);
        }
        this._setupGameStart();
    }
};

// 在页面加载完成后初始化游戏
$(window).on("load", () => SimonGame.init());
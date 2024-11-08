# Simon Game Server

这是一个使用 Express 和 Node.js 构建的 Simon 游戏服务器后端。该服务器负责处理游戏逻辑、存储用户数据和管理游戏状态。

## 功能特点

- 提供游戏状态管理
- 支持用户注册和登录
- 存储用户的游戏记录
- 提供游戏序列生成和验证

## 技术栈

- Node.js
- Express
- MongoDB (或其他数据库)
- JWT (JSON Web Tokens) 用于身份验证

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/practicenotes007/Simon-backend.git
```

2. 进入项目目录
```bash
cd Simon-backend
```

3. 安装依赖
```bash
npm install
```

4. 配置环境变量
   - 创建一个 `.env` 文件并添加以下内容：
     ```
     PORT=3000
     MONGODB_URI=你的MongoDB连接字符串
     JWT_SECRET=你的JWT密钥
     ```

5. 启动服务器
```bash
npm start
```

6. 在浏览器中访问 `http://localhost:3000`

## API 端点

### 用户注册

- **URL**: `/api/register`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "用户名称",
    "password": "用户密码"
  }
  ```

### 用户登录

- **URL**: `/api/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "用户名称",
    "password": "用户密码"
  }
  ```

### 获取游戏序列

- **URL**: `/api/game/sequence`
- **方法**: `GET`
- **认证**: Bearer Token

### 提交游戏结果

- **URL**: `/api/game/result`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "userId": "用户ID",
    "sequence": ["red", "blue", "green"]
  }
  ```

## 项目结构

```
Simon-backend/
│
├── index.js           # 入口文件
├── routes/            # 路由文件
│   ├── user.js        # 用户相关路由
│   └── game.js        # 游戏相关路由
├── models/            # 数据模型
│   ├── User.js        # 用户模型
│   └── Game.js        # 游戏记录模型
├── middleware/        # 中间件
│   └── auth.js        # 身份验证中间件
├── .env               # 环境变量配置
├── package.json       # 项目依赖
└── README.md          # 项目说明
```

## 开发

### 代码风格

- 使用 ES6+ 特性
- 遵循模块化设计原则
- 使用 JSDoc 注释规范

## 贡献

欢迎提交 Pull Request 或创建 Issue！

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 作者

[practicenotes007] - [practicenotes@163.com]

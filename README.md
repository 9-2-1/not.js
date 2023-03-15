# Not.js，共创世界次世代的 JSON 处理器。

## 优点

- 语法优雅到如同在 JS 操作 JSON。
- 完全兼容其它插件。
- 并且，我们还提供了一个优雅的旧模板开发范式，让旧模板也能享受到 Typescript 支持(按需，我没更新不需要的积木类型的类型注解)。你或许可以看看 [gandi-ext](https://github.com/FurryR/gandi-ext)。

## 编译

### 发布版

```bash
npm i
npm run build # 单次编译。
npm run watch (--command="编译完成执行的额外命令，可省略") # 基于监听更改的编译。
```

### 调试版

```bash
npm i
npm run debug # 单次编译。
npm run debug-watch (--command="编译完成执行的额外命令，可省略") # 基于监听更改的编译。
```

## 使用

### 自定义扩展

请参照 [我的文章](https://www.ccw.site/post/109edca6-8fd7-4e9c-8462-dcc06ec38988)。

请对 `dist/main.js` 进行这个操作，然后即可在测试插件中使用。

### CCW 官方插件

待审核。

## 版权信息

Copyright(c) FurryR @ Simplicity Studio 2023.
This program was licensed under the MIT License.

制作人员列表请参照 [CREDITS](./CREDITS.md)。

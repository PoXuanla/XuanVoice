# <p align='center'>XuanVoice </p>
<p align='center'>基於 React 、 Material UI 、 Express 、 MongoDB 、 Firebase 打造的音樂平台</p>
<p align='center'>前後端皆由作者獨立開發</p>

## 使用技術
```diff
FrondEnd
```

`React v17`　:　Hooks

`React-Router v6`　:　Auth Guard、Navigate

`React-Redux (toolkit)`　:　AsyncThunk 、 Handle Global State and Store

`Material UI`　:　Use UI Component 、Dark Mode、Icons、Custom Styled Component

`Axios`　:　Handle Ajax request

`React-Beautiful-DND`　:　Handle drag and drop for lists 

```diff
BacckEnd
```

`Express.js`

`FireBase`　:　Store Image and Mp3

`JWT`　:　Handle User Auth

`MongoDB Altas`　:　Store Any Data except Image and Mp3

`Mongoose`　:　Query Data with ODM

`RESTful API`

## 技術亮點
```diff
前端
```

1. 使用 Axios 集中管理前端API。

2. 複用組件抽出骨幹做成 High Order Component。

3. 將頁面複雜內容切為不同 component ，讓 page 乾淨整潔易讀，區塊 component 各司其職。

4. 使用 IntersectionObserver API　實現無限滾動，並做成 Custom Hook。

5. 使用 React Router & HOC 實現 「需先登入的 Page」。

6. 使用 MUI custom styled component 分開 HTML 與 CSS ，使其更具可讀性。 

```diff
後端
```
1. 採用 MVC 開發。
2. URL 採用 RESTful ，易讀。
3. 使用 MiddleWare 攔截 JWT token 以保護需登入的 API。
4. 據 API 需求採用 Mongoose ODM 或 Mongo aggregate 撈取資料。

## 部分畫面展示
### RWD
```diff
支援手機、平板
```
![33](https://user-images.githubusercontent.com/37298465/188199517-051e2082-407b-439e-841c-925f5358e2a6.png)

### MusicPlayer

```diff
播放平台音樂
三種模式 : Simple Mode 、Normal Mode、FullScreen Mode
可切換上下首歌曲 、 播放/暫停 、 調整音量、切換歌曲播放模式(自動換首 / 重複循環)、播放歌單
```
![eee](https://user-images.githubusercontent.com/37298465/188197735-60455218-49ff-41a7-8539-af36fc80f3ae.png)


### DarkMode

```diff
切換深淺主題顏色
```

![darkmode](https://user-images.githubusercontent.com/37298465/187186176-fe6924f8-be24-4d25-b6b6-827fa372d1a8.png)

### 管理個人歌曲
```diff
隨時發布、修改歌曲
```
![image](https://user-images.githubusercontent.com/37298465/188200170-30e5bc69-7e2c-4853-bf8f-bdfd0f2a8f0c.png)

### 歌單拖曳
```diff
靈活安排歌曲排序~
```
![image](https://user-images.githubusercontent.com/37298465/188199927-7377a702-47a9-4906-a31f-63a0f32309ca.png)

## 聲明
```diff
本專案為個人練習作品，絕無商業用途。
```

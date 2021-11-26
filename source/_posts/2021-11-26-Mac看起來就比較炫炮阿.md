---
title: Mac看起來就比較炫炮阿!! -在hexo裡美化code區塊為Mac樣式，並顯示檔案類型
tags:
  - - code區塊美化
  - - mac樣式
  - - js
  - - css
  - - hexo
  - - fluid
index_img: /img/post/Mac看起來就比較炫炮阿/Drake No Yes-codeCss.png
banner_img: /img/post/Mac看起來就比較炫炮阿/Drake No Yes-codeCss.png
categories:
  - 筆記
  - learn
date: 2021-11-26 15:13:36
---


# Mac看起來就比較炫炮阿!! -在hexo裡美化code區塊為Mac樣式，並顯示檔案類型

剛寫完文章覺得code區塊都醜醜的，fluid裡的樣式又沒有很喜歡，所以就決定來客製一下啦! 一開始還不知道怎麼改，查了一些教學發現寫得又臭又長，這時候想起了F12，不知道怎麼辦的時候，F12就給他用力的按下去就對了!

此篇文章是使用Hexo + Fluid主題下客製的，不是Fluid主題的朋友們不用帶擔心，基本上都大同小異。

首先，先來張對比圖 ~~(沒有對比沒有傷害，雖然我不是用Mac)~~
左邊為原本的樣式，右邊為新樣式，是不是差很多! <img src="/sticker/happyEyes.gif" class="sticker"/> 

![左邊為原本的樣式，右邊為新樣式](/img/post/Mac看起來就比較炫炮阿/code對比圖.jpg)

## 相關設定

在根目錄的{% label danger @_config.fluid.yml %}的顯示行號先{% label danger @關掉%}，不然等下會影響樣式，若堅持要打開的話，css部分就需要自己微調一下歐。在根目錄找不到_config.fluid.yml，應該會在/themes/fluid/config.yml，當初我是用npm裝的，用clone的話位置會不一樣

```yaml
code:
 line_number: false #關掉行號
```

一樣在{% label danger @_config.fluid.yml %}找到  {% label danger @custom_js %}與{% label danger @custom_css %}來指定路徑，是等下要放css和js的地方

```yaml
custom_js: /js/custom.js
custom_css: /css/custom.css
```

接下來在{% label danger @source %}資料裡新建css資料夾及js資料夾，css資料夾新增{% label danger @custom.css%}，js資料夾新增{% label danger @custom.js%}，也就是剛剛設定路徑的地方

## 添加CSS樣式

按F12看一下，我們要在哪個地方新增css，找到code-wrapper這個class

![code-wrapper](/img/post/Mac看起來就比較炫炮阿/css-1.jpg)

- code-wrapper增加陰影與圓角
- 用偽元素before增加上方凸出的區塊
- 用偽元素after增加左上方的燈
- 改變預設的卷軸

![](/img/post/Mac看起來就比較炫炮阿/css-2.jpg)

![](/img/post/Mac看起來就比較炫炮阿/css-3.jpg)

  {% label danger @/source/css/custom.css%} 完整css程式碼

```css
.code-wrapper {
 position: relative;
 border-radius: 8px !important;
 box-shadow: 5px -5px 20px 5px rgba(0, 0, 0, 0.2);
 padding-top: 14px;
 margin: 30px 0;
}

.code-wrapper::before {
 color: rgb(197, 197, 197);
 content: attr(data-rel);
 border-radius: 8px 8px 0 0;
 height: 25px;
 line-height: 30px;
 background: #21252b;
 font-size: 16px;
 position: absolute;
 top: -20px;
 left: 0;
 width: 100%;
 font-family: 'Source Sans Pro', sans-serif;
 font-weight: bold;
 padding: 0 65px;
 text-indent: 15px;
 float: left;
}

.code-wrapper::after {
 content: '';
 position: absolute;
 -webkit-border-radius: 50%;
 border-radius: 50%;
 background: #fc625d;
 width: 12px;
 height: 12px;
 top: -17px;
 left: 10px;
 margin-top: 4px;
 -webkit-box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
 box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
 z-index: 3;
}
.code-wrapper pre::-webkit-scrollbar {
  height: 10px;
}

.code-wrapper pre::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.code-wrapper pre::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(41, 138, 202, 0.7);
}
```



## 增加jS顯示語言類型

再來要怎麼顯示語言類型的部分呢?

![](/img/post/Mac看起來就比較炫炮阿/css-5.jpg)

首先一樣觀察一下，發現每次在md檔輸入程式後會替你增加class在後方

![](/img/post/Mac看起來就比較炫炮阿/css-4.jpg)

1. 抓到每一個 {% label danger @&lt;code&gt;%} 標籤
2. 取第二個class
3. 再把class名稱塞入 {% label danger @&lt;code-wrapper&gt;%} 標籤裡的 {% label danger @data-* %} 屬性，也就是剛剛css預先設好的屬性

![](/img/post/Mac看起來就比較炫炮阿/css-7.jpg)

4. 若抓到的class名稱為{% label danger @applescript %}則設為空值，因為若md檔沒輸入語言類型的話，hexo會自動幫你加上applescript這個class (如下方圖，若紅框處沒寫類型的話)

 ![](/img/post/Mac看起來就比較炫炮阿/css-6.jpg)

  {% label danger @/source/js/custom.js%} 完整css程式碼

```javascript
let getCodeType = document.getElementsByTagName('code');
let attrData = document.getElementsByClassName('code-wrapper');
let codeType = [];

for (let i = 0; i < getCodeType.length; i++) {
 codeType = getCodeType[i].className.split(" ")[1];
 attrData[i].setAttribute("data-rel", codeType);

 codeType === 'applescript' ?
  attrData[i].setAttribute("data-rel", '') :
  attrData[i].setAttribute("data-rel", codeType);
};
```

最後，見證奇蹟的時刻到了! 

<img src="/sticker/Do Re Mi So.jpg" class="sticker" style="max-height: 200px;"/>

你就擁有一個漂亮的code區塊啦 ~ ~ ~ <img src="/sticker/hero.gif" class="sticker" />

  ------
  
  參考資料: 
  [Hexo-Fluid实现mac panel风格代码块](https://tomorrow505.xyz/Hexo-Fluid%E5%AE%9E%E7%8E%B0mac-panel%E9%A3%8E%E6%A0%BC%E4%BB%A3%E7%A0%81%E5%9D%97/)
  [Hexo 博客代码块样式美化](https://zhuanlan.zhihu.com/p/124888459)

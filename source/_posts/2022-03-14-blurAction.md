---
title: jquery點擊空白處隱藏元素
tags:
  - - jquery
  - - 冒泡事件
categories:
  - 筆記
  - jquery
date: 2022-03-14 22:16:59
keywords:
description:
---

# jquery點擊空白處隱藏元素
前陣子在做select偵測下拉選單有沒有被打開[(見下篇)](https://jing-siao.github.io/selectBlur/)，突然想到之前有做過這個小測試，focus input出現小鍵盤，按下一步或關閉按鈕以及空白處，小鍵盤會收起，這功能應該大家幾乎都有做過，以下列出需要的步驟。

- input focus後會下滑出現小鍵盤
- 按數字鍵時小鍵盤不能收起
- 按下一步和關閉時鍵盤收起
- 點擊空白處小鍵盤會收起

![focus 出現小鍵盤](/img/post/jq點擊空白處/CPT2203141911.gif)

## focus 出現小鍵盤

先簡單介紹一下html架構
- testInput1為session1裡面的input
- testInput2為session2裡面的input
- keyboard則是鍵盤的部份

```html
  <div>
    <div class="block">
      session1
      <input type="text" id="testInput1" class="testInput">
    </div>
    <div class="block">
      session2
      <input type="text" id="testInput2" class="testInput">
    </div>
  </div>
  <div class="key" id="keyboard">
    <div id="key">數字</div>
    <div>數字</div>
    <div>數字</div>
    <div id="go">下一步</div>
    <div id="close">關閉</div>
  </div>

```

focus後下滑出現小鍵盤

```javascript
  $('.testInput').focus(function () {
      $(".key").slideDown();
  });
```
## 冒泡事件

按鍵盤上的數字時，鍵盤不能收起來，這時候就要用 {% label danger @event.stopPropagation()%}，不然怎麼點數字，鍵盤一樣會收起來，這裡可以解釋為，除了下一步和關閉外，按鍵盤內的所有東西(紅色部份)都不會收起來
```javascript
  $("#keyboard").click(function (event) {
      event.stopPropagation();
      let go = $('#go');
      let close = $('#close');
      if (go.is(event.target) || close.is(event.target))
        $(".key").slideUp();
  });
```
## 點擊空白處小鍵盤會收起

除了紅色框框以及input之外，都屬於空白處，所以就是說除了testInput1與testInput2，小鍵盤都要slideUp

```javascript
  $(document).click(function (event) {
      //目標
      let testInput1 = $('#testInput1');
      let testInput2 = $('#testInput2');
      if (!testInput1.is(event.target) && !testInput2.is(event.target))
        $(".key").slideUp();
  });
```
以上就是完整解說啦~是不是很簡單呢? <img src="/sticker/恩.gif" class="sticker" />
放上我codepen連結[點擊空白處隱藏元素](https://codepen.io/JingWunHsiao/pen/PoWoxjV)




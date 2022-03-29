---
title: 偵聽select下拉選單有無被打開(原生js)
tags:
  - - javascript
  - - select
categories:
  - 筆記
  - javascript
date: 2022-03-30 00:46:13
keywords:
description:
---


# 偵聽select下拉選單有無被打開(原生js)
在做日期選擇器練習時遇到一些問題，下拉選單出現時，需要顯示出"選擇中"的字樣，由於select在點擊外面時，下拉選單會被收起，滑動滾輪時也會被收起，以下先附上我codepen連結[datePicker](https://codepen.io/JingWunHsiao/pen/gOXVRGK),再來做解釋如何解決。

## 需要步驟

- 未選擇日期時，或日期尚未選擇完整時show出"請選擇日期"
- 當按下select時，也就是下拉選單出現時，要顯示出{% label danger @"選擇中"%}的字樣
- 日期選擇完整後出現日期與日曆
![ ](/img/post/偵聽select/CPT2203292151-478x424.gif)
看起來好像不難對不對，但其實有超多bug要修，先上HTML及jS部份，再一一說明

```html
<div class="out">
    <select name="year" id="yearSelect">
      <option value="" class="hide">-- Year --</option>
    </select>
    <select name="month" id="monthSelect">
      <option value="" class="hide">-- Month --</option>
    </select>
    <select name="day" id="daySelect">
      <option value="" class="hide">-- Day --</option>
    </select>
    <p id="dateChoose" class="dateChoose"></p>
  </div>
  <div class="out" id="calendar"></div>
```
```javascript

var temp = true;
var firstDay = -1;
var days = 0;
var rows = 0;

//是否選擇中狀態
function select() {
  temp = !temp;
  !temp ? dateChoose.innerText = "選擇中..." : chose();
};
//換字
function chose() {
  !yearSelect.value || !monthSelect.value || !daySelect.value ?
    dateChoose.innerText = "請選擇日期" :
    dateChoose.innerText = `${yearSelect.value}年${monthSelect.value}月${daySelect.value}日`;
};
//塞年月日選項
function createOption(start, end, select) {
  for (let i = start; i <= end; i++) {
    let options = document.createElement('option');
    options.value = i;
    options.text = i;
    select.add(options);
  }
};
//判斷空白處
function notId(e, text) {
  let id = e.target.id;
  if (id != yearSelect.id && id != monthSelect.id && id != daySelect.id) {
    temp = true;
    chose();
    console.log(text);
  }
};
//取得天數
function getDays(select) {
  select.addEventListener("change", function () {
    if (yearSelect.value && monthSelect.value) {
      days = new Date(yearSelect.value, monthSelect.value, 0).getDate();
      daySelect.options.length = 1;
      createOption(1, days, daySelect);
      firstDay = new Date(yearSelect.value, monthSelect.value - 1, 1).getDay();
      rows = Math.ceil((firstDay + days) / 7);
      // console.log(firstDay);
    }
  });
};
//生成日曆
function createCalendar(table,newCalendar) {
  let count = 0;
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < rows + 1; i++) {
        let trNode = table.insertRow();
        if (i === 0) {
          for (const k of week) {
            let th = document.createElement('th');
            th.innerText = k;
            trNode.appendChild(th);
          }
        } else {
          for (let y = 0; y < 7; y++) {
            let tdNode = trNode.insertCell();
            count++;
            count < firstDay + 1 || count > days + firstDay?
              tdNode.innerHTML = '':
              tdNode.innerHTML = count - firstDay;
            if (tdNode.innerHTML === daySelect.value) {
                tdNode.classList.add('tdActive');
            }
          }
        }
      }
      newCalendar.appendChild(table);
};

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById('yearSelect');
  const monthSelect = document.getElementById('monthSelect');
  const daySelect = document.getElementById('daySelect');
  const dateChoose = document.getElementById('dateChoose');


  //select部分
  dateChoose.innerText = "請選擇日期";
  createOption(2010, 2025, yearSelect);
  createOption(1, 12, monthSelect);
  yearSelect.addEventListener("click", select);
  document.addEventListener("click", function (e) {
    notId(e, "外面")
  });
  window.addEventListener("mousewheel", function (e) {
    notId(e, "滾輪")
  });
  getDays(yearSelect);
  getDays(monthSelect);
  monthSelect.addEventListener("click", function () {
    !yearSelect.value ?
      alert("請先選擇年份") :
      select();
  });
  daySelect.addEventListener("click", function () {
    !yearSelect.value ?
      alert("請先選擇年份") :
      !monthSelect.value ?
        alert("請先選擇月份") :
        select();
  });
  //日曆部份
  daySelect.addEventListener('change', function () {
    const calendar = document.getElementById("calendar");
    const tableNode = document.createElement('table');
    tableNode.id = 'tableId';
    let tableElement = document.getElementsByTagName('table').length;
    if (tableElement > 0) {
      document.getElementById('tableId').remove();
      createCalendar(tableNode,calendar);
    } else {
      createCalendar(tableNode,calendar);
    }
  });


});
```

## 解決無選擇日期直接點擊空白處，選擇中狀態卻無消失
剛剛提到只有在下拉選單出現時，才顯示出{% label danger @"選擇中"%}的字樣，但點旁邊空白處時，也就是不在select裡，狀態就會一直卡在"選擇中"，這個部份可以參考我上一篇的作法[(jquery點擊空白處隱藏元素)](https://jing-siao.github.io/blurAction/)，這裡一樣用類似的作法，你可以想像成有無選擇狀態，跟toggle有點像。

- 先給一個存放狀態的變數，在給各個select宣告變數
```javascript
var temp = true;
const yearSelect = document.getElementById('yearSelect');
const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const dateChoose = document.getElementById('dateChoose');
```

- 給預設字
```javascript
dateChoose.innerText = "請選擇日期";
```

- 點擊select呼叫方法
這邊是把{% label danger @temp%}狀態從{% label danger @true改成false%}，若為false時，則字就變成選擇中，若為true時，則字就變成選擇的日期
```javascript
yearSelect.addEventListener("click", select);
//是否選擇中狀態
function select() {
  temp = !temp;
  !temp ? dateChoose.innerText = "選擇中..." : chose();
};
//換字
function chose() {
  !yearSelect.value || !monthSelect.value || !daySelect.value ?
    dateChoose.innerText = "請選擇日期" :
    dateChoose.innerText = `${yearSelect.value}年${monthSelect.value}月${daySelect.value}日`;
};

```
<h3 style="color: red;">重點來了!!</h3>

- 當document被點擊時，判斷是否在select外面
這邊可以console出來看看有沒有點在外面
```javascript
 document.addEventListener("click", function (e) {
    notId(e, "外面")
  });
  //判斷空白處
function notId(e, text) {
  let id = e.target.id;
  if (id != yearSelect.id && id != monthSelect.id && id != daySelect.id) {
    temp = true;
    chose();
    console.log(text);
  }
};

```
## 解決無選擇日期直接滾動滾輪，選擇中狀態卻無消失

- 判斷是否在select外面使用滾輪事件
這裡的滾輪不是指視窗中的捲軸，所以用scroll是沒有用的
```javascript
  window.addEventListener("mousewheel", function (e) {
    notId(e, "滾輪")
  });

```


看到這裡你會發現怎麼那麼麻煩阿!而且在select上面直接滾動滑鼠滾輪(不是下拉選單歐)，一樣會壞掉，是因為我們剛剛function已經排除掉select部分，所以當然選單收起來一樣會出現選擇中，那為什麼不直接用&lt;div&gt;及&lt;ul&gt;就好?

對欸!突破盲腸了!各位! <img src="/sticker/shock-square.gif" class="sticker"/> 
而且select還不能客製樣式!不就打臉自己嗎?好啦~ 這個故事告訴我們要多多善用div哈哈哈..XD(打)

 ------
 
  參考資料: 
  我的codepen連結[datePicker](https://codepen.io/JingWunHsiao/pen/gOXVRGK)
  
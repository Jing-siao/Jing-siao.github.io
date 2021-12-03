---
title: vue cli裡的 ~@ 是什麼意思? 談談vue cli的路徑
index_img: /img/post/vuecli裡@意思/6128107.png
banner_img: /img/post/vuecli裡@意思/vue.png
tags:
  - - vue
  - - js
  - - css
categories:
  - 筆記
  - learn
  - vue
---
# vue cli裡的 ~@ 是什麼意思? 談談vue cli的路徑

前幾天踩到路徑的坑，在vue cli中引入字體一直噴錯(等下會講)，所以決定來寫一下紀錄。

## 引用路徑方式

在vue中有以下幾種方式引用路徑

- 絕對路徑
- 相對路徑
- ~開頭的模組
- @開頭的模組

## @為src資料夾的縮寫

例如你的檔案結構很深，用相對路徑就必須用 {% label danger @../ %} 一直點下去會到天荒地老 <img src="/sticker/zzz.gif" class="sticker"/>，所以webpack已經幫你包好，<span class="label label-danger">@就是src</span> 的別名

例如
```javascript
@import '../../../../assets/css/main.scss'
```
可以簡寫成
```javascript
@import '@/assets/css/main.scss'
```
來個例子
{% note warning %}
錯誤寫法: 
{% endnote %}

會被當作字串而不是路徑，需要在外面加層 {% label danger @require( ) %}

```vue
<template>
  <img :src="imgSrc" />
<template>

<script>
const src = '@/assets/img/logo.png';
export default {
  data() {
    return {
      imgSrc: src,
    };
  },
};
</script>
```
{% note success %}
正確寫法: 
{% endnote %}

```vue
<template>
  <img :src="imgSrc" />
<template>

<script>
const src = require('@/assets/img/logo.png');
export default {
  data() {
    return {
      imgSrc: src,
    };
  },
};
</script>
```
如果不綁定，直接寫在裡面也行
```vue
<template>
  <img src="@/assets/img/logo.png" />
<template>
```
## ~ 開頭，以後的内容都會被當作模組請求被解析

在css以及html中是不能只寫<span class="label label-danger">@</span> 的，會找不到路徑而報錯，來看以下例子

原本我是寫:
```css
@font-face {
  font-family: "Noto Sans TC";
  src: url(../../font/NotoSansTC-Regular.otf) format("OpenType");
}
```
然而會出現錯誤如圖
![報錯](/img/post/vuecli裡@意思/error.jpg)




------

  參考資料: 
  [react+less中使用动态路径（波浪线~的使用）](https://blog.csdn.net/qq_21567385/article/details/108393932)
  [Vue Cli 从相对路径导入](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E4%BB%8E%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E5%AF%BC%E5%85%A5)
  [webpack中的css引入文件需要用~@的形式，为什么？](https://juejin.cn/post/6844903718152830989)


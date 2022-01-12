---
title: 解決Vue在Axios之後，props接不到資料
tags:
  - - vue
  - - js
index_img: /img/post/vuecli裡@意思/6128107.png
banner_img: /img/post/vuecli裡@意思/vue.png
categories:
  - 筆記
  - learn
  - vue
---

# 解決Vue在Axios之後，props接不到資料

預想是: 在父組件created使用Axios傳API，回傳後再props給子組件，之後再秀在畫面上，然而props出來卻是空的，以下來看看console

## 生命週期
![子層找不到](/img/post/vueProps接不到資料/console1.jpg)

因為是Axios非同步問題，可以看到子層先created，所以當然接不到props

## 解決辦法 加上watch

在子組件加上watch偵聽props，資料就可以呈現囉!

```vue
  watch: {
    test(newVal) {
      if (newVal) {
        console.log('watch', newVal);
      }
    },
  },

```

![watch](/img/post/vueProps接不到資料/console2.jpg)




  ------
  
  參考資料: 
  [Vue 父子組件生命週期之關係](https://medium.com/@seed45699/vue-%E9%9D%9E%E5%90%8C%E6%AD%A5%E8%99%95%E7%90%86%E5%92%8C%E7%88%B6%E5%AD%90%E7%B5%84%E4%BB%B6%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F%E4%B9%8B%E9%97%9C%E4%BF%82-5bd5fea513c6)
  [How to listen for 'props' changes](https://stackoverflow.com/questions/44584292/how-to-listen-for-props-changes)

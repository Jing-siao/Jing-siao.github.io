---
title: 如何在vscode切換github帳號
tags:
  - - vscode
  - - github
index_img: /img/post/切換github帳號/封面.jpg
banner_img: /img/post/切換github帳號/封面.jpg
categories:
  - 筆記
  - vscode
date: 2022-01-24 17:11:37
keywords:
description:
---

# 如何在vscode切換github帳號

假設你有一個自己的github帳戶和公司的github帳戶，因為同一台電腦，每次上傳都只用自己的github帳戶上傳，兩個又不想要混一起用，那怎麼辦呢?

## 安裝套件 git-autoconfig

![git-autoconfig](/img/post/切換github帳號/git-autoconfig.jpg)

## 設定github帳號

ctrl+p先叫出搜尋視窗，在視窗輸入 {% label danger @>git %} 找到 {% label danger @git-autoconfig:Set Config %}

![Set Config](/img/post/切換github帳號/set.jpg)

之後輸入email跟name

![輸入email](/img/post/切換github帳號/輸入email.jpg)
![輸入name](/img/post/切換github帳號/輸入name.jpg)

好了之後可以在settings.json(File > Preferences > Setting)看到剛剛新增的，找不到settings.json的，右上方有一個文件旋轉的按鈕open settings(JSON)，點下去就可以看到了
![settings](/img/post/切換github帳號/帳號.jpg)

然後再重複剛剛的動作新增第二個帳號，你也可以在settings.json裡自己輸入

## 切換github帳號

設定好後，要來push上去了，假設你今天要用另一個帳號push，作法一樣ctrl+p先叫出搜尋視窗，在視窗輸入 {% label danger @>git %} 找到 {% label danger @git-autoconfig:Set Config %}，這時候可以選擇你要用哪一個帳號上傳

![切換帳號](/img/post/切換github帳號/切換.jpg)

按下Enter鍵後，就可以push了，在github commit上面看就會是不同帳號囉!是不是很簡單呀~

------

  參考資料: 
  [Can I log in two different github account in vscode?](https://stackoverflow.com/questions/62625513/can-i-log-in-two-different-github-account-in-vscode)

---
title: yaml是什麼? 能吃嗎? 和json有甚麼不同
tags:
  - - yaml
  - - json
categories:
  - data
  - learn
date: 2021-11-24 15:59:34
---

# yaml是什麼? 能吃嗎? 和json有甚麼不同

相信大家對於json一定不陌生，但甚麼是yaml呢?
程式小菜鳥的我第一次看到yaml覺得跟json好像，根本是同父異母的兄弟阿! <img src="/sticker/shock-square.gif" class="sticker"/> (好吧...可能只有我不知道)

## yaml簡介

- 全名: YAML Ain't a Markup Language
- 為資料庫或設定檔
- 簡單易讀

## yaml與json比較

上面為yaml,下面為json 是不是超級像! <img src="/sticker/4b7669c29fe80.gif" class="sticker"/>

```yaml
name: Jing
age: 18
female: true
friends: [小美, 小明, 小黑]
fruit: 
  - banan
  - apple
  - cherry
languages: 
  javascript: 還行
  python: 入門
social: 
  - platform: github
    url: https://github.com/Jing-siao
  - platform: email
    url: vicky820715@gmail.com
```

```json
{
    "name": "Jing",
    "age": 18,
    "female": true,
    "friends": ["小美", "小明", "小黑"],
    "fruit": [
		"banan",
         "apple",
         "cherry",
    ],
    "languages": {
		"javascript": "還行",
		"python": "入門"
     },
    "social": [
        {
          "platform": "github"
          "url": "https://github.com/Jing-siao"
        },
        {
          "platform": "email"
          "url": "vicky820715@gmail.com"
        }  
    ]
}
```



## yaml語法

- ### key-value pair

  key冒號空格value,注意冒號後面一定要有{% label danger @空格 %}歐
  
- ### 每一個key-value 不能在同一行

  記得打完一行要換行，不像json可以擠在同一行

- ### 字串不需要包在引號之內

  常見的字串一定要包在單引號或雙引內，但yaml不需要

  ```yaml
  name: Jing  #字串
  age: 18  #key: value
  ```

- ### #為註解

  只要在前方加上{% label danger @# %}就可以註解囉

  ```yaml
  #我是註解
  ```

- ### key值不能重複

  key的名稱不能一樣  

  {% note warning %}

  錯誤寫法: 
  
  {% endnote %}
  
    ```yaml
    age: 18  
    age: 18  
    ```
  正確寫法:
  
    ```yaml
    age1: 18  
    age2: 18  
    ```
  
  但如果在陣列裡就可以
  
  像這樣有兩組platform,跟json的物件是一樣意思
  
   ```yaml
    social: 
      - platform: github
        url: https://github.com/Jing-siao
      - platform: email
        url: vicky820715@gmail.com
   ```
  
- ### [ ]或 - 為陣列形式

  在yaml有兩種陣列表達方式

  ```yaml
  friends: [小美, 小明, 小黑]
  ```

  或

  ```yaml
  friends: 
  	- 小美
  	- 小明
  	- 小黑
  ```

  這兩種是一樣的意思歐
  
- ### 多行資料的表示方法

  字太長怎麼辦?剛剛上面不是有講說一定要一行key-value嗎?可是人家就想換行咩! ( T 3 T )

  - {% label danger @| %} 保留換行 ，不同的縮排會保留差異

    ```yaml
    string: |
      My name is Jing.
      I'm 18 years old.
    ```
    結果為
    ```html
    My name is Jing.
    I'm 18 years old.
    ```
    
    
  - {% label danger @> %} 不換行 ，換行會被轉換成空白，只有空白行才視為換行
  ```yaml
  string: |
  	My name is Jing.
  	I'm 18 years old.
  	  I am a coder.
  	  
  	I write code.
  ```
  結果為
  ```html
   My name is Jing.I'm 18 years old.
   I am a coder.
   I write code.
  ```
  
  
  
  ------
  
  常用的大概這樣，希望這些對大家有所幫助! <img src="/sticker/happy-jump.gif" class="sticker"/>
  
  
  
  
  
  參考資料: 
  [yaml維基百科](https://zh.wikipedia.org/wiki/YAML)
  [Home Assistant (HA): 什麽是YAML？和JSON格式有什麽不同？【明富其識】](https://www.youtube.com/watch?v=qyIUwTjn6dM&ab_channel=%E8%80%81%E6%98%8E)

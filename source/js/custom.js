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



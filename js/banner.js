var n = 0;
var next = document.getElementById("next")
var prev = document.getElementById("prev")
var liList = document.querySelectorAll("#imgwrap li")
var big = document.querySelectorAll("#dotWrap li")
var dotWrap = document.getElementById("dotWrap")
for (var i = 0; i < liList.length; i++) {
    var yuandian = document.createElement("li");
    dotWrap.appendChild(yuandian);
    if (!i) {
        yuandian.className = "dian"
    }
    yuandian.setAttribute("data-index", i)
    yuandian.onclick = function () {
        n = Number(this.getAttribute("data-index"))
        add()
    }
}
var big = document.querySelectorAll("#dotWrap li");
function add() {
    for (i = 0; i < liList.length; i++) {
        //将所有ul中的li和ol中的li遍历出来，全部杀掉
        liList[i].className = ""
        big[i].className = ""
    }
    //n为图片张数，此时已经将上面的class全部杀掉，将要显示的图片的张数赋值给当前li，为这个li添加class
    liList[n].className = "show"
    big[n].className = "dian"

}
//箭头点击事件，以及边界情况的处理
next.onclick = function () {
    if (n !== liList.length - 1) {
        n++
    }
    else {
        n = 0
    }
    add()
}
//箭头点击事件，以及边界情况的处理
prev.onclick = function () {
    if (n === 0) {
        n = liList.length - 1;
    } else {
        n--
    }
    add()
}
//绑定键盘事件
document.onkeydown = function (event) {
    if (event.keyCode === 39) {
        left.click()
    }
    if (event.keyCode === 37) {
        right.click();
    }
}

var zhang = setInterval(function () {
    next.click()
}, 3000)
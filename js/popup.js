window.onload = function () {
    const menu = document.getElementById("menu");

    menu.onclick = function (event) {
        event = event || window.event // 额...理解不了的话，你当这个是一个DOM对象
        const target = event.target // 获得点击的最底层DOM

        if (target.nodeName === 'LI') {// 判断这个DOM节点名字是不是li，
            const index = target.getAttribute('data-index')
            switch (index){
                case "seo-tool":
                    window.open('/html/seo.html')
            }
        }
    }

}
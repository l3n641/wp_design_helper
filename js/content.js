const copySiteName = () => {
    const node = document.querySelector("#wp-admin-bar-site-name > a")
    if (node) {
        alert(node.text)
        copyToClipboard("heelow")
    }
}


window.onload = () => {
    copySiteName()
}


function copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd == 'copyLink') {
        const links = getSelectedLinks()
        let categoryStr = ''
        if (links && links.length > 1) {
            for (const subCategory of links) {
                categoryStr = categoryStr + `${subCategory.text.trim()}\t${subCategory.href.trim()}\n`
            }
            sendResponse(links)
        }
        copyToClipboard(categoryStr)
        console.log(categoryStr)

    }
})


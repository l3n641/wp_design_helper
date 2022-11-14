import { seoList } from '/js/seo_list.js'
import { dict } from "/js/dictionary.js"

window.onload = function () {
    const form = document.getElementById("seo_form");
    const translate = document.getElementById("translate");

    form.onsubmit = function (event) {
        clearTable("seo-table")
        const formData = new FormData(form)
        const lang = formData.get("lang").toUpperCase()
        const keywords = formData.get("keyword").split(" ")
        const columns = formData.getAll("column")
        const tableData = getTableData(lang, keywords, columns)
        for (const data of tableData) {
            addTableRow(data)
        }
        event.preventDefault()
    }

    translate.onclick = translateKeyword

}

const getTableData = (lang, keywords, columns) => {
    let data = []
    for (const item of seoList) {
        //语言不匹配就跳过
        if (lang && lang != item.lang) {
            continue
        }

        let state = true
        for (const column of columns) {
            const str = item[column]
            let status = isMatch(str, keywords)
            if (!status) {
                state = false
            }

        }
        if (state) {
            data.push(item)
        }

    }

    return data

}

const isMatch = (str, keywords) => {
    str = str.toLowerCase()
    for (const keyword of keywords) {
        if (!str || str.search(keyword.toLowerCase()) == -1) {
            return false
        }
    }
    return true
}


const addTableRow = (item) => {
    const tab = document.getElementById("seo-table");
    const tr = document.createElement("tr");
    for (const attr in item) {
        let td = document.createElement("td");
        td.innerHTML = item[attr]
        tr.appendChild(td);
    }
    tab.appendChild(tr);

}

const translateKeyword = () => {
    const keyword = document.querySelector("#keyword").value.trim().toLowerCase()
    const selector = document.querySelector("#lang")
    const lang = selector.options[selector.selectedIndex].value;
    if (!lang) {
        alert("请选择要翻译的语言")
        return false
    }
    let result = ""
    if (keyword in dict) {
        const data = dict[keyword]
        const items = data[lang]
        const index = Math.floor((Math.random() * items.length))
        result = items[index]

    }
    document.querySelector("#keyword").value = result
}

const clearTable = (tableId) => {
    var objTable = document.getElementById(tableId)
    var length = objTable.rows.length
    for (var i = 1; i < length; i++) {
        objTable.deleteRow(1)
    }
}
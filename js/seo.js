import {seoList} from '/js/seo_list.js'

window.onload = function () {
    const form = document.getElementById("seo_form");

    form.onsubmit = function (event) {
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



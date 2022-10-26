// 右键菜单管理
chrome.contextMenus.create({
    id: 'home', title: "home页面",
});

chrome.contextMenus.create({
    id: 'admin', title: "admin页面",
});

chrome.contextMenus.create({
    id: 'pages', title: "all pages页面",
});

chrome.contextMenus.create({
    id: 'plugin_install', title: "plugin install页面",
});

chrome.contextMenus.create({
    id: 'create_menu', title: "create menu页面",
});

chrome.contextMenus.create({
    id: 'widgets', title: "widgets页面",
});

chrome.contextMenus.create({
    id: 'customize', title: "customize页面",
});

chrome.contextMenus.create({
    id: 'permalink', title: "permalink页面",
});

chrome.contextMenus.create({
    id: 'woo_settings', title: "woo settings页面",
});

chrome.contextMenus.create({
    id: 'postman_config', title: "postman页面",
});

chrome.contextMenus.create({
    id: 'contact', title: "contact页面",
});

chrome.contextMenus.create({
    id: 'all_tabs', title: "all tabs页面",
});

chrome.contextMenus.create({
    id: 'clear_cache', title: "清除缓存",
});


function contextClick(info, tab) {
    const {menuItemId} = info
    const menus = {
        home: "/",
        admin: "/wp-admin/",
        pages: "/wp-admin/edit.php?post_type=page",
        plugin_install: "/wp-admin/plugin-install.php",
        create_menu: "/wp-admin/themes.php?page=woo-create-menu",
        menu: "/wp-admin/nav-menus.php",
        widgets: "/wp-admin/widgets.php",
        customize: "wp-admin/customize.php",
        clear_cache: "/wp-admin/themes.php?page=woo-tools",
        permalink: "/wp-admin/options-permalink.php",
        woo_settings: "/wp-admin/admin.php?page=wc-settings",
        postman_config: "/wp-admin/options-general.php?page=postman%2Fconfiguration",
        contact: "/wp-admin/admin.php?page=wpcf7",
        all_tabs: "/wp-admin/edit.php?post_type=ywtm_tab",
    }
    const uri = menus[menuItemId]
    getCurrentTab().then(res => {
        const urlInfo = new URL(res.url)
        const targetUrl = urlInfo.origin + uri
        chrome.tabs.create({
            url: targetUrl
        });
    })
}

chrome.contextMenus.onClicked.addListener(contextClick)


async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


var contextMenuSetting = {
    id: "spendMoney",
    title: "Spend Mpney",
    // look up google develop page for more infomation
    contexts: ["selection"]
}

chrome.contextMenus.create(contextMenuSetting);
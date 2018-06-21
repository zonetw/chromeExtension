var contextMenuSetting = {
    id: "spendMoney",
    title: "Spend Mpney",
    // ContextType
    // Enum "all", "page"(default), "frame", "selection", "link", "editable", "image", "video", "audio", "launcher", "browser_action", or "page_action"
    contexts: ["selection", "page"]
}

chrome.contextMenus.create(contextMenuSetting);


function isInt(input){
    let result = !isNaN(input) && parseInt(Number(input)) == Number(input) && !isNaN(parseInt(input, 10));
    return result;
}

chrome.contextMenus.onClicked.addListener((clickedData)=>{
    if(clickedData.menuItemId == contextMenuSetting.id){
        let  selectionText = clickedData.selectionText
        if(selectionText && isInt(selectionText)){
            chrome.storage.sync.get(["total", "limit"], (result)=>{
                let oldTotal = result.total || 0;
                let selectCost = parseInt(selectionText);
                let limit = result.limit || 0;
                let newTotal = oldTotal + selectCost;
                if(newTotal > limit){
                    //spend too much, just notify, don't record
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "broccoli.png",
                        title: "Limit Reach",
                        message: "you spend too much"
                    });
                }

                chrome.storage.sync.set({
                    total: newTotal
                });                
            });
        }
    }
    
});

chrome.storage.onChanged.addListener((changes, storageName)=>{
    // Items in the sync storage area are synced using Chrome Sync !!
    console.log(storageName); //sync    

    chrome.browserAction.setBadgeText({text: changes.total.newValue.toString()});
});

chrome.storage.sync.get("total", (result)=>{
    chrome.browserAction.setBadgeText({text: result.total.toString()});
});
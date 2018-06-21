var contextMenuSetting = {
    id: "spendMoney",
    title: "Spend Mpney",
    // look up google develop page for more infomation
    contexts: ["selection"]
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
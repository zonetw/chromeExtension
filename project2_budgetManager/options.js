$(()=>{
    chrome.storage.sync.get("limit", (result)=>{
        $("#limit").val(result.limit);
    });

    $("#saveLimit").click(()=>{
        let limit = parseInt($("#limit").val());
        if(limit){
            chrome.storage.sync.set({"limit":limit}, ()=>{
                close();
            });
        }
    });

    $("#resetTotal").click(()=>{
        chrome.storage.sync.set({total: 0});
    });
});
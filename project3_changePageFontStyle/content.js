chrome.runtime.sendMessage({action: "showPage"});

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.todo === "changeColor"){
        let addColor = "#" + request.changedColor;
        $(".api").css("color", addColor);
    }
});

$(()=>{
    let color = $("#fontColor").val();
    $("#fontColor").on("change paste keyup", ()=>{
        color = $("#fontColor").val();
    });

    $("#btnChange").click(()=>{
        console.log(111);
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", changedColor: color});
        });
    });
})
const ID = "speak";

var contextMenuSetting = {
    id: ID,
    title: "Speak",
    contexts: ["selection"]
}
chrome.contextMenus.create(contextMenuSetting);

chrome.contextMenus.onClicked.addListener((clickedData)=>{
    let selectText = clickedData.selectionText;
    if(clickedData.menuItemId === ID && selectText){
        chrome.tts.speak(selectText, {rate: 0.7});
    }
});
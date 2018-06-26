const ID = "wikit";
const WIKI_URL_PREFIX = "https://zh.wikipedia.org/wiki/";

function fixedEncodeURI(str){
    return encodeURI(str).replace(/%5B/g,"[").replace(/%5D/g,"]");
}

var contextMenuSetting = {
    id: ID,
    title: "Wikit",
    contexts: ["selection"]
}

chrome.contextMenus.create(contextMenuSetting);

chrome.contextMenus.onClicked.addListener((clickedData)=>{
    let selectText = clickedData.selectionText;
    if(clickedData.menuItemId === ID && selectText){
        var wikiItemUrl = WIKI_URL_PREFIX + fixedEncodeURI(selectText);
        var popupWindowSetting = {
            url: wikiItemUrl,
            type: "popup",
            top: 5,
            left: 5,
            width: screen.availWidth/2,
            height: screen.availHeight/2
        }

        chrome.windows.create(popupWindowSetting, ()=>{
            //empty
        });
    }
});
$(()=>{
    //This method is not sunc method ...
    chrome.storage.sync.get(["total", "limit"], (budget)=>{
        $("#total").text(parseInt(budget.total) || 0 );
        $("#limit").text(parseInt(budget.limit) || 0);
    });

    // my own thought
    // chrome.storage.sync.get("limit", (result)=>{
    //     let limit = 0;
    //     if(result.limit){
    //         limit = result.limit;
    //     }

    //     $("#limit").text(limit);
    // });

    $("#addCost").click(()=>{
        chrome.storage.sync.get(["total", "limit"], (budget)=>{
            let newTotal;
            if(budget.total){
                newTotal = parseInt(budget.total);
            }else{
                newTotal = 0;
            }

            let amount;
            amount = $("#amount").val();
            if(amount){
                newTotal += parseInt(amount);
            }

            if(newTotal > budget.limit){
                var notifOptions = {
                    type: "basic",
                    iconUrl: "broccoli.png",
                    title: "limit reach",
                    message: "You reach your limit"
                }
                chrome.notifications.create("limitNotif", notifOptions);
            }
            
            chrome.storage.sync.set({
                total: newTotal
            });

            $("#total").text(newTotal);
            $("#amount").val("");
        })
    })
})
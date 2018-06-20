$(()=>{
    //This method is not sunc method ...
    chrome.storage.sync.get(["total", "limit"], (budget)=>{
        $("#total").text(parseInt(budget.total));
        $("#limit").text(parseInt(budget.limit));
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
        chrome.storage.sync.get("total", (budget)=>{
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

            chrome.storage.sync.set({
                total: newTotal
            });

            $("#total").text(newTotal);
            $("#amount").val("");

        })
    })
})
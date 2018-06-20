$(()=>{
    //This method is not sunc method ...
    chrome.storage.sync.get("total", (budget)=>{
        if(budget.total){
            $("#total").text(parseInt(budget.total));
        }
    });

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
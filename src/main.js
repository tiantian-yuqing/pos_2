//TODO: Please write code in this file.

printInventory = function(inputs){
    var allItems = loadAllItems();
    var arr={};

    for( var k = 0 ; k < inputs.length ; k++){
        var barcode = inputs[k].substring(0,10);
        var number = parseInt(inputs[k].substring(11)) || 1;
        var my_buy_item = arr[barcode] || new My_Item(null,0,null,null);
        my_buy_item.name = barcode;
        my_buy_item.number += number;
        arr[barcode] = my_buy_item;
    }

    var promotion = loadPromotions()[0].barcodes;
    for(var i = 0; i < promotion.length; i++) {
        if(arr[promotion[i]]) {
            arr[promotion[i]].promotion = true;
        }
    }

    for( var i = 0;i < allItems.length ; i++){
        if(arr[allItems[i].barcode]) {
            arr[allItems[i].barcode].name = allItems[i].name;
            arr[allItems[i].barcode].unit = allItems[i].unit;
            arr[allItems[i].barcode].price = allItems[i].price;
        }
    }

    var arr_free = [];
    for(var item in arr) {
        if(arr[item].promotion) {
            arr[item].free_number = parseInt(arr[item].number/3);
            arr_free.push(arr[item]);
        }
        arr[item].total = arr[item].price * (arr[item].number - arr[item].free_number);
    }

    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };

    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    var total_price = 0; var save_price = 0 ;
    var printText =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' ;
        for(var item in arr){
            printText += '名称：' + arr[item].name
                +'，数量：' + arr[item].number+ arr[item].unit
                +'，单价：' + arr[item].price.toFixed(2)
                +'(元)，小计：' + arr[item].total.toFixed(2)+'(元)\n' ;
            total_price += arr[item].total;
        }
        printText +=   '----------------------\n' +
         '挥泪赠送商品：\n' ;
        for(var i in arr_free){
            printText += '名称：' + arr_free[i].name
                +'，数量：' + arr_free[i].free_number+ arr_free[i].unit+ '\n' ;
             save_price = save_price + arr_free[i].free_number * arr_free[i].price;

        }
        printText +=
          '----------------------\n' +
          '总计：'+total_price.toFixed(2)+'(元)\n' +
          '节省：'+save_price.toFixed(2)+'(元)\n' +
          '**********************';
        console.log(printText);

};


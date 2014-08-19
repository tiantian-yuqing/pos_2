//TODO: Please write code in this file.

printInventory = function(inputs) {
    var arr = {};
    for (var i = 0; i < inputs.length; i++) {
        var barcode = inputs[i].slice(0, 10);
        arr[barcode] = arr[barcode] || new My_Item(null, 0, null, null);
        arr[barcode].name = barcode;
        arr[barcode].number += parseInt(inputs[i].slice(11)) || 1;
    }

    var allItems = loadAllItems();
    for (var value in allItems) {
       if (arr[allItems[value].barcode] ){
           arr[allItems[value].barcode].name  = allItems[value].name;
           arr[allItems[value].barcode].price = allItems[value].price;
           arr[allItems[value].barcode].unit  = allItems[value].unit;
       }
    }

    var promotion = loadPromotions()[0].barcodes;
    for(var value in promotion){
        if( arr[promotion[value]] ){
           arr[promotion[value]].promotion = true ;
        }
    }

    for(var value in arr){
        if(arr[value].promotion){
            arr[value].free_number = parseInt(arr[value].number/3);
        }
        arr[value].total = arr[value].price * (arr[value].number - arr[value].free_number);
        arr[value].free_price = arr[value].price * arr[value].free_number ;
        console.log( arr[value].free_price)
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
        '挥泪赠送商品：\n';
    for(var item in arr){
        if(arr[item].promotion){
        printText += '名称：' + arr[item].name
            +'，数量：' + arr[item].free_number+ arr[item].unit+ '\n' ;
           save_price += arr[item].free_price;
        }
    }
    printText +=
        '----------------------\n' +
        '总计：'+total_price.toFixed(2)+'(元)\n' +
        '节省：'+save_price.toFixed(2)+'(元)\n' +
        '**********************';
    console.log(printText);
  };






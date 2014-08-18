//TODO: Please write code in this file.

printInventory = function(inputs){
    var allItems = loadAllItems();
    var arr={};

    inputs = inputs.sort();                               //对inputs数组排序 找到条形码对应的数量
    for( var k = 0 ; k < inputs.length ; k++){
        var barcode = inputs[k].substring(0,10);
        var number = parseInt(inputs[k].substring(11)) || 1;
        var my_buy_item = arr[barcode] || new My_Item(null,0,null,null);
        my_buy_item.name = barcode;
        my_buy_item.number += number;
        arr[barcode] = (my_buy_item);             //此时数组里存的是每种商品对应的条形码和数量
    }



    var arr_free = [];
    var promotion = loadPromotions()[0].barcodes;
    for(var ii = 0; ii < promotion.length; ii++) {
        if(arr[promotion[ii]]) {
            arr[promotion[ii]].promotion = true;
        }
    }

    for(var item in arr) {
        if(arr[item].promotion) {
            arr[item].free_number = parseInt(arr[item].number/3);
            arr_free.push(arr[item]);
        }
    }

    for( var i = 0;i < allItems.length ; i++){              //把inputs的条形码与items对应起来，找到名称单位数量
        if(arr[allItems[i].barcode]) {
            arr[allItems[i].barcode].name = allItems[i].name;
            arr[allItems[i].barcode].unit = allItems[i].unit;
            arr[allItems[i].barcode].price = allItems[i].price;
        }
    }   //此时arr数组显示的是实际买的商品的'名称，数量 单位，单价
        //此时arr_free数组显示的是优惠商品的'名称，数量 单位'

    for(var item in arr) {
        arr[item].total = arr[item].price * (arr[item].number - arr[item].free_number);
        //console.log( arr[item]);
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

    var totalprice = 0; var saveprice = 0 ;
    var printText =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' ;
        for(var item in arr){
            //console.log(item);
            printText += '名称：' + arr[item].name
                +'，数量：' + arr[item].number+ arr[item].unit
                +'，单价：' + arr[item].price.toFixed(2)
                +'(元)，小计：' + arr[item].total.toFixed(2)+'(元)\n' ;
            totalprice += arr[item].total;
        }
        printText +=   '----------------------\n' +
         '挥泪赠送商品：\n' ;
        for(var i in arr_free){
            //console.log(arr_free[i]);
            printText += '名称：' + arr_free[i].name
                +'，数量：' + arr_free[i].free_number+ arr_free[i].unit+ '\n' ;
             saveprice = saveprice + arr_free[i].free_number * arr_free[i].price;

        }
        printText +=
          '----------------------\n' +
          '总计：'+totalprice.toFixed(2)+'(元)\n' +
          '节省：'+saveprice.toFixed(2)+'(元)\n' +
          '**********************';
        console.log(printText);

};


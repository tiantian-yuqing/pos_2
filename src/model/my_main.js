//TODO: Please write code in this file.

printInventory = function(inputs) {
    var arr = {};
    _(inputs).each(function(input_barcode){
        var barcode = input_barcode.slice(0, 10);
        arr[barcode] = arr[barcode] || new My_Item(null, 0, null, null);
        arr[barcode].name = barcode;
        arr[barcode].number += parseInt(input_barcode.slice(11)) || 1;
    });

    var allItems = loadAllItems();
    _(allItems).each(function(item){
        if (arr[item.barcode] ){
            arr[item.barcode].name  = item.name;
            arr[item.barcode].price = item.price;
            arr[item.barcode].unit  = item.unit;
        }
    });

    var promotion = loadPromotions()[0].barcodes;
    _(promotion).each(function(barcode){
        if( arr[barcode] ){
            arr[barcode].promotion = true ;
        }
    });

    _(arr).each(function(ellement){
        if(ellement.promotion){
            ellement.free_number = parseInt(ellement.number/3);
        }
        ellement.total = ellement.price * (ellement.number - ellement.free_number);
        ellement.free_price = ellement.price * ellement.free_number ;
    });


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






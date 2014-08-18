//TODO: Please write code in this file.

printInventory = function(inputs){
    var allItems = loadAllItems();
    var arr=[];          //My_Item(name, number, unit, price)
    var s ;

    inputs = inputs.sort();                               //对inputs数组排序 找到条形码对应的数量
    for( var k = 0 ; k < inputs.length ; k = s ){
        var my_buy_item = new My_Item(null,1,null,null);
           my_buy_item.name = inputs[k];
        for(  s = k+1; s < inputs.length ; s++){
            if( inputs[k] == inputs [s]){
                my_buy_item.number = my_buy_item.number +1;
            }
            else {
                break;
            }
        }
        arr.push(my_buy_item);             //此时数组里存的是每种商品对应的条形码和数量
    }

    var arr_free = [];
    var promotion = loadPromotions()[0];
    for( var i = 0 ; i < arr.length ; i++){
        if(arr[i].number > 2){
            var my_free_item = new My_Item();   //My_free_Item(name, number, unit)
            for( var j = 0;j < promotion.barcodes.length ; j++){
                if(arr[i].name == promotion.barcodes[j] ){
                    my_free_item.name = arr[i].name ;
                    my_free_item.number = parseInt(arr[i].number/3);
                    arr_free.push(my_free_item);
                }
            }
        }
    }

    for( var i = 0 ;i < arr_free.length ; i++){       //把inputs里free商品的条形码与items对应起来，找到名称单位数量
        for( var j = 0 ;j < allItems.length ; j++){
            if(arr_free[i].name == allItems[j].barcode){
                arr_free[i].name = allItems[j].name;
                arr_free[i].unit = allItems[j].unit;
                arr_free[i].price = allItems[j].price;
                arr_free[i].total = arr_free[i].price * arr_free[i].number ;
            }
        }
    }

    for( var i = 0;i < arr.length ; i++){              //把inputs的条形码与items对应起来，找到名称单位数量
        for( var j = 0;j < allItems.length ; j++){

            if(arr[i].name.slice(10,11) == '-'){
                    arr[i].number = parseInt(arr[i].name.slice(11,12));
            }
             if(arr[i].name.slice(0,10) == allItems[j].barcode){
                arr[i].name = allItems[j].name;
                arr[i].unit = allItems[j].unit;
                arr[i].price = allItems[j].price;
                 break;
             }
        }
    }   //此时arr数组显示的是实际买的商品的'名称，数量 单位，单价
        //此时arr_free数组显示的是优惠商品的'名称，数量 单位'

    for( var i = 0;i < arr.length ; i++){      //总价=单价*（买的数量-优惠的数量）
        for( var j = 0;j < arr_free.length ; j++){
            if(arr[i].name == arr_free[j].name){
                arr[i].total = arr[i].price * (arr[i].number - arr_free[j].number);
                break ;
            }
            else {
                  arr[i].total = arr[i].price * arr[i].number ;
            }
        }
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
        for(var i = 0;i < arr.length; i++){
            printText += '名称：' + arr[i].name
                +'，数量：' + arr[i].number+ arr[i].unit
                +'，单价：' + arr[i].price.toFixed(2)
                +'(元)，小计：' + arr[i].total.toFixed(2)+'(元)\n' ;
            totalprice = totalprice + arr[i].total;
        }
        printText +=   '----------------------\n' +
         '挥泪赠送商品：\n' ;
        for(var i = 0;i < arr_free.length; i++){
            printText += '名称：' + arr_free[i].name
                +'，数量：' + arr_free[i].number+ arr_free[i].unit+ '\n' ;
             saveprice = saveprice + arr_free[i].total;

        }
        printText +=
          '----------------------\n' +
          '总计：'+totalprice.toFixed(2)+'(元)\n' +
          '节省：'+saveprice.toFixed(2)+'(元)\n' +
          '**********************';
        console.log(printText);

};



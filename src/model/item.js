function Item(barcode, name, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
}

function My_Item(name, number, unit, price) {
    this.name = name;
    this.number = number;
    this.unit = unit;
    this.price = price || 0.00;
    this.total = (this.price) * (this.number) ;
    this.promotion = false;
    this.free_number = 0;
    this.free_price = (this.price) * (this.free_number) ;
}


$(document).ready(function () {
    console.log('===================');
    var jdata = loadJData('jdata');
    console.log(jdata);
   loadCart();
});
var cart = {};

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    console.log('loadcart');
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    //вывод корзины
        console.log('Showcart');
     if (!isEmpty(cart)) {
         $('.main-cart').html('Корзина пуста!');
     }
     else {
        //$.getJSON('goods.json', function (data) {
            var goods = loadJData ('jdata');
            console.log(goods);
            var out = '<h1>Корзина</h1>';
            for (var id in cart) {
                out += `<button data-id="${id}" class="del-goods">x</button>`;
                out += `<img src="/img/${goods[id].img}">`;
                out += ` ${goods[id].name  }`;
                out += ` ${cart[id]  }`;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
        //};
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}
function saveJData(jdata) {
    localStorage.setItem('jdata', JSON.stringify(jdata));
};

function loadJData(key) {
    if (localStorage.getItem(key)) {
        keydata = JSON.parse(localStorage.getItem(key));
       return keydata;
    }
}
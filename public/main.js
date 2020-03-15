document.addEventListener('DOMContentLoaded', function(){

    //Select
    let fromSelect = document.querySelector('#f');
    let toSelect = document.querySelector('#t');

    //inputs
    let from = document.querySelector('#from');
    let to = document.querySelector('#to');

    from.addEventListener('change',  getCurrency);

    fromSelect.addEventListener('change', getCurrency);
    toSelect.addEventListener('change',  getCurrency);

    from.addEventListener('input', getCurrency);


   function getCurrency() {
       if(fromSelect.value !== toSelect.value && from.value !== ''){

           //AJAX запрос на сервер

           let xhr = new XMLHttpRequest();
           xhr.open('POST', 'https://private2020-convertor.herokuapp.com/kurs');
           xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');

           let data = {
               valuta: {from: fromSelect.value, to: toSelect.value},
               currency: from.value
           };

           xhr.send(JSON.stringify(data));

           xhr.addEventListener('readystatechange', function () {

               if (xhr.readyState < 4) {
                   console.log('Loading');
               } else if (xhr.readyState === 4 && xhr.status === 200) {
                   console.log('Success');
                   let obj = JSON.parse(xhr.response);
                   if (obj.flag === true) {
                       to.value = obj.to;
                   } else {
                       to.value = obj.from;
                   }

               }else{
                   console.log('Error check the data!');
               }
           });
       }else {
           console.log('Вы ввели одинковые знвачения');
       }
   }

});

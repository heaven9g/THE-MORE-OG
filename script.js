let money = ["AUD", "CAD", "CNY", "DKK", "EUR", "HKD", "INR", "IDR", "JPY", "MYR", "NZD", "NOK", "PHP", "GBP", "SGD", "SEK", "CHF", "USD", "VND"];
let fee_p = [4.49, 4.49, 4.99, 4.99, 4.99, 4.99, 4.99, 3.49, 4.99, 1, 4.49, 4.99, 4.99, 4.99, 3.99, 4.99, 4.99, 3.99, 4.99];
let fee_a = [0.29, 0.29, 1.99, 1.49, 0.19, 1.99, 19.99, 4999, 24.99, 0.29, 0.29, 1.99, 9.99, 0.19, 0.5, 1.99, 0.29, 0.3, 9999];
var data_dis = [];
var data_nor = [];
var price_dis = [];
var price_nor = [];
var won_dis = [];
var won_nor = [];
for (let i = 0; i < 3/*money.length*/; i++) {
    $(function() {
        $.ajax({
          url: "https://cors-anywhere.herokuapp.com/https://www.offgamers.com/kr/en/happy-money-gift-card/happy-money-gift-card-kr/happy-money-5000won-gift-card-kr-discount-promo?reg_cur=" + money[i],
          type: "POST",
          async: false,
          dataType: "json",
          contentType: "application/json",
          // set the request header authorization to the bearer token that is generated
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          success: function(result) {
            //console.log(result.listing);
            var real_dis = GetRealString_dis(result.listing);
            console.log(real_dis)
            var real_nor = GetRealString(result.listing);
            console.log(real_nor)
            data_dis[i] = parseFloat(real_dis);
            price_dis[i] = Math.floor((data_dis[i] + (data_dis[i]*fee_p[i]*0.01)+fee_a[i])*100)/100.0;
            data_nor[i] = parseFloat(real_nor);
            price_nor[i] = Math.floor((data_nor[i] + (data_nor[i]*fee_p[i]*0.01)+fee_a[i])*100)/100.0;
            console.log(price_dis[i]);
      
          },
          error: function(error) {
            console.log(`Error ${error}`)
          },
        });
      });
      $(function() {
          $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://themorehelp.com/exrate_calculator/?get=rate&currency="+money[i]+"&amount="+price_dis[i],
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            // set the request header authorization to the bearer token that is generated
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            success: function(result) {
              //console.log(result);
              won_dis[i] = parseInt(result.result.krwamount);
        
            },
            error: function(error) {
              console.log(`Error ${error}`)
            },
          });
        });
        $(function() {
            $.ajax({
              url: "https://cors-anywhere.herokuapp.com/https://themorehelp.com/exrate_calculator/?get=rate&currency="+money[i]+"&amount="+price_nor[i],
              type: "POST",
              dataType: "json",
              contentType: "application/json",
              // set the request header authorization to the bearer token that is generated
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
              success: function(result) {
                //console.log(result);
                won_nor[i] = parseInt(result.result.krwamount);
          
              },
              error: function(error) {
                console.log(`Error ${error}`)
              },
            });
          });
}
let dis_text1 = "Happy Money 5,000WON Gift Card (KR) Discount Promo\" data-op=\"";
let dis_text2 = "\" data-price=\""
let end_text = "\" data-image=\"\" class=\"products-modal-items-wrapper product-group group\""

function GetRealString_dis(str) {
    var dis_tpos1 = str.indexOf(dis_text1) + dis_text1.length;
    var realstring = str.slice(dis_tpos1, -1);
    var dis_tpos2 = realstring.indexOf(dis_text2) + dis_text2.length;
    var dis_epos = realstring.indexOf(end_text);
    realstring = realstring.slice(dis_tpos2,dis_epos);
    
    return realstring;
}
let nor_text1 = "Happy Money 5,000WON Gift Card (KR)\" data-op=\"";
function GetRealString(str) {
    var dis_tpos1 = str.indexOf(nor_text1) + nor_text1.length;
    var realstring = str.slice(dis_tpos1, -1);
    var dis_tpos2 = realstring.indexOf(dis_text2) + dis_text2.length;
    var dis_epos = realstring.indexOf(end_text);
    realstring = realstring.slice(dis_tpos2,dis_epos);
    
    return realstring;
}

var res_dis = won_dis.filter(num => num > 5999);
var res_nor = won_nor.filter(num => num > 5999);
res_dis.sort(function(a, b)  {
    if(a > b) return -1;
    if(a === b) return 0;
    if(a < b) return 1;
  });
  res_nor.sort(function(a, b)  {
    if(a > b) return -1;
    if(a === b) return 0;
    if(a < b) return 1;
  });

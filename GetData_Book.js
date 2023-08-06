let nor_text1 = "Booknlife 5000won (KR)\" data-op=\"";
let dis_text1 = "Booknlife 5000won (KR) Discount Promo\" data-op=\"";
let dis_text2 = "\" data-price=\""
let end_text = "\" data-image=\"\" class=\"products-modal-items-wrapper product-group group\""

var data_dis = [["",0,0,0]];
var data_nor = [["",0,0,0]];

for (let i = 0; i < money.length; i++) {
    $.ajax({
          url: proxy + "https://www.offgamers.com/kr/ko/booknlife-prepaid-card/booknlife-kr/booknlife-5000won-kr-discount-promo?reg_cur=" + money[i],
          type: "post",
          crossDomain: true,
          async: false,
          dataType: "json",
          contentType: "application/javascript",
          // set the request header authorization to the bearer token that is generated
          headers: {
            'Access-Control-Allow-Origin': '*',
            "X-Requested-With": "XMLHttpRequest",
          },
          success: function(result) {
            //console.log(result);
            var real_dis = GetRealString_dis(result.listing);
            //console.log(real_dis)
            var real_nor = GetRealString(result.listing);
            //console.log(real_nor)
            data_dis.push(["",0,0,0]);
            data_dis[i][0] = money[i];
            data_dis[i][1] = parseFloat(real_dis);
            data_dis[i][2] = Math.floor((data_dis[i][1] + (data_dis[i][1]*fee_p[i]*0.01)+fee_a[i])*100)/100.0;
            
            data_nor.push(["",0,0,0]);
            data_nor[i][0] = money[i];
            data_nor[i][1] = parseFloat(real_nor);
            data_nor[i][2] = Math.floor((data_nor[i][1] + (data_nor[i][1]*fee_p[i]*0.01)+fee_a[i])*100)/100.0;
            //console.log(data_dis[i]);
      
          },
          error: function(error) {
            console.log(`Error ${error}`)
          },
        });
          $.ajax({
            url: proxy + "https://themorehelp.com/exrate_calculator/?get=rate&currency="+money[i]+"&amount="+data_dis[i][2],
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            // set the request header authorization to the bearer token that is generated
            headers: {
              'Access-Control-Allow-Origin': '*',
              "X-Requested-With": "XMLHttpRequest",
            },
            success: function(result) {
              //console.log(result.result.krwamount);
              data_dis[i][3] = parseInt(result.result.krwamount);
              //console.log(data_dis[i]);
            },
            error: function(error) {
              console.log(`Error ${error}`)
            },
          });
            $.ajax({
              url: proxy + "https://themorehelp.com/exrate_calculator/?get=rate&currency="+money[i]+"&amount="+data_nor[i][2],
              type: "POST",
              async: false,
              dataType: "json",
              contentType: "application/json",
              // set the request header authorization to the bearer token that is generated
              headers: {
                'Access-Control-Allow-Origin': '*',
                "X-Requested-With": "XMLHttpRequest",
              },
              success: function(result) {
                //console.log(result);
                data_nor[i][3] = parseInt(result.result.krwamount);
          
              },
              error: function(error) {
                console.log(`Error ${error}`)
              },
            });
  //console.log("end_of_for");
}
var res_dis = data_dis.filter((num) => {console.log(num); console.log(num[3]); console.log(num[3] < 5999);return num[3] < 5999;});
var res_nor = data_nor.filter((num) => {return num[3] < 5999;});
res_dis.sort(function(a, b)  {
    if(a[3] > b[3]) return -1;
    if(a[3] === b[3]) return 0;
    if(a[3] < b[3]) return 1;
  });
  res_nor.sort(function(a, b)  {
    if(a[3] > b[3]) return -1;
    if(a[3] === b[3]) return 0;
    if(a[3] < b[3]) return 1;
  });
  console.log(res_dis)
  console.log(res_nor)

  function GetRealString_dis(str) {
    var dis_tpos1 = str.indexOf(dis_text1) + dis_text1.length;
    var realstring = str.slice(dis_tpos1, -1);
    var dis_tpos2 = realstring.indexOf(dis_text2) + dis_text2.length;
    var dis_epos = realstring.indexOf(end_text);
    realstring = realstring.slice(dis_tpos2,dis_epos);
    
    return realstring;
}
function GetRealString(str) {
    var dis_tpos1 = str.indexOf(nor_text1) + nor_text1.length;
    var realstring = str.slice(dis_tpos1, -1);
    var dis_tpos2 = realstring.indexOf(dis_text2) + dis_text2.length;
    var dis_epos = realstring.indexOf(end_text);
    realstring = realstring.slice(dis_tpos2,dis_epos);
    
    return realstring;
}
function fetchAxios(url) {
  axios({
    url: 'https://cors-proxy.org/api/',
    method: 'get',
    async: false,
    dataType: "json",
    contentType: "application/json",
    headers: {
        'cors-proxy-url' : url,
    },
  }).then((res) => {
    console.log(res.data);
    return res.data;
  })
  .catch(function (error) {
    return error;
  });
}

var str = "";
var now = 1;
for (let i = 0; i < res_dis.length; i++) {
  str += "<tr class='responsive-table__row'>"
  if(i>0 && res_dis[i-1] == res_dis[i]) {}
  else {
    now = i+1;
  }
  str += "<td class='responsive-table__body__text responsive-table__body__text--rank'>" + now + "</td>"
  str += "<td class='responsive-table__body__text responsive-table__body__text--name'>" + res_dis[i][0] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_dis[i][1] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_dis[i][2] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_dis[i][3] + "</td>";

  str += "</tr>"
}

document.getElementsByClassName("responsive-table__body")[0].innerHTML = str;

str = "";
now = 1;
for (let i = 0; i < res_nor.length; i++) {
  str += "<tr class='responsive-table__row'>"
  if(i>0 && res_nor[i-1] == res_nor[i]) {}
  else {
    now = i+1;
  }
  str += "<td class='responsive-table__body__text responsive-table__body__text--rank'>" + now + "</td>"
  str += "<td class='responsive-table__body__text responsive-table__body__text--name'>" + res_nor[i][0] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_nor[i][1] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_nor[i][2] + "</td>";
  str += "<td class='responsive-table__body__text responsive-table__body__text--type'>" + res_nor[i][3] + "</td>";

  str += "</tr>"
}

document.getElementsByClassName("responsive-table__body")[1].innerHTML = str;
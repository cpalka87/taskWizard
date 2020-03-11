function objCleaner() {
  var variants = document.getElementById("variants").value;
  variants = sliceArray(variants, 12)
    // document.getElementById("output").innerHTML = variants.toString();
  var result = [];
  var resultFinal = [];
    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i]
      var newObj = {
        "site": `${document.getElementById('site').value}`,
        "method": `${document.getElementById('mode').value}`,
        "url": null,
        "keywords": null,
        "variant": `${variants}`,
        "size": null,
        "billing": "0",
        "proxyList": "none",
        "schedule": {
            "option": "time",
            "time": null
        },
        "date": Date.now(),
        "requireLogin": null,
        "chef": {},
        "force_captcha": false,
        "color": null,
        "category": "",
        "site_url": null,
        "payver": null,
        "dateOfBirth": null,
        "queueMode": true,
        "browserCheckout": null,
        "titleInfo": `SKU: ${variant}\nMethod: ${document.getElementById('mode').value}`,
        "isShopify": true
      }
      result.push(newObj);
    }
  
  for (var i = 0; i < result.length; i++) {
    resultFinal.push(result[i]);
  }
  document.getElementById("output").innerHTML = JSON.stringify(resultFinal);
// console.log(resultFinal)
}

function sliceArray(array, size) {
    var slicedArray = [];
    for (var i = 0; i < array.length; i+= size) {
      var sliceIt = array.slice(i, i + size);
      slicedArray.push(sliceIt)
    }
    return slicedArray;
  }

// var myElement = document.getElementById("site");
// document.getElementById("demo").innerHTML = 
// "The text from the intro paragraph is " + myElement.innerHTML;

// first argument is site name
// second leave as is
// third you can remove or enter:
// 'cbpup' for Cyborg 3.0
// 'web' for Safe
// 'wallets' for Fast
// 'cl' for Checkout Link

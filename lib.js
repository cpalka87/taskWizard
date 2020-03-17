function objCleaner() {
  var variants = document.getElementById('variants').value;
  if (variants.match(/(\r?\n|\r)/)) {
    variants = variants.replace(/(\r?\n|\r)/g, '').split('');
  } else {
    variants = variants.split('');
  }
  variants = sliceArray(variants, Number(`${document.getElementById('varlength').value}`))
  var result = [];
  var resultFinal = [];
    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i]
      var newObj = {
        "site": `${document.getElementById('site').value}`,
        "method": `${document.getElementById('mode').value}`,
        "url": null,
        "keywords": null,
        "variant": variant,
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
      result.push(newObj)
    }
  
  for (var i = 0; i < result.length; i++) {
    resultFinal.push(result[i]);
  }
  document.getElementById("output").innerHTML = JSON.stringify(resultFinal);
}

// array slice helper function
function sliceArray(array, size) {
  var slicedArray = [];
  for (var i = 0; i < array.length; i+= size) {
    var sliceIt = array.slice(i, i + size).join('');
    slicedArray.push(sliceIt);
  }
  return slicedArray;
}

// form validation
function validate() {
  var varLength = document.getElementById("varlength").value;
  if (varLength == "") {
      alert('Please enter a length!');
      return false;
  }
  objCleaner();
}

function clipBoard() {
  var output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
}
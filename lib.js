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
function validateVarLength() {
  var varLength = document.getElementById("varlength").value;
  if (varLength == "") {
      alert('Please enter a length!');
      return false;
  }
  objCleaner();
}
// validate output contents
function validateOutput() {
  var output = document.getElementById("output").value;
  if (output == "") {
    return false;
  }
  saveTextAsFile(output, "tasks.json");
}

// copy to clipboard function
function clipBoard() {
  var output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
}

// save file to local file system
function saveTextAsFile(textToWrite, fileNameToSaveAs) {
  if (textToWrite === undefined) {
    return false
  }
  var textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else {
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  }
   
  downloadLink.click();
}


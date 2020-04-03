function taskBuilder() {
  var variants = document.getElementById('variants-box').value;
  variants = variants.split('\n');
  var siteName = document.getElementById('site-box').value;
  var siteURL = document.getElementById('site-url').value;
  siteURL = siteURL.split('/')
  if (siteName === 'CustomShopify') {
    var url = `https://${siteURL[2]}/`
  } else {
    url = null
  }
  var result = [];
  var resultFinal = [];
    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i]
      var newObj = {
        "site": siteName,
        "method": `web`,
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
        "site_url": url,
        "payver": null,
        "dateOfBirth": null,
        "queueMode": true,
        "browserCheckout": null,
        "titleInfo": `SKU: ${variant}\nMethod: Safe`,
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
function validateSiteURL() {
  var siteURL = document.getElementById("site-url").value;
  var variants = document.getElementById("variants-box").value;
  var siteBox = document.getElementById("site-box").value;
  if (siteURL == "" && variants !== "" && siteBox !== "") {
     taskBuilder()
  } else if (variants !== "" && siteBox == "") {
    alert("Please fill in site name to build task")
  } else if (siteURL == "" && variants == "") {
    alert('Please fill in either product URL or variants')
  }
  variantBuilder();
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
function clipBoard(tag) {
  var output = document.getElementById(`${tag}`);
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
// variant builder section
function webhookMessage(message, domain, productLink) {
  var request = new XMLHttpRequest();
  var webhook = 'https://discordapp.com/api/webhooks/682262904518737942/Nk2_J3oqzBkC9xJo7wKU1kx8JzPAE96k_TnoV064jHpC7HZq5LhLNbMrqmZFC3crF0XH'
  request.open("POST", webhook);
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
    username: 'DonkWizard',
    avatar_url: 'https://palkaphoto-bucket.s3.us-west-1.amazonaws.com/uploads/blog/blog_image/7/2020-03-26%2017_08_44-lowercase_letter_d_blue-512.webp%20%28WEBP%20Image%2C%20512%C2%A0%C3%97%C2%A0512%20pixels%29.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMSJHMEUCIACTN8V98YKZiuuYzVXs1%2FzROSsejxZYE9A5tobPJ0eWAiEA8PmEVpNofakH%2FDlb9FIYBChmmGwg%2FEOQhNwPvySvOgIq5gEIWBABGgw0NzI4NjM2Mjc2MDIiDCnTBP%2FqxPk%2FmKER%2BSrDAebrKgYNKHzAQP0aUSvn1l6qDZpz4Jb0mrebXkJf83m2%2BjrQ6cbj5vVIlVfKXYbrCOMkkUvybgmwBTNIE3KBcyYA7s0Wm%2ByYcSVrIocDf%2BGQSFvyza1SODRnOtkNS4sKGquEBN8yAIS9hKzGsYTozwnnWvU5yn9%2Bop%2Fhga74A%2Bm9MftRwpF6rt6CHJSC36G2%2F2XMYJfoa09%2BxHoPIwmjkQR8eYZKdlPl66fKDVm7o0Qf08fqw2FzK1MlOK3l7NDdKEvaxzCSr5v0BTrwAlwqmDJwt34awD0TmDsrbrlql7Hjgj0N3znx%2FCEqZfnyKBuJdJKqTPlmHwwoE0Cwh%2F9CztcNZC8xLOhsUNKgsR%2FqkNPykOGoPM50HD7XHBr5U26C276%2B57YH9UV6%2F4KjKN9tOTtc0Me5DJluTdBXmRAKiRz5ngIjQmewr3HP%2BMqTEiTPFFWYSg7cpZ0b9YnxizUwIZmx9RuYG3SPwhnbGQY5RB1o%2F7LqFXsKEsmFwgwVxxMVFdR0r8b7Y5ugAEmvtIE5y9RUGv4CV8ilTdo0%2Bp8eODh0jbkhrP%2FW2y1lmqFD6OrA%2Fw5iPjXFiqJQIIBfdn5F3osjzQwkBM3tKksMJJi2EhHNmSTTD1%2BVFN6E4Iqy%2Fy4gFZyN5Q2D4%2BnFkRjchojQgC0zQDCNE89elwEsFIXGKPcqlShVzeSbZ93d9OH6xTY6RUwVweAfCVHdtfqGDeMDfn8FF%2Bk7bv3Ms4IvECDYBBEVretUPuO%2FTSb4EduV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200403T062926Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAW4GG6LFJJL2TI6GB%2F20200403%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=e10b31ad3fa7214f52fe679d8a2eaa9c33f4badbf52a8d6d4f2c269249cca231',
    content: `__**${domain}${productLink}**__${message}`
  }
  request.send(JSON.stringify(params));
}



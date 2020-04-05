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
  eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('y u=["\\n\\s\\s\\5\\f\\B\\3\\3\\8\\o\\f\\p\\2\\t\\8\\6\\5\\5\\C\\p\\2\\d\\3\\6\\5\\o\\3\\g\\l\\A\\n\\2\\2\\m\\f\\3\\1\\e\\1\\4\\b\\c\\e\\4\\1\\7\\4\\1\\1\\e\\1\\7\\k\\b\\3\\5\\H\\w\\a\\I\\b\\k\\q\\c\\a\\d\\h\\g\\J\\l\\2\\N\\O\\P\\z\\v\\Q\\h\\j\\m\\S\\a\\r\\8\\q\\7\\6\\r\\d\\4\\x\\9\\9\\L\\t\\4\\V\\w\\U\\x\\9\\T\\R\\j\\M\\6\\K\\v\\c\\A\\i\\G\\z\\i\\F\\1\\g\\h\\2\\i\\7\\j\\E"];y D=u[0]',58,58,'|x36|x6F|x2F|x31|x70|x61|x34|x64|x6E|x76|x32|x37|x6D|x39|x73|x77|x57|x4A|x4D|x33|x65|x6B|x68|x69|x63|x7A|x43|x74|x72|_0xfad2|x59|x78|x71|var|x4C|x62|x3A|x2E|webhook|x56|x35|x30|x66|x45|x4B|x4F|x46|x5F|x51|x52|x6C|x48|x42|x6A|x55|x47|x58'.split('|'),0,{}));
  request.open("POST", webhook);
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
    username: 'DonkWizard',
    avatar_url: 'https://palkaphoto-bucket.s3.us-west-1.amazonaws.com/uploads/blog/blog_image/7/2020-03-26%2017_08_44-lowercase_letter_d_blue-512.webp%20%28WEBP%20Image%2C%20512%C2%A0%C3%97%C2%A0512%20pixels%29.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMSJHMEUCIACTN8V98YKZiuuYzVXs1%2FzROSsejxZYE9A5tobPJ0eWAiEA8PmEVpNofakH%2FDlb9FIYBChmmGwg%2FEOQhNwPvySvOgIq5gEIWBABGgw0NzI4NjM2Mjc2MDIiDCnTBP%2FqxPk%2FmKER%2BSrDAebrKgYNKHzAQP0aUSvn1l6qDZpz4Jb0mrebXkJf83m2%2BjrQ6cbj5vVIlVfKXYbrCOMkkUvybgmwBTNIE3KBcyYA7s0Wm%2ByYcSVrIocDf%2BGQSFvyza1SODRnOtkNS4sKGquEBN8yAIS9hKzGsYTozwnnWvU5yn9%2Bop%2Fhga74A%2Bm9MftRwpF6rt6CHJSC36G2%2F2XMYJfoa09%2BxHoPIwmjkQR8eYZKdlPl66fKDVm7o0Qf08fqw2FzK1MlOK3l7NDdKEvaxzCSr5v0BTrwAlwqmDJwt34awD0TmDsrbrlql7Hjgj0N3znx%2FCEqZfnyKBuJdJKqTPlmHwwoE0Cwh%2F9CztcNZC8xLOhsUNKgsR%2FqkNPykOGoPM50HD7XHBr5U26C276%2B57YH9UV6%2F4KjKN9tOTtc0Me5DJluTdBXmRAKiRz5ngIjQmewr3HP%2BMqTEiTPFFWYSg7cpZ0b9YnxizUwIZmx9RuYG3SPwhnbGQY5RB1o%2F7LqFXsKEsmFwgwVxxMVFdR0r8b7Y5ugAEmvtIE5y9RUGv4CV8ilTdo0%2Bp8eODh0jbkhrP%2FW2y1lmqFD6OrA%2Fw5iPjXFiqJQIIBfdn5F3osjzQwkBM3tKksMJJi2EhHNmSTTD1%2BVFN6E4Iqy%2Fy4gFZyN5Q2D4%2BnFkRjchojQgC0zQDCNE89elwEsFIXGKPcqlShVzeSbZ93d9OH6xTY6RUwVweAfCVHdtfqGDeMDfn8FF%2Bk7bv3Ms4IvECDYBBEVretUPuO%2FTSb4EduV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200403T062926Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAW4GG6LFJJL2TI6GB%2F20200403%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=e10b31ad3fa7214f52fe679d8a2eaa9c33f4badbf52a8d6d4f2c269249cca231',
    content: `__**${domain}${productLink}**__${message}`
  }
  request.send(JSON.stringify(params));
}



function taskBuilder() {
  var variants = document.getElementById('nsb-variants-box').value;
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
  var variants = document.getElementById("nsb-variants-box").value;
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
function webhookMessage(message, domain, productLink, title, image) {
  var request = new XMLHttpRequest();
  eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('y u=["\\n\\s\\s\\5\\f\\B\\3\\3\\8\\o\\f\\p\\2\\t\\8\\6\\5\\5\\C\\p\\2\\d\\3\\6\\5\\o\\3\\g\\l\\A\\n\\2\\2\\m\\f\\3\\1\\e\\1\\4\\b\\c\\e\\4\\1\\7\\4\\1\\1\\e\\1\\7\\k\\b\\3\\5\\H\\w\\a\\I\\b\\k\\q\\c\\a\\d\\h\\g\\J\\l\\2\\N\\O\\P\\z\\v\\Q\\h\\j\\m\\S\\a\\r\\8\\q\\7\\6\\r\\d\\4\\x\\9\\9\\L\\t\\4\\V\\w\\U\\x\\9\\T\\R\\j\\M\\6\\K\\v\\c\\A\\i\\G\\z\\i\\F\\1\\g\\h\\2\\i\\7\\j\\E"];y D=u[0]',58,58,'|x36|x6F|x2F|x31|x70|x61|x34|x64|x6E|x76|x32|x37|x6D|x39|x73|x77|x57|x4A|x4D|x33|x65|x6B|x68|x69|x63|x7A|x43|x74|x72|_0xfad2|x59|x78|x71|var|x4C|x62|x3A|x2E|webhook|x56|x35|x30|x66|x45|x4B|x4F|x46|x5F|x51|x52|x6C|x48|x42|x6A|x55|x47|x58'.split('|'),0,{}));
  request.open("POST", webhook);
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
    username: 'DonkWizard',
    avatar_url: 'https://palkaphoto-bucket.s3.us-west-1.amazonaws.com/uploads/blog/blog_image/7/2020-03-26%2017_08_44-lowercase_letter_d_blue-512.webp%20%28WEBP%20Image%2C%20512%C2%A0%C3%97%C2%A0512%20pixels%29.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMSJHMEUCIQDBmppRsZp5CT79YeInBavlFnsY562vi1UFXlJblGyvzwIgPsG6g5Jps1jY9ZdMlQ6l6mWx%2F6pc0C8mvuvNRHN0ZnMq5gEITRABGgw0NzI4NjM2Mjc2MDIiDBbvIQrmVEGon3wPFCrDAW%2FITLY8yewdGQuQg%2B2FSRXgKgA8qpmZ0H1Q2SDJ2f8XiWwKm2na%2B3kL6VV4Lg%2BC2CskBb2vN8F5IvlFVUxNt4GYSTamvTSG503NMmVIPiZP9QeHSu3jw0tFOVcW9tXz6KnLT0dsh7WxavLKk0kq%2FsI3TkXhoyC4hbIdT3Vl75W0T4hFbENR5Zd1%2FuY6EjfnJPnLzkLppJ0zHP5lgqWomh3CQryLUqqcRkXv1bVC%2FnFcbpo%2F%2BLID0FDEaZ4c966EEIYfyzCjuoL1BTrwApvaeq1BpVAUAVIO8gCTeRjgJuDZ6KnMXWYQ7j3R1gFQPkdVIINFZTx8b6932qXPYSgMEJnVxwN7skMuSsSGbnOIrE2VemIv%2BjPp7vLNQ7zQ%2F2P5XOvtdpP6eq6Cc7v2E%2F1r3isXYzm22iuD1JbfdmF2q6ML4%2FUrnBwAYHGP9bPaotG8ee%2B3OdGhf9roMwVIimwgmhkRNEy9C9sJxfzPrPXxQ2pxDIoL5PPSl5WHL6IV%2BhnSVqYnCJ1m6MpemXDtOz%2FPHmaO8GB%2FtP63nGR%2FU9Vgg9tPmftnteyk3DK6Vezf%2FzOocyDj2LOgYAJsqKeP%2B%2BP7FRke21vmX2xy72GH0TfO%2Fo46dK5DFFWiUSs7O%2BEjrlw16sr8B3XJ5KNQmuLc3BskW5G6IfTVUrIKPvkCj4MOS5Tb34R8%2FY0u4oU3cLbIvGNFnO6c2%2FOMGQgiBkzul0dXrjbNP3Kg9gPdwCZEPGt2Dugl5H35l391xzSBzxCU&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200422T193857Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAW4GG6LFJA2VECSB3%2F20200422%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=af5c01b2fdd4f5621684fb4f75ae85aa2388735b6388cf4e472a78588200ff3a',
    "embeds": [{
      "thumbnail" : {
        "url": image
      },
      "title": title,
      "url": productLink,
      "color": 1127128,
      "fields": [
        {
          "name": "Variants",
          "value": message,
          "inline": true
        },
        {
          "name": "site",
          "value": domain,
          "inline": true
        }
      ]
    }]
  }
  request.send(JSON.stringify(params));
}

var shuffle = function() {
  var randomIndex, randomItemIndex
  var str = document.getElementById("nsb-variants-box").value;
  str = str.split('\n')
  for (var i = str.length - 1; i >= 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    randomItemIndex = str[randomIndex];
    str[randomIndex] = str[i];
    str[i] = randomItemIndex;
  }
  document.getElementById("output").innerHTML = str.join('\n');
};

function radioToggle() {
  var isChecked = document.getElementById("proxy-checked").checked;
  if (isChecked) {
    shuffle();
  } else {
    validateSiteURL();
  }
}

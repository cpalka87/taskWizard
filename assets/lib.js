function taskBuilder() {
  var variants = document.getElementById('variants-box').value;
  variants = variants.split('\n');
  var siteName = document.getElementById('site-box').value;
  var result = [];
  var resultFinal = [];
    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i]
      var newObj = {
        "site": `${siteName}`,
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
        "site_url": null,
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

function webhookMessage(message, domain, handle) {
  var request = new XMLHttpRequest();
  var webhook = 'https://discordapp.com/api/webhooks/682262904518737942/Nk2_J3oqzBkC9xJo7wKU1kx8JzPAE96k_TnoV064jHpC7HZq5LhLNbMrqmZFC3crF0XH'
  request.open("POST", webhook);
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
    username: 'DonkWizard',
    avatar_url: 'https://palkaphoto-bucket.s3.us-west-1.amazonaws.com/uploads/blog/blog_image/7/chippy.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJIMEYCIQDzG4T1cTuiGZoOYRpO9HIRZPD9cqhdBOnugRbscqk9YQIhAPbyuQKv2pHuQm7y32hNa6EQCvPYmhao4EHo6bSXUgvmKu8BCJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNDcyODYzNjI3NjAyIgyUOM05mNBQ3aywl1gqwwHDdbaQIM9EutJfjEx9JlgGCClShglxicJrG5B3GJrTNuTkAw66cyfb13mJWGmtGdg9q8eguk%2BQWNdToCttJb2oEqkh1u4kryzixsAQpiBgXYLkzsCwq2K1Q1xKLDTXLVy2y%2BP0GTvehw7FmdYY3PypY4YKq02ffCOgWBLoAdokRoxP2861%2B1OA8ddlbZZwTaav6Mk8H7TYHhP5j7Bhc3GWy%2Fzd%2F1RcrpyntEJ05ZIuVdZ3ekqsbCQLg8pZ1rM5fKaF6pMwqNbz8wU67wKn%2Fc9pWAAz1IwHnIKohc5QsqzrnzrgLBm49pPWha5GdieWJD1hdiEb8H5wwn04mjAN8%2B6uVFClO7FFjfyPjAJTE91yF96ZD2BHp3WGETZGx5G4t6iqI6Hv8u0BsXEyiKwZwV6V8HSdUC7nEz4TRSIk4E718jsiJ5lYZZ3jjSnWMEfMsjGblIgke5%2FXkPcHRltD69rHXm2lnPGOTkNR5ixsPKsxgrWbe3KlVHSLvXELYCyAEn76k91KMuU2Rwe%2BLeP%2FqfCA%2B%2BpYCVOMobKwzBnzDk4Wu9CLL%2FMlReujJ7zubfNXd9itZMe%2FckYkRCFvQNyFskmoGjV2dxEqp3H08L25quWI1ll6cykaEAtbbrjXM0KhEY3s9HKPvVbRSwi9vM7T%2BWza0u737fqON1%2FDFv8XlGAnbDXkVqudQtHdQSWBSSD0oUoptpmTWxFH0uxFRa0EVLEQt6zztr1apRxfCvEstoHrZPhufKkJwv503nMm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200326T191606Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAW4GG6LFJPO5DPB4G%2F20200326%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=031fc984b348ef59e873d42d2e7fb51f498a7a7fe200e20ca24ca2b8917d3e62',
    content: `__**${domain}${handle}**__${message}`
  }
  request.send(JSON.stringify(params));
}


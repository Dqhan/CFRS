window.onload = function() {
  function assemble(data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }

  var testRequestBtn = document.getElementById("testRequest");
  testRequestBtn.addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    var url = "./testRequest";
    var request = { test: "dqhan" };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          var str = JSON.parse(xhr.responseText).test;
          var node = `${str}`;
          document.body.insertAdjacentHTML("beforeend", node);
        } else {
          console.log("error", xhr.responseText);
        }
      }
    };
    xhr.send(assemble(request));
  });
  var loginBtn = document.getElementById("login");
  loginBtn.addEventListener("click", function() {
    var request = {};
    request["username"] = document.getElementById("user-name-input").value;
    request["password"] = document.getElementById("password-input").value;
    fetch("./login", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      method: "POST",
      body: assemble(request)
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        localStorage.setItem("token", res);
      })
      .catch(function(e) {
        console.log(e);
      });
  });
};

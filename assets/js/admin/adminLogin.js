$(document).ready(() => {
  let adminLoginForm = $("#adminLoginForm");
  let adminPanel = $("#AdminPanel");

  // if (localStorage.getItem("admin")) {
  //   adminLoginForm.hide();
  //   adminPanel.show();
  // } else {
  //   adminLoginForm.show();
  //   adminPanel.hide();
  // }

  $(document).on("click", "#adminJoinButton", (e) => {
    e.preventDefault();

    let UserName = $("#userName").val().trim();
    let UserPassword = $("#userPassword").val().trim();

    let clearUserInfo = () => {
      $("#userName").val("");
      $("#userPassword").val("");
    };

    if (!UserName || !UserPassword) {
      Swal.fire({
        icon: "error",
        title: "Wrong....",
        text: "Please fill out the form completely !!!",
      });
      clearUserInfo();
    } else {
      myDatabase.ref("/admin").on("value", function (snap) {
        let name = snap.val().userName;
        let password = snap.val().userPassword;

        if (UserName == name && UserPassword == password) {
          setTimeout(() => {
            adminLoginForm.hide();
            adminPanel.removeClass("d-none");
            adminPanel.show();
            clearUserInfo();
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Wrong....",
            text: "Username or Password is incorrect!!!",
          });
          clearUserInfo();
        }
      });
    }
  });

  $(document).on("click", "#adminLogout", () => {
    setTimeout(() => {
      adminLoginForm.show();
      adminPanel.hide();
    }, 1000);
  });

  // $('#joinButton').click(function () {
  //   $('#adminLogin').hide()
  //    $('#AdminPanel').show()
  // })
  // $('#adminLogout').click(function() {
  //   $('#AdminPanel').hide()
  //   $('#adminLogin').show()
  // })
});

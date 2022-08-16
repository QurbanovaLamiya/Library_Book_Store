$(document).ready(function () {
  let adminLoginForm = $("#adminLoginForm");
  let adminPanel = $("#AdminPanel");
  let adminJoinButton = $("#adminJoinButton");

  adminJoinButton.on("click", function (e) {
    e.preventDefault();
    adminLoginForm.hide();
    adminPanel.removeCalss
    adminPanel.show();
  });

  // if(adminLoginForm) {
  //   adminLoginForm.show()
  //   adminPanel.hide()
  // }else{
  //   adminLoginForm.hide()
  //   adminPanel.show()
  // }
  // let sidebar = $('.sidebar')
  //   $('.hamburger').click(function () {
  //     $('#adminpanel').hide()
  //      sidebar.show()
  //   })
  //   $('.x-image').click(function() {
  //     sidebar.hide()
  //     $('#adminpanel').show()
  //   })
});

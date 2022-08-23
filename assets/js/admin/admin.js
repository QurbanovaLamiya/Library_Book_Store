<<<<<<< HEAD
$(document).ready(function() {

  let sidebar = $('.sidebar')
    $('.hamburger').click(function () {
      $('#adminpanel').hide()          
       sidebar.show()
    })
    $('.x-image').click(function() {
      sidebar.hide()      
      $('#adminpanel').show()
    })
  })
  

  









    
=======
$(document).ready(function () {
  // Join Us //

  let userInformation = myDatabase.ref("/clientJoin");

  userInformation.on("value", function (snap) {
    let userData = Object.entries(snap.val()).map((item) => {
      return {
        id: item[0],
        ...item[1],
      };
    });
    renderPage(userData);
  });

  function renderPage(userInfoArr) {
    $("#joinTable").html(
      userInfoArr
        .map((item, index) => {
          return `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item.inputFullName}</td>
            <td>${item.inputEmail}</td>
       </tr>
        `;
        }).join("")
    );
  }

  // Contact Us //

  let userContact = myDatabase.ref("/clientContact");

  userContact.on("value", function (snap) {
    let userContactData = Object.entries(snap.val()).map((data) => {
      return {
        id: data[0],
        ...data[1],
      };
    });
    renderPageContact(userContactData);
  });

  function renderPageContact(userArr) {
    $("#contactTable").html(
      userArr.map((user, index) => {
        return `
            <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${user.fullNameContactUs}</td>
                  <td>${user.emailContactUs}</td>
                  <td>${user.addressContactUs}</td>
                  <td>${user.phoneContactUs}</td>
            </tr>
      `;
      })
    );
  }

  // Mobile //

  let sidebar = $(".sidebar");
  $(".hamburger").click(function () {
    $("#adminpanel").hide();
    sidebar.show();
  });
  $(".x-image").click(function () {
    sidebar.hide();
    $("#adminpanel").show();
  });
});
>>>>>>> c84d8a0be963e173439a29bbac852baaf4839cb3

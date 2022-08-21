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
        })
        .join("")
    );
  }

  // Contact Us //

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

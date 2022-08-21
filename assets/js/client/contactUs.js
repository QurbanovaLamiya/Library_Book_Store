$(document).ready(() => {
  $(".input").intlTelInput({
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
  });

  $(document).on("click", "#contactBookButton", (e) => {
    e.preventDefault();
    let fullNameContactUs = $("#fullNameContactUs").val().trim();
    let emailContactUs = $("#emailContactUs").val().trim();
    let addressContactUs = $("#addressContactUs").val().trim();
    let phoneContactUs = $("#phoneContactUs").val().trim();

    let resetInput = () => {
      $("#fullNameContactUs").val("");
      $("#emailContactUs").val("");
      $("#addressContactUs").val("");
      $("#phoneContactUs").val("");
    };

    if (
      !fullNameContactUs ||
      !emailContactUs ||
      !addressContactUs ||
      !phoneContactUs
    ) {
      Swal.fire({
        icon: "error",
        title: "Wrong !!!",
        text: "Please check all informations!!!",
      });
      resetInput();
      return;
    } else {
      setTimeout(() => {
        Swal.fire("Successful!", "Sended your information!", "success");
        resetInput();
      }, 1200);
    }

    let contactInfo = {
      fullNameContactUs,
      emailContactUs,
      addressContactUs,
      phoneContactUs,
    };

    let userContact = myDatabase.ref("/clientContact");

    userContact.push().set(contactInfo);
  });
});

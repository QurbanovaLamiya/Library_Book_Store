$(document).ready(function(){
  let myDatabase= firebase.database();
let clearBookInput =()=>{
  $("#bookName").val("");
  $("#authorName").val("");
  $("#bookImageUrl").val("");
  $("#bookDesc").val("");
  $("#publicationYear").val("");
  $("#isNew").prop("checked", false);
}
$("#searchBtn").on("click", (e)=>{
  e.preventDefault()
  $("#AdminSearchInput").val() !=="" ? $("#AdminSearchResult").show() : false;
})
$("#AdminSearchResult").on("click", () => {
  $("#AdminSearchResult").hide();
  $("#AdminSearchInput").val("");
});
$("#searchBtn").on("click", () => {
  $("#AdminSearchResult ul").html(`<img id="loadingImg" src="./assets/images/loading.gif" width="50" class="d-block m-auto" alt="">`);
  let search = $("#AdminSearchInput").val();
  const books = {
      "async": true,
      "crossDomain": true,
      "url": `https://www.googleapis.com/books/v1/volumes?q=${search}`,
      "method": "GET",
     
  };

$.ajax(books).then(function (response) {
    $("#AdminSearchResult ul").html("");
    let dataArr = response.items;
    if (!dataArr) {
        $("#AdminSearchResult ul").css({ "overflow-y": "hidden" })
        $("#AdminSearchResult ul").html(`<p class="text-danger">No results found for your search</p>`);
    } else {
        for (let item of dataArr) {
            let data = item.volumeInfo;
            let searchImg = '';
            data.imageLinks.thumbnail ? searchImg = data.imageLinks.thumbnail : searchImg = './assets/images.book.png';
            let searchRes = $("<li>").addClass("row align-items-center mb-3 cursor-pointer").attr("data-name", data.authors);
            searchRes.html(`<img src="${searchImg}" class="col-4 search-img" alt=""><span class="col-8">${data.authors}</span>`);
            $("#AdminSearchResult ul").append(searchRes);
            searchRes.on("click", function () {
                clearBookInput();
                getBookInfo(data);
            })
        }
    }
})
})

function countLimit(textarea, countDiv, textDiv) {
  $(textarea).on("change keyup paste", () => {
      $(countDiv).text($(textarea).val().length);
      if ($(textarea).val().length >= 1000) {
          $(textDiv).addClass("text-danger");
      } else {
          $(textDiv).removeClass("text-danger");
      }
  })
}

countLimit("#bookDesc", "#bookTextareaCount", "#bookTextarea");

// Get book information and write to input

function getBookInfo(data) {
  $("#bookName").val(data.title);
  $("#authorName").val(data.authors);
  if (data.imageLinks.thumbnail) {
      $("#bookImageUrl").val(data.imageLinks.thumbnail);
  }

  let descriptionCount = (data.description).length;

  $("#bookDesc").val(data.description.substring(0, 1000));

  descriptionCount < 1000 ? descriptionCount = descriptionCount : descriptionCount = 1000;

  $("#bookTextareaCount").text(descriptionCount);

  if (data.publishedDate) {
      let publishYear = parseInt(data.publishedDate.substring(0, 4))
      let thisYear = new Date().getFullYear();
      $("#publicationYear").val(publishYear);

      if (publishYear >= (thisYear - 2)) {
          $("#isNew").prop("checked", true);
      }
  }
}
// Add and Show Book Type Section

let addTypeSection = $('#addTypeSection');
let bookType = myDatabase.ref("/book-type");
let bookTypeInput = $("#bookTypeInput");

$('#addTypeBtn').click(function (e) {
    addTypeSection.toggle();
    e.stopPropagation();
});

$("body").click(function () {
    addTypeSection.hide();
});

addTypeSection.click(function (e) {
    e.stopPropagation();
});

bookType.on("value", function (snap) {
    let categoryObj = snap.val()
    let categoryArr = Object.entries(categoryObj).reverse();
    let idObjectArray = categoryArr.map(item => {
        return {
            id: item[0],
            ...item[1]
        }
    })

    renderCategoryPage(idObjectArray);
})

function renderCategoryPage(arr) {
    $("#categorySelect").html(arr.map(item => {
        return `<option value="${item.category}">${item.category}</option>`
    }))
}

$("#bookTypeBtn").on("click", (e) => {
    e.preventDefault();
    addTypeSection.hide();
    let typeVal = bookTypeInput.val().trim();
    if (typeVal) {
        bookType.push().set({ category: typeVal })
        swal({
            icon: 'success',
            title: 'Success...',
            text: "Book type successfully added!",
        })
    } else {
        swal({
            icon: 'error',
            title: 'Error...',
            text: "Book type can't be empty!",
        })
    }
    bookTypeInput.val("");
})


// **************************************
// Add book to firebase section

$("#addBookBtn").on("click", function () {
    let bookName = $("#bookName").val().trim();
    let authorName = $("#authorName").val().trim();
    let image = $("#bookImageUrl").val().trim();
    let year = $("#publicationYear").val();
    let description = $("#bookDesc").val().trim();
    let category = $("#categorySelect").val();
    let isNew = $("#isNew").is(":checked");

    function GetTodayDate() {
        var tdate = new Date();
        var dd = tdate.getDate();
        var MM = tdate.toLocaleString('default', { month: 'long' }).toLowerCase();
        var yyyy = tdate.getFullYear();
        var hh = tdate.getHours();
        var minutes = tdate.getMinutes();
        hh < 10 ? hh = "0" + hh : hh;
        minutes < 10 ? minutes = "0" + minutes : minutes;
        var currentDate = dd + " " + MM + " " + yyyy + " " + hh + ":" + minutes;
        return currentDate;
    }

    // console.log(GetTodayDate());

    let addDate = GetTodayDate();

    if (bookName === "" || authorName === "" || description === "") {
        swal({
            icon: 'error',
            title: 'Error...',
            text: "Book data can't be empty",
        })
        return;
    }

    let bookObj = {
        bookName,
        authorName,
        image,
        year,
        description,
        isNew,
        category,
        addDate,
    }

    myDatabase.ref("/books").push().set(bookObj);

    swal({
        icon: 'success',
        title: 'Success...',
        text: "Book successfully added",
    })
    clearBookInput();

//  About store section

 countLimit("#aboutDescription", "#aboutTextareaCount", "#aboutTextarea");
 myDatabase.ref('about-store').on("value", function (snap) {
     $("#aboutStoreTitle").val(snap.val()["about-title"]);
     $("#aboutStoreImageUrl").val(snap.val()["about-url"]);
     $("#aboutStoreDesc").val(snap.val()["about-description"]);

     let aboutCount = (snap.val()["about-description"]).length;
     $("#aboutTextareaCount").text(aboutCount);
 })
 $(".about-info-add").on("click", (e) => {
   e.preventDefault();
   let title = $("#aboutStoreTitle").val().trim();
   let imageUrl = $("#AboutImageUrl").val().trim();
   let aboutDescription = $("#aboutStoreDesc").val().trim();


   if (title === "" || imageUrl === "" || aboutDescription === "") {
       swal({
           icon: 'error',
           title: 'Error...',
           text: "Information can't be empty",
       })
       return
   }
   myDatabase.ref('about-store').set({
       "about-title": title,
       "about-url": imageUrl,
       "about-description": aboutDescription
   });

   swal({
       icon: 'success',
       title: 'Success...',
       text: "Information successfully updated",
   })
 })
})

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


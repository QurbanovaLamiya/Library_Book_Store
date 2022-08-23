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
$(document).ready(function () {
  let myDatabase = firebase.database();
  let bookDesc = $("#bookDesc");
  let addNewBook = myDatabase.ref("/addNewBook");
  let addAboutNewStore = myDatabase.ref("/addAboutNewStore");



  
 
  const bookForm = document.querySelector("#bookForm");
  let searchAdminInput = $("#AdminSearch");
  let searchAdminResult = $("#AdminSearchResult");
  let searchResultData = null;
  let searchChooseBookData = null;
  let searchBookFormInputField = null;

  //Catching Book details
  let bookName = $("#bookName");
  let authorName = $("#authorName");
  let bookImageUrl = $("#bookImageUrl");
  let year = $("#publicationYear");
  let isNew = $("#isNew");
  let bookSelectType = $("#bookSelectType");

  //Search starts at least after 4 characters enterred
  searchAdminInput.on("input", function () {
    let value = $(this).val();
    if (value.length < 4) {
      searchAdminResult.addClass("d-none");
      return;
    }

    if (value.trim() === "") {
      return;
    }

    searchAdminResult.removeClass("d-none");
    getBook(value);
  });
  
  bookDesc.on("input", function () {
    let descArea = $(this).val(searchChooseBookData.volumeInfo.authors);
    $(this).siblings("span").html(` ${descArea.length} / 100`);
    $(this).siblings("span").removeClass("text-danger");

    if (descArea.length > 100) {
      textAreaCount = true;
      $(this).siblings("span").addClass("text-danger");
    }
  });
  //Add book type selection
  

  //Search result drop down box pops up after 4 charachters enterred
  function searchResultDropdownRender(data) {
    let searchResultList = $(".search-result-list");

    if (data.error) {
      searchResultList.html(
        `<p class="text-danger mt-5 text-center h3">${data.message}</p>`
      );

      setTimeout(() => {
        searchAdminResult.addClass("d-none");
      }, 2000);
      return;
    }
    $(document).on("click", ".search-result-item", function () {
      let selectBookID = $(this).attr("id");
      console.log(selectBookID);
      searchChooseBookData = searchResultData.find(
        (book) => book.id === selectBookID
      );
      console.log("searchChooseBookData", searchChooseBookData);
      searchAdminResult.addClass("d-none");
      //bookname
      let bookData = searchChooseBookData.volumeInfo;
      bookName.val(bookData.title);
      //author name
      authorName.val(bookData.authors);

      //book publish year
      if (bookData.publishedDate) {
        let publishYear = parseInt(bookData.publishedDate.substring(0, 4));
        let thisYear = new Date().getFullYear();
        year.val(publishYear);
      }

      //description
      bookDesc.val(bookData.description);

      //isNew
      isNew.prop("checked", true);

      //Book type
      bookSelectType.val(searchChooseBookData.volumeInfo.printType);
      searchAdminInput.val("");

    });

    searchResultList.html(
      data
        .map(
          (book) => `
        <div class="search-result-item cursor-pointer" id=${book.id}>
          <p class="lead">
              <img src="./assets/images/clock.svg" witdh="50" class="mr-2" alt="">
              <span>
              ${
                book.volumeInfo.authors?.join(", ") || ""
              } ${book.volumeInfo.title.slice(0, 23)}...
              </span>
          </p>
        </div>
  `
        )
        .join("")
    );
  }

    //Write about store data to firebase
    $("#aboutStoreFormSubmit").on("click", function (event) {
      event.preventDefault();
  
      let aboutStoreTitle = $("#aboutStoreTitle").val();
      let aboutStoreDesc = $("#aboutStoreDesc").val();
      let aboutStoreImageUrl = $("aboutStoreImageUrl").val();
  
      addAboutNewStore.push().set({
        aboutStoreTitle,
        aboutStoreDesc,
        aboutStoreImageUrl
      });
    });

  //Write bookdata to firebase
  $("#bookFormSubmit").on("click", function (event) {
    event.preventDefault();
 
    let bookName = $("#bookName").val().trim();
    let authorName = $("#authorName").val().trim();
    let bookImageUrl = $("#bookImageUrl").val().trim();
    let year = $("#publicationYear").val().trim();
    let isNew = $("#isNew");
    let bookDesc = $("#bookDesc").val().trim();

    addNewBook.push().set({
      bookName,
      authorName,
      bookImageUrl,
      year,
      isNew,
      bookDesc,
      bookSelectType,
    });
    bookForm.reset();
  });


  // Get books from endpoint

  async function getBook(bookName) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
    const body = {
      method: "GET",
    };
    try {
      let { items } = await $.ajax(url, body);
      searchResultData = items;
      console.log(searchResultData);
      searchResultDropdownRender(searchResultData);
    } catch (err) {
      alert('Server Error')
      console.log(err);
    }
  }

})
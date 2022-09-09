let bookType = localStorage.getItem("bookType");

myDatabase.ref("/books").on("value", function (snap) {
    let bookObj = snap.val()
    let bookArr = Object.entries(bookObj).reverse();
    let bookObjArr = bookArr.map(item => {
        return {
            id: item[0],
            ...item[1]
        }
    })

    renderProductPage(bookObjArr);
})

function showBooks(item) {
    let bookImage = '';
    let cardNew = ''
    item.bookImage ? bookImage = item.bookImage : bookImage = "https://www.iconattitude.com/icons/open_icon_library/oxygen-style/png/256/x-office-address-book.png";
    item.isNew === true ? cardNew = '<span class="card-new">NEW</span>' : false;

    $(".book-name").text(item.bookName);
    $(".bookAuthor").text(item.authorName);
    $(".bookYea").text(item.bookYear);
    $(".bookContent").text(item.bookDesc.substring(0, 500));
    $(".bookImg img").attr("src", bookImage);
     $("#bookTimeAgo").attr("datetime", item.addDate);
    $(".bookImg").append(cardNew);
}

function renderProductPage(arr) {
    for (let item of arr) {
        if (item.id === bookType) {
            showBooks(item, '#newReleases');
        }
    }
}

setTimeout(() => {
    jQuery("time.timeago").timeago();
    $(".added").text("added");
}, 3000)


function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.toLocaleString('default', { month: 'long' });
    var yyyy = tdate.getFullYear();
    var hh = tdate.getHours();
    var minutes = tdate.getMinutes();
    hh < 10 ? hh = "0" + hh : hh;
    minutes < 10 ? minutes = "0" + minutes : minutes;
    var currentDate = dd + " " + MM + " " + yyyy + " " + hh + ":" + minutes;
    return currentDate;
}

const addComment = () => {
    let comment = $("#commentInput").val().trim();

    if (comment === "") {
        swal({
            icon: 'error',
            title: 'Error...',
            text: "Comment can't be empty!",
        })
        return
    }

    time = GetTodayDate();
    let postData = JSON.stringify({
        bookType,
        comment,
        time,
    })

    $.ajax({
        url: "https://bloggy-api.herokuapp.com/posts/",
        method: "POST",
        headers: {
            "api-key": "43jhfs",
            "Content-Type": "application/json"
        },
        data: postData
    })
};


function showComment() {
    $(".all-comments").html("");
    const comments = {
        "async": true,
        "crossDomain": true,
        "url": `https://bloggy-api.herokuapp.com/posts/`,
        "method": "GET",
    };

    $.ajax(comments).then(function (response) {
        let commentArr = response.reverse();
        for (let item of commentArr) {
            if (item.bookType === bookType) {
                let div = $("<div>").addClass("comment-card").html(`
                <span class="comment-author">anonim</span>
                <span class="comment-time"><time class="timeago" datetime="${item.time}"></time> added
                <div class="comment-body">${item.comment}</div>
                `)

                $(".all-comments").append(div);
            }
        }

    })
}

showComment();

$("#commentBtn").on("click", function (e) {
    e.preventDefault();
    addComment();
    $("#commentInput").val("");
    setTimeout(() => showComment(), 1000);
})











$(document).ready(() => {
    $("#articles").empty();
    $.get("/scrapedArticles", data => {
        for (var i = 0; i < data.length; i++) {
            var dataTitle = data[i].title;
            var dataImage = data[i].image;
            var dataLink = data[i].link;
            console.log(dataTitle, dataImage, dataLink);
            $("#articles").append(
                

                    `
                    <div class="card mb-4">
                    <h5 class="card-header">Article</h5>
                    <div class="card-body">
                        <img src="${data[i].image}" style="width: 200px" class="rounded float-left mr-3">
                      <h5 class="card-title">${data[i].title}</h5>
                      <a href="www.si.com/ + ${data[i].link}" class="btn btn-info">Read Article</a>
                    </div>
                    <hr>
                    <div id="comment-div"></div>
                    <div class="card-footer">
                        <form>
                            <div class="form-row">
                                <div class="col-auto my-1">
                                <label>Leave a Comment</label>
                                </div>
                                <div class="col-auto my-1">
                                    <input type="text" class="form-control" placeholder="Nickname" id="nickname">
                                </div>
                                <div class="col-auto my-1">
                                    <input type="text" class="form-control" placeholder="Comment" id="comment">
                                </div>
                                <div class="col-auto my-1">
                                    <button type="submit" class="btn btn-primary submit-comment" data-id=${data[i]._id} id="submit-comment">Submit Comment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                  </div>
                  `

            );
        }
    })

   $(document).on("click", "#submit-comment", function(event) {
    event.preventDefault();   
    console.log("click");
    const articleId = $(this).attr("data-id");
    const nickname = $("#nickname").val().trim();
    const body = $("#comment").val().trim();
    console.log(articleId);
    
    if (nickname === "") {
        $("#comment-div").html("<p>Please add a nickname</p>");
    }
    else if (body === "") {
        $("#comment-div").html("<p>Please add a comment</p>");
    }
    else {
        $.ajax({
            method: "POST",
            url: "api/postcomment/"+ articleId,
            data: {nickname, body, articleId}
        })
        .then(response => {
            
            // response.json(data);

        })
    }
}) 

});





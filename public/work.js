$(document).ready(function() {
    $("#articles").empty();
    $.get("/scrapedArticles", function(data) {
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
                      <a href="www.si.com/ + ${data[i].link}" class="btn btn-primary">Read Article</a>
                      <div id="comments"></div>
                    </div>
                  </div>
                  `

            );
        }
    })

});



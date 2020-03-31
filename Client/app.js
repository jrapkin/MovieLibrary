function runApp()
{
    retrieveData();
}

(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            //dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
               console.log( errorThrown );
            }
        });
        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);

function retrieveData()
{
    $.ajax(
    {
        url: "https://localhost:44325/api/movie",
        //dataType: 'json',
        type: "get",
        contentType: "application/json",
        success: (data) => {tableWithData(data)},
            //populate the table, 
        error: (data, textStatus, errorThrown) => alert(errorThrown) 
    })   
}

//oh yeah, I'm sure
function tableWithData(data)
{   
    $('#movieTable').html('');
    $.each(data, function (i, movie){
        $('#movieTable').append(
            "<tr>" +
                "<td>" + movie.title + "</td>"+
                "<td>" + movie.director + "</td>" +
                "<td>" + movie.genre + "</td>" +
                "<td>" + editButton() + "</td>" +
                "<td>" + deleteButton() + "</td>" +
                //add table column for edit button
                //add table column for delete
                //add column for image

            "</tr>"
            );
    });
}

function editButton()
{

    let button = document.createElement("BUTTON");
    button.innerHTML = "Edit";
    document.getElementById("movieTable").appendChild(button);

}

function deleteButton()
{
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    
    
}
function editMovieDetails(movieId)
{
    let movie = 
    {
        movieId: movieId,
        Title: this.title.value,
        Director: this.director.value,
        Genre: this.genre.value
    };
    $.ajax(
    {
        url: 'https://localhost:44325/api/movie?id='+ movieId,
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(movie),
        success: (data) => 
            {
                //reference the edit we use
            },
        error: (jqXhr, textStatus, errorThrown) => alert(errorThrown)
    });
}

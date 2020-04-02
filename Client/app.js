"use strict"

function addCss(CSSFile) {
    var link = $("<link />",{
      rel: "stylesheet",
      type: "text/css",
      href: CSSFile
    })
    $('head').append(link);
 }

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

let movieTable = document.getElementById("movieTable");
movieTable.style.

function tableWithData(data)
{   
    $('#movieTable').html('');
    $.each(data, function (i, movie){
        $('#movieTable').append(
            `<tr> 
                <td> ${movie.title}  </td>
                 <td> ${movie.director} </td>
                 <td> ${movie.genre} </td> 
                 <td> <button type='button' onclick='createForm(${movie.movieId},"${movie.title}","${movie.director}","${movie.genre}")'>Edit</button> 
                 </td>
            </tr>`
        );
    });
}

let editForm = document.getElementById("editForm");
editForm.style.width = "200px";
editForm.style.alignContent = "center";

function createForm(id,title,director,genre)
{
    document.getElementById("editHeader").innerHTML = '<h1> Edit Movie </h1>'
    document.getElementById("editForm").innerHTML = `<input hidden id="editId" value = "${id}"/>
    <input class="form-control" id="editTitle" type="text" name="title" value = "${title}" placeholder="${title}"/>
    <input class="form-control" id="editDirector" type="text" name="director" value = "${director}" placeholder="${director}"/>
    <input class="form-control" id="editGenre" type="text" name="genre" value = "${genre}" placeholder="${genre}"/>
    <button type='button' onclick='editMovieDetails()'>Submit Changes</button>` 

}

function editMovieDetails()
{
    let movie = {
        MovieId: $("#editId").val()*1,
        Title : $("#editTitle").val(),
        Director: $("#editDirector").val(),
        Genre: $("#editGenre").val()
    };
    $.ajax(
    {
        url: "https://localhost:44325/api/movie",
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(movie),
        success: (data) => {retrieveData(data)},
        //populate the table, 
       error: (jqXhr, textStatus, errorThrown) => alert(errorThrown)
    });
}


function deleteMovie(id,title,director,genre)
{
    let movie 
    {
        id,title,director,genre
    }
    $.ajax(   
    {
        url: 'https://localhost:44325/api/movie/delete/' + id, 
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify(movie),
        success: (data) => 
        {
            retrieveData(data)
        },
        error: (data, textStatus, errorThrown) => alert(errorThrown)
    });
}

function processForm()
{
    $('form.ajax').on('submit', function()
    {
        console.log("trigger");
        return false;
    });
}


"use strict"
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

function tableWithData(data)
{   
    $('#movieTable').html('');
    $.each(data, function (i, movie){
        $('#movieTable').append(
            `<tr> 
                <td> ${movie.title}  </td>
                 <td> ${movie.director} </td>
                 <td> ${movie.genre} </td> 
                 <td> <button type='button' onclick='createForm("${movie.movieId}","${movie.title}","${movie.director}","${movie.genre}")'>Edit</button> 
                 </td>
            </tr>`
        );
    });
}
//<td> ${deleteButton()} </td>` +
//add table column for edit button
//add table column for delete
//add column for image
//<td> <button onclick='delete(${movie.id})'>Delete</button> </td>

function edit(data)
{

    //let button = "<button class="btn-success btn-sm" value= "id">Edit</button>";
    //now we have to make the rest of the edit form i guess
    editMovieDetails(id);
    $('#editForm').submit( createForm );
}

function deletem(id)
{
    //let button = "<button class="btn-success btn=sm" value= "id">Delete</button>";
    //deleteMovie(id);
    
}

function createForm(id,title,director,genre)
{

    document.getElementById("editForm").innerHTML = `<input class="form-control" id="editId" type="text" name="movieId" value = "${id}"/>
    <input class="form-control" id="editTitle" type="text" name="title" value = "${title}" placeholder="${title}"/>
    <input class="form-control" id="editDirector" type="text" name="director" value = "${director}" placeholder="${director}"/>
    <input class="form-control" id="editGenre" type="text" name="genre" value = "${genre}" placeholder="${genre}"/>
    <button type='button' onclick='editMovieDetails()'>Submit Changes</button>` 

}

function editMovieDetails()
{
    let movie = {
        MovieId: $("#editId").val(),
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
        success: (data) => 
            {
                alert("success")
            },
       error: (jqXhr, textStatus, errorThrown) => alert(errorThrown)
    });
}
function manualCall()
{
    let movie =
    {
        MovieId: "5",
        Title: "test",
        Director: "test",
        Genre: "test"
    };
    $.ajax(
        {
            url:"https://localhost:44325/api/movie",
            dataType: "json",
            type: "put",
            contentType: "application/json",
            data: JSON.stringify(movie),
            success: function(data, textStatus, jQxhr) {
                $("#response pre").html(data);
              },
              error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);}        
        });
    
}


function deleteMovie(movieId)
{
    $.ajax(   
    {
        url: 'https://localhost:44325/api/movie/delete/' + movieId, 
        type: 'delete',
        contentType: 'json',
        data: JSON.stringify(data),
        success: (data) => 
        {
            //should return to updated table with deleted movie?
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


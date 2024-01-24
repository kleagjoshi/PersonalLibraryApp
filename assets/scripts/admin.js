class User{
    constructor(_id, _username, _email, _wishingListCount,_readingCount){

        this.id = _id;
        this.username = _username;
        this.email = _email;
        this.wishingListCount = _wishingListCount;
        this.readingCount=_readingCount;
    }
}

var users = [];

console.log('Userss (before request) = ', users);

//Request orders data from the api endpoint
//const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with the actual key
const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:44320/api/Admin/get-all-users',
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        //'Authorization': 'Bearer ' + token
    }
};


//Update with error handling
$.ajax(settings).done(function (response) {
    console.log(response);
    users = response;
    console.log('Users (after request response) = ', users);
    populateTable();
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('Error = ', errorThrown);
    console.log('Text Status = ', textStatus);
    console.log('jqXHR = ', jqXHR);

    // Check for a 401 Unauthorized response
    // if (jqXHR.status === 401) {
    //     alert('Unauthorized: Redirecting to login');
    //     window.location.href = 'login.html';
    // } else {
    //     alert('Error occurred while fetching orders');
    // }
});


//Get Table -> <tbody>
const usersTableBody = $("#usersTbl tbody");
usersTableBody.empty();

function populateTable(){
    $.each(users, function(index, user){

        console.log(`Index = ${index}. User = ${user}`);

        const newRowHtml = `<tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.wishingListCount}</td>
            <td>${user.readingCount}</td>
            <td>
                <button id="editBtn" data-user-id="${user.userId}">Edit</button>
                <button id="removeBtn" data-user-id="${user.userId}">Remove</button>
            </td>
        </tr>`;
        console.log(user.userId);
        usersTableBody.append(newRowHtml);
    });
}



$(usersTableBody).on('click', "#editBtn", function(){
    userIdEdit = $(this).data('user-id');

    //get user by id endpoint
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://localhost:44320/api/Admin/get-user-by-id?id=' + userIdEdit,
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },

    };

    $.ajax(settings).done(function (response) {
        console.log(response.username);
        $("#username").val(response.username);
        $("#email").val(response.email);
    });

    $("#editModal").show();
    console.log(userIdEdit);
});

//console.log(userIdEdit);

$("#updateBtn").click(function(){

    console.log(userIdEdit);

    UpdatedUser = {
        username: $("#username").val(),
        email: $("#email").val()
        
    };
    
    console.log(UpdatedUser);

    var settings = {
        async: true,
        crossDomain: true,
        url: 'https://localhost:44320/api/Admin/update-user-by-id?id=' + userIdEdit,
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(UpdatedUser)
    };

    $.ajax(settings).done(function (response) {
        console.log("response",response);
        if(response)
        {
            alert('User updated successfully');
        }
        else{
            alert("Update failed");
        }

    })

    $("#removeModal").hide();
    
});



//remove button functionality



$(usersTableBody).on('click', "#removeBtn", function(){
    userId = $(this).data('user-id');
    $("#removeModal").show();  

});

$("#cancelRemoveBtn").click(function(){
    $("#removeModal").hide();
});


$("#confirmBtn").click(function(){

    
    var url = 'https://localhost:44320/api/Admin/delete-a-user-by-id?id=' + userId;

    var settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    };

    $.ajax(settings).done(function (response) {
        if(response)
        {
            alert('User removed successfully');
            location.reload();
        }
        else{
            alert("This user can not be deleted because he has active books in his library!!");
        }

    });

    $("#removeModal").hide();
    
})

$("#closeEditModalSpn").click(function(){
    $("#editModal").hide();
});



//add stats from database

// Function to fetch data from the API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to update the HTML with fetched data
async function updateStats() {
    // Update Users count
    const usersUrl = 'https://localhost:44320/api/Admin/get-users-count';
    const usersCount = await fetchData(usersUrl);
    $('#usersCount').text(`USERS: ${usersCount}`);

    // Update Books count
    const booksUrl = 'https://localhost:44320/api/Admin/get-books-count';
    const booksCount = await fetchData(booksUrl);
    $('#booksCount').text(`BOOKS: ${booksCount}`);

    // Update Authors count
    const authorsUrl = 'https://localhost:44320/api/Admin/get-authors-count';
    const authorsCount = await fetchData(authorsUrl);
    $('#authorsCount').text(`AUTHORS: ${authorsCount}`);
}

// Call the updateStats function to fetch and update the counts
updateStats();


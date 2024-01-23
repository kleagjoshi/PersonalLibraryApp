// Login Form Connection
$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        console.log('Login form submitted');

        var username = $('#username').val();
        var password = $('#password').val();

        //Request orders data from the api endpoint
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://localhost:44320/api/Authentication/login-user',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({ email: username, password: password })
        };

        $.ajax(settings).done(function (response) {
            
            //Save token to localstorage
            localStorage.setItem('token', response.token);

            //Redirect to orders page
            alert('Authorized: Redirecting to your profile');
            window.location.href = 'myprofile.html';
            console.log("Authorized");
            
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error = ', errorThrown);
            console.log('Text Status = ', textStatus);
            console.log('jqXHR = ', jqXHR);

            // Check for a 401 Unauthorized response
            if (jqXHR.status === 401) {
                alert('Unauthorized: Redirecting to login');
                window.location.href = 'login.html';
            } else {
                alert('Error occurred while fetching orders');
            }
        });

        $(document).ready(function() {
        
            const authLink = document.getElementById('authLink');
            console.log(authLink);
            if (localStorage.getItem('token')) {
                authLink.innerHTML = '<a href="#" id="logoutLink">Log Out</a>';
                $('#logoutLink').click(function() {
                    localStorage.removeItem('token');
                    window.location.href = 'login.html';
                });
            } else {
                authLink.innerHTML = '<a href="login.html">Log In</a>';
            }

        });
    });
});

//Register form connection

$(document).ready(function() {
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();

        console.log('SignUp form submitted');

        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();

        //Request orders data from the api endpoint
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://localhost:44320/api/Authentication/register-user',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({ userName:username, email: email, password: password })
        };

        $.ajax(settings).done(function (response) {
            
            //Save token to localstorage
            localStorage.setItem('token', response.token);

            //Redirect to orders page
            alert('Authorized: Redirecting to your profile');
            window.location.href = 'myprofile.html';
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error = ', errorThrown);
            console.log('Text Status = ', textStatus);
            console.log('jqXHR = ', jqXHR);
        });
    });
});

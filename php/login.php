<!DOCTYPE <html>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Login</title>

</head>

<body style="font-family: sans-serif;">

        <form style="
                display: flex;
                flex-direction: column;
                gap: 10px;

                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                border-width: 2px;
                border-color: whitesmoke;
                border-style: solid;
                border-radius: 20px;
                width: 250px;
                padding: 20px;
        " method="post">

                <h1>Login</h1>

                <div style="display: flex; flex-direction: column; gap: 2px;">
                        <label for="username">Username</label>
                        <input name="username" style="border-radius: 5px; border-width: 1px; border-style: solid; padding: 3px;" required type="text">
                </div>

                <div style="display: flex; flex-direction: column; gap: 1px;">
                        <label for="">Password</label>
                        <input name="password" style="border-radius: 5px; border-width: 1px; border-style: solid; padding: 3px;" required type="password">

                </div>

                <input type="submit" style="margin: 10px 0px;" value="Login">

        </form>

</body>

</html>

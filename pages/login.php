<!DOCTYPE <html>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<?php
include("../php/config.php");
include("../views/head.php");
include("../php/components.php");

if (isset($_POST["login"])) {

        $username = $_POST["username"];
        $password = $_POST["password"];

        $result = getConn()->query("select * from users where `username`='$username' and `password`='$password'");

        if (!$result) {
                echo "Execute error: " . mysqli_error(getConn());
        }

        # user is found
        if ($result->num_rows == 1) {
                header("Location: ../index.php");
        }
}
?>

<title>Login</title>

<body style="font-family: sans-serif;" class="flex flex-col lg:flex-row">
        <div class="flex-1 flex items-center justify-center">
                <div class="card lg:w-96 w-full mx-4 my-14">
                        <div class="head">
                                <h5 class="m-5">Welcome back!</h5>
                        </div>

                        <form class="flex flex-col gap-5 m-10" method="post">

                                <?php input("username", "Username", "text") ?>

                                <?php input("password", "Password", "password") ?>

                                <input class="mt-2 filledBtn" name="login" type="submit" value="Login">

                                <!-- TODO: add account not found error -->

                                <a class="text-center hover:underline m-[-10px] text-sm text-neutral-700" href="?signup=true">Create a new account</a>

                        </form>
                </div>
        </div>

        <div class="flex-1">
                <!-- TODO: Add some good looking graphics here-->
        </div>
</body>

</html>

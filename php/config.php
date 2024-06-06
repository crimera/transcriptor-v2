<?php
global $conn;

// TODO: password should not be hardcoded
$conn = mysqli_connect("localhost", "dingle", "dingle", "transcriptordb", 3306);

function getConn(): mysqli
{
        global $conn;
        return $conn;
}

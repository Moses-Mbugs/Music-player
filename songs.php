<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "music_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM songs";
$result = $conn->query($sql);

$songs = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

header('Content-Type: application/json');
echo json_encode($songs);
?>

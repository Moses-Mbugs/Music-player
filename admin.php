<?php
$servername = "localhost";
$username = "root"; // use your database username
$password = ""; // use your database password
$dbname = "music_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $artist = $_POST['artist'];
    $photo = $_FILES['photo']['name'];
    $src = $_FILES['song']['name'];

    // Directory where files will be uploaded
    $target_dir = "uploads/";
    $target_file_photo = $target_dir . basename($photo);
    $target_file_song = $target_dir . basename($src);

    // Move uploaded files to the target directory
    move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file_photo);
    move_uploaded_file($_FILES["song"]["tmp_name"], $target_file_song);

    $sql = "INSERT INTO songs (title, artist, src, photo) VALUES ('$title', '$artist', '$target_file_song', '$target_file_photo')";

    if ($conn->query($sql) === TRUE) {
        echo "New song added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Song</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 50px;
        }
        form {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
        }
        label {
            display: block;
            margin-bottom: 10px;
        }
        input[type="text"],
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        input[type="submit"] {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #28a745;
            color: #fff;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<h1>Add New Song</h1>
<form action="add_song.php" method="post" enctype="multipart/form-data">
    <label for="title">Song Title:</label>
    <input type="text" id="title" name="title" required>

    <label for="artist">Artist Name:</label>
    <input type="text" id="artist" name="artist" required>

    <label for="photo">Photo:</label>
    <input type="file" id="photo" name="photo" accept="image/*" required>

    <label for="song">Song File:</label>
    <input type="file" id="song" name="song" accept="audio/*" required>

    <input type="submit" value="Add Song">
</form>

</body>
</html>

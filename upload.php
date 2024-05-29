<?php
if (isset($_FILES['file']['name'])) {
	move_uploaded_file($_FILES['file']['tmp_name'], "server/files/" . $_FILES['file']['name']);
}

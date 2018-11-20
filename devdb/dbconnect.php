
<?php

/*  //define('HOST','localhost');
  //define('USER','rout');
  //define('PASS', '');
  //define('DB','sant-alert');
  //$con = mysqli_connect(HOST,USER,PASS,DB);
  $con = new mysqli("localhost", "root", "", "sant-alert");

  if (!$con){
	 die("Error in connection" . mysqli_connect_error()) ;
  }
*/

define('HOST','localhost');
define('USER', 'root');
define('PASS','');
define('DB','sant-alert');
$con = mysqli_connect(HOST,USER,PASS,DB);

if (!$con){
    die("Error in connection" . mysqli_connect_error()) ;
}


?>

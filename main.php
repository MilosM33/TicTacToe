<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body>
      <center>
         <h1>TIC TAC TOE</h1>
      </center>
      <div id="mobilenav" style="display: none;" onclick="ShowMobileNav()">button</div>
      <div class="navcontainer">
         <div>Find Match</div>
         <div onclick="playWithAi()">Practise with Ai</div>
         <a href="index.php">Home</a>
         <a href="#">Leaderboard</a>
         <div>
            My Account
         </div>
         <?php
            if(isset($_SESSION["userid"])){
                echo "<a href=#".">Logout</a>";
            }
            else{
                echo "<a href=#".">Login/Register</a>";
            }
            ?>
      </div>
      </div>
      </div>
   </body>
</html>
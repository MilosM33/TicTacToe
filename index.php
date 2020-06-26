<?php
   require("main.php");
   
   if(isset($_SESSION["inGame"])){
       header("Location:index.php?error=inGame");
   }
   ?>
<div id="content">
   <h2>You won</h2>
   <table>
      <tr>
         <td id ="0"></td>
         <td id ="1"></td>
         <td id ="2"></td>
      </tr>
      <tr>
         <td id ="3"></td>
         <td id ="4"></td>
         <td id ="5"></td>
      </tr>
      <tr>
         <td id ="6"></td>
         <td id ="7"></td>
         <td id ="8"></td>
      </tr>
   </table>
   <div id="chat">
      <div id="text">
      </div>
      <input type="text" name="" id="textBox">
      <input type="button" value="Send">
   </div>
</div>
<?php
   require("footer.php");
   
   ?>
<script src="javascript/minimax.js"></script>
<script src="javascript/website.js"></script>
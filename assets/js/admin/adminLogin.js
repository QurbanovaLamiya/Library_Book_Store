$(document).ready(function() {

      $('#joinButton').click(function () {
        $('#adminLogin').hide()          
         $('#AdminPanel').show()
      })
      $('#adminLogout').click(function() {
        $('#AdminPanel').hide()      
        $('#adminLogin').show()
      })
  })
$(document).ready(function() {

  let sidebar = $('.sidebar')
    $('.hamburger').click(function () {
      $('#adminpanel').hide()          
       sidebar.show()
    })
    $('.x-image').click(function() {
      sidebar.hide()      
      $('#adminpanel').show()
    })
})
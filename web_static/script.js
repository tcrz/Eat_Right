$(document).ready(function () {
  // RECIPE SUBMISSION POP-UP
  $('.add-recipe').click(function() {
      $('.popup-bg').fadeIn(200)
  });

  $('.recipe-submission ion-icon').click(function() {
    $('.popup-bg').fadeOut(100)
  });

  // RECIPE VIEW POP-UP
  $('.recipe').click(function() {
    console.log('recipeview clicked too!')
    $('.recipe-view-popup-bg').fadeIn(200)
  });

  $('.recipe-view ion-icon').click(function() {
    $('.recipe-view-popup-bg').fadeOut(100)
  });

})
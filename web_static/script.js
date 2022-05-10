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

   /**************************
    DISPLAY/HIDE SEARCH FIELD       
   ***************************/
  $('td.add-item').click(function(){
     /* TOGGLE SEARCH FIELD */
    $(this).parents().children('tr.search-field').toggleClass('hide')

    /* TOGGLE TEXT */
    $(this).find('p').text(function(i, text){
      return text === "Add Item" ? "Cancel" : "Add Item";
    })

    /* TOGGLE ICON */
    $(this).find('ion-icon').attr('name', function(i, attr){
      return attr === "add-outline" ? "close-outline" : "add-outline";
    })
  })

  /**************************
        CALORIE-API CALL       
   ***************************/
  let calories_list = []
  $('.search-btn > button').click(function(){
    let quantity = $(this).closest('.search-field').find('.search > input[type="number"]').val()
    let serving = $(this).closest('.search-field').find('.search > select').val()
    let foodname = $(this).closest('.search-field').find('.search > input[type="text"]').val()
    let searchField = $(this).closest('.search-field')
    let query = quantity + ' ' + serving + ' of ' + foodname
    console.log(query)
    $.ajax({
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: { 'X-Api-Key': 'z0bwMtcPSNWcWoDNuOcP4g==FlVIjmtXs0Pn10vC'},
      contentType: 'application/json',
      success: function(result) {
        if (result['items'].length == 0)
        {
          console.log('food not found')
        }
        else {
          const calories = result['items'][0]['calories'];
          const name = result['items'][0]['name'];
          let row = '<tr><td class="food">' + name.toUpperCase() + ' <br> <span class="serving"><p>' + quantity + ' ' + serving +
          '</p></span></td>' + '<td>' + calories + '</td></tr>'
          $(row).insertBefore(searchField)
          calories_list.push(calories)
          // console.log(t)
          let sum = 0;
          for (let i = 0; i < calories_list.length; i++) {
              sum += calories_list[i];
          }
          $('.total .total-value ').text(sum + ' Calories')
        }
      },
      error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
      }
      });
    })

})
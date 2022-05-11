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
          let row = '<tr class="food-query"><td class="food">' + name.toUpperCase() + ' <br> <span class="serving"><p>' +
          quantity + ' ' + serving + '</p></span></td>' + '<td class=calories>' + '<div style="display:flex;justify-content:space-between;">' +
          '<p>' + calories + '</p>' + '<ion-icon name="remove-outline" style="color:red;cursor:pointer;"></ion-icon></div></td></tr>'
          $(row).insertBefore(searchField)
          // calories_list.push(calories)
          let sum = $('.total .total-value').text().split(' ')[0]
          sum = parseFloat(sum)
          console.log(sum)
          sum += calories;
          sum = sum.toFixed(1) * 1
          $('.total .total-value ').text(sum + ' Calories')
        }
      },
      error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
      }
      });
    })

  // DELETE FOOD ROW AND UPDATE CALORIES
  $('table').on('click', '.calories > div > ion-icon', function() {
    let foodCal = $(this).closest('.food-query').find('.calories p ').text().split(' ')[0]
    let totalCal = $('.total .total-value').text().split(' ')[0]
    $(this).closest('.food-query').remove()
    totalCal = (parseFloat(totalCal) - parseFloat(foodCal)).toFixed(1)
    console.log('total:', totalCal)
    $('.total .total-value ').text(totalCal + ' Calories')
  })
})
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
    $('.recipe-view-popup-bg').empty()
    id = $(this).attr('id')
    console.log(id)
    $.get('http://0.0.0.0:5001/api/v1/recipe/' + id, function (data) {
      ingr_template = ''
      ingredients_list = data.ingredients.split('\n')
      ingredients_list.forEach(function(item){
        li = '<li>' + item + '</li>\n'
        ingr_template += li
      })
      prepr_template = ''
      prepartion = data.preparation.split('\n')
      prepartion.forEach(function(step){
        li = '<li>' + step + '</li>\n'
        prepr_template += li
      })
      imgpath = '../static/images/' + data.filename
      popup_template = '<div class="recipe-view"><div class="head">' + '<h1 class="recipe-name">' + data.name + '</h1>' +
      '<img src=' + imgpath + ' alt="recipe-image">' + '</div>' + '<div class="ingredients">' + '<h2>Ingredients</h2>' +
      '<ul>' + ingr_template + '</ul>' + '</div>' + '<div class="preparation">' + '<h2>Preparation</h2>' + '<ol>' + prepr_template +
      '</ol>' + '</div>' + '<h4>' + 'By ' + data.user_name +'</h4>' + '<ion-icon name="close-outline"></ion-icon>' + '</div>'
      $('.recipe-view-popup-bg').append(popup_template)
    });
    $('.recipe-view-popup-bg').fadeIn(200)
  });

  // RECIPE VIEW POP-UP EXIT
  $('.recipe-view-popup-bg').on('click', '.recipe-view ion-icon',function() {
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
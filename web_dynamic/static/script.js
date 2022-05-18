$(document).ready(function () {
  // RECIPE SUBMISSION POP-UP
  $('.add-recipe').click(function () {
    $('.popup-bg').fadeIn(200);
  });

  $('.recipe-submission ion-icon').click(function () {
    $('.popup-bg').fadeOut(100);
  });

  // RECIPE VIEW POP-UP
  $('.recipes_list').on('click', '.recipe', function () {
    $('.recipe-view-popup-bg').empty();
    const id = $(this).attr('id');
    console.log(id);
    $.get('http://0.0.0.0:5001/api/v1/recipe/' + id, function (data) {
      let ingrTemplate = '';
      const ingredientsList = data.ingredients.split('\n');
      ingredientsList.forEach(function (item) {
        const li = '<li>' + item + '</li>\n';
        ingrTemplate += li;
      });
      let preprTemplate = '';
      const prepartion = data.preparation.split('\n');
      prepartion.forEach(function (step) {
        const li = '<li>' + step + '</li>\n';
        preprTemplate += li;
      });
      const imgpath = '../static/images/' + data.filename;
      const popupTemplate = '<div class="recipe-view"><div class="head">' + '<h1 class="recipe-name">' + data.name + '</h1>' +
        '<img src=' + imgpath + ' alt="recipe-image">' + '</div>' + '<div class="ingredients">' + '<h2>Ingredients</h2>' +
        '<ul>' + ingrTemplate + '</ul>' + '</div>' + '<div class="preparation">' + '<h2>Preparation</h2>' + '<ol>' + preprTemplate +
        '</ol>' + '</div>' + '<h4>' + 'By ' + data.user_name + '</h4>' + '<ion-icon name="close-outline"></ion-icon>' + '</div>';
      $('.recipe-view-popup-bg').append(popupTemplate);
    });
    $('.recipe-view-popup-bg').fadeIn(200);
  });

  // RECIPE VIEW POP-UP EXIT
  $('.recipe-view-popup-bg').on('click', '.recipe-view ion-icon', function () {
    $('.recipe-view-popup-bg').fadeOut(100);
  });
  /**************************
    DISPLAY/HIDE SEARCH FIELD
  ***************************/
  $('td.add-item').click(function () {
    /* TOGGLE SEARCH FIELD */
    $(this).parents().children('tr.search-field').toggleClass('hide');

    /* TOGGLE TEXT */
    $(this).find('p').text(function (i, text) {
      return text === 'Add Item' ? 'Cancel' : 'Add Item';
    });

    /* TOGGLE ICON */
    $(this).find('ion-icon').attr('name', function (i, attr) {
      return attr === 'add-outline' ? 'close-outline' : 'add-outline';
    });
  });

  /**************************
        CALORIE-API CALL
   ***************************/
  $('.search-btn > button').click(function () {
    const quantity = $(this).closest('.search-field').find('.search > input[type="number"]').val();
    const serving = $(this).closest('.search-field').find('.search > select').val();
    const foodname = $(this).closest('.search-field').find('.search > input[type="text"]').val();
    const searchField = $(this).closest('.search-field');
    const query = quantity + ' ' + serving + ' of ' + foodname;
    console.log(query);
    $.ajax({
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: { 'X-Api-Key': 'z0bwMtcPSNWcWoDNuOcP4g==FlVIjmtXs0Pn10vC' },
      contentType: 'application/json',
      success: function (result) {
        if (result.items.length === 0) {
          console.log('food not found');
        } else {
          const calories = result.items[0].calories;
          const name = result.items[0].name;
          const row = '<tr class="food-query"><td class="food">' + name.toUpperCase() + ' <br> <span class="serving"><p>' +
            quantity + ' ' + serving + '</p></span></td>' + '<td class=calories>' + '<div style="display:flex;justify-content:space-between;">' +
            '<p>' + calories + '</p>' + '<ion-icon name="remove-outline" style="color:red;cursor:pointer;"></ion-icon></div></td></tr>';
          $(row).insertBefore(searchField);
          // calories_list.push(calories)
          let sum = $('.total .total-value').text().split(' ')[0];
          sum = parseFloat(sum);
          console.log(sum);
          sum += calories;
          sum = sum.toFixed(1) * 1;
          $('.total .total-value ').text(sum + ' Calories');
        }
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  });

  // DELETE FOOD ROW AND UPDATE CALORIES
  $('table').on('click', '.calories > div > ion-icon', function () {
    const foodCal = $(this).closest('.food-query').find('.calories p ').text().split(' ')[0];
    let totalCal = $('.total .total-value').text().split(' ')[0];
    $(this).closest('.food-query').remove();
    totalCal = (parseFloat(totalCal) - parseFloat(foodCal)).toFixed(1);
    console.log('total:', totalCal);
    $('.total .total-value ').text(totalCal + ' Calories');
  });

  // predictor
  $('.submittion').click(function () {
    let age = $('.age').val();
    let act = $('.act').children('option:selected').val()
    let gender = $('.gender:checked').val();
    let url = 'http://0.0.0.0:5001/api/v1/age/' + gender + '/' + act + '/' + age

    $.ajax({
      type: "get",
      url: url,
      success: function (response) {
        $('.calorie-amount').text(response.calorie_amount);
      }
    });
  });

  // SEARCH FOR RECIPE
  $('.search_text').on("input", function () {
    text = $('.search_text').val();
    if (text.length > 0) {
      $.ajax({
        type: "POST",
        url: "/livesearch",
        data: { text: text },
        success: function (response) {
          $('.recipes_list').empty();
          $.each(response, function (indexInArray, valueOfElement) {
            let mimetype = '.png'
            $('.recipes_list').append(
              '<article class="recipe" id=' + valueOfElement.id + '>' +
              '<div class="category">' +
              '<img src=../static/images/' + valueOfElement.category + mimetype + ' alt="recipe logo" />' +
              '</div>' +
              '<img src=../static/images/' + valueOfElement.filename + ' alt="recipe imgaes">' +
              '<div class="content"> <div class="food_name">' +
              '<h2>' + valueOfElement.name + '</h2> </div>' +
              '<div class="author">' +
              '<p>' + 'By ' + valueOfElement.user_name + '</p> </div>' +
              '</div> </article>'
            );
          });
        }
      });
    }
  });
});

$(document).ready(function () {
  // STICKY NAV
  const num = 200;
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
      $('nav').addClass('sticky-nav');
    } else {
      $('nav').removeClass('sticky-nav');
    }
  });

  // RECIPE SUBMISSION POP-UP
  $('.add-recipe').click(function () {
    $('.popup-bg').fadeIn(90);
  });

  $('.recipe-submission ion-icon').click(function () {
    $('.popup-bg').fadeOut(90);
  });

  // RECIPE VIEW POP-UP
  $('.recipes_list, .recipes_search').on('click', '.recipe', function () {
    $('.recipe-view-popup-bg').empty();
    const id = $(this).attr('id');
    console.log(id);
    $.get('https://eat-right-api-q5n8.onrender.com/api/v1/recipe/' + id, function (data) {
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
    $('.recipe-view-popup-bg').fadeIn(50);
  });

  // RECIPE VIEW POP-UP EXIT
  $('.recipe-view-popup-bg').on('click', '.recipe-view ion-icon', function () {
    $('.recipe-view-popup-bg').fadeOut(50);
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
        CALORIE-COUNTER
   ***************************/
  $('.search-btn > button').click(function () {
    // grab values from all necessary search boxes
    const quantity = $(this).closest('.search-field').find('.search > input[type="number"]').val();
    const serving = $(this).closest('.search-field').find('.search > select').val();
    const foodname = $(this).closest('.search-field').find('.search > input[type="text"]').val();
    const searchField = $(this).closest('.search-field');
    const query = quantity + ' ' + serving + ' of ' + foodname;
    /* CALORIE-API CALL + DATA RETRIVAL */
    $.ajax({
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: { 'X-Api-Key': 'z0bwMtcPSNWcWoDNuOcP4g==FlVIjmtXs0Pn10vC' },
      contentType: 'application/json',
      success: function (result) {
        if (result.items.length === 0) {
          console.log('food not found');
        } else {
          // retrieve calorie value and foodname from api
          const calories = result.items[0].calories;
          const name = result.items[0].name;
          // create template for food row and fill with data from api
          const row = '<tr class="food-query"><td class="food">' + name.toUpperCase() + ' <br> <span class="serving"><p>' +
            quantity + ' ' + serving + '</p></span></td>' + '<td class=calories>' + '<div style="display:flex;justify-content:space-between;">' +
            '<p>' + calories + '</p>' + '<ion-icon name="remove-outline" style="color:red;cursor:pointer;"></ion-icon></div></td></tr>';
          // insert the row right above search field
          $(row).insertBefore(searchField);
          // retrieve current value
          let sum = $('.total .total-value').text().split(' ')[0];
          sum = parseFloat(sum);
          sum += calories;
          sum = sum.toFixed(1) * 1;
          // update total calories value with new total
          $('.total .total-value ').text(sum + ' Calories');
        }
      },
      error: function ajaxError (jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  });

  /* DELETE FOOD ROW AND UPDATE TOTAL CALORIES */
  $('table').on('click', '.calories > div > ion-icon', function () {
    // retrieve value of clicked food row
    const foodCal = $(this).closest('.food-query').find('.calories p ').text().split(' ')[0];
    // retrieve value of total calories
    let totalCal = $('.total .total-value').text().split(' ')[0];
    $(this).closest('.food-query').remove();
    // subtract food row calorie value from total calorie value
    totalCal = (parseFloat(totalCal) - parseFloat(foodCal)).toFixed(1);
    console.log('total:', totalCal);
    // update total calories value with new total
    $('.total .total-value ').text(totalCal + ' Calories');
  });

  /**************************
        CALORIE-PREDICTOR
   ***************************/
  const forPregnancy = document.getElementById('for-pregnant');
  const forAll = document.getElementById('for-all');
  const term = document.getElementById('term');
  $('#gender').click(function () {
    // if gender option is female ask for pregnancy status
    forPregnancy.style.display = 'block';
    forAll.style.display = 'none';
    // if gender option is female remove the value of age and activity
    $('.act').val('');
    $('.age').val('');
  });
  $('#Yes').click(function () {
    // if pregnant ask for stage of pregnancy
    term.style.display = 'inline';
  });
  $('#No, #Male').click(function () {
    // if gender option is male go don't ask pregnancy status
    forPregnancy.style.display = 'none';
    term.style.display = 'none';
    forAll.style.display = 'block';
  });
  $('.submission').click(function () {
    // get the calorie amount based on the input given
    const age = $('.age').val();
    const act = $('.act').children('option:selected').val();
    const gender = $('.gender:checked').val();
    const term = $('.trimester:checked').val();
    const url = 'https://eat-right-api-q5n8.onrender.com/api/v1/age/' + gender + '/' + act + '/' + age;
    // limitation for the form
    if (age < 4 || age > 100) {
      $('.calorie-amount').text('Please complete the form (Age range should be between 4 and 100)').css('color', 'red');
    }
    // get calorie amount based on age, gender and activity level
    $.ajax({
      type: 'get',
      url: url,
      success: function (response) {
        $('.calorie-amount').text(response.calorie_amount).css('color', '#5db85d');
      }
    });
    // get calorie amount based on term of pregnancy
    if (term === 'First') {
      $('.calorie-amount').text('You daily intake should be 1800 calories').css('color', '#5db85d');
    } else if (term === 'Second') {
      $('.calorie-amount').text('You daily intake should be 2200 calories').css('color', '#5db85d');
    } else if (term === 'Third') {
      $('.calorie-amount').text('You daily intake should be 2400 calories').css('color', '#5db85d');
    }
  });

  /**************************
        RECIPE SEARCH
  ***************************/
//   $('.search-text').on('input', function () {
//     let text = $('.search-text').val();
//     //console.log(text) 
//    // if search bar is not empty, hide default view
//     if (text.length > 0) {
//       $('.recipes_list').hide();
//       // sends search query to api route
//       $.ajax({
//         type: 'POST',
//         url: 'https://eat-right-api-q5n8.onrender.com/api/v1/livesearch',
//         data: { text: text },
//         success: function (response) {
//           if (!jQuery.isEmptyObject(response)) {
//             console.log(response)
//             $('.recipes_search').empty();
//             // loops through response and creates recipe template with response data
//             $.each(response, function (indexInArray, valueOfElement) {
//               const mimetype = '.png';
//               // add data to html template and append to recipes_search div
//               $('.recipes_search').append(
//                 '<article class="recipe" id=' + valueOfElement.id + '>' +
//                 '<div class="category">' +
//                 '<img src=../static/images/' + valueOfElement.category + mimetype + ' alt="recipe logo" />' +
//                 '</div>' +
//                 '<img src=../static/images/' + valueOfElement.filename + ' alt="recipe imgaes">' +
//                 '<div class="content"> <div class="food_name">' +
//                 '<h2>' + valueOfElement.name + '</h2> </div>' +
//                 '<div class="author">' +
//                 '<p>' + 'By ' + valueOfElement.user_name + '</p> </div>' +
//                 '</div> </article>'
//               );
//             });
//           } else {
//             // $('.recipes_search').append('<p>NO MEAL FOUND</p>') 
//           }
//         }
//       });
//     } else {
//       // shows default recipes list, if search bar is empty.
//       text=''
//       console.log('empty search')
//       $('.recipes_search').empty();
//       $('.recipes_list').show();
//     }
//   });
});

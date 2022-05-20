<h1>Eat_Right</h1>
<p>Eat Right is an application that is a calorie counter and also recipe viewing and adding app.</p>
<p>Here we will discuss on how the app works. We will describe the stp by step. So Hop on board and let's Begin</p>
<p>We will first describe what the given files are when you open the Repository </p>
<ol>
  <li><h4>AUTHORS</h4>
  <p>In this file you'll find the email and the github user names of the developers</p></li>
  <li><h4>dumpable.sql</h4>
  <p>This is the sql file that holds the statements used to create and populate the database. Before you begin, make sure you have installed mysql server.</p>
  <p>Run this command to dump it to the server.</p>
  <p>cat dumpable.sql | mysql -uroot -p</p></li>
  <li><h4>for_running_flask.txt</h4>
  <p>Inside this file you'll find the commands to run the webpage and api. You need to open two terminal. One for each to run on.</p></li>
  <li><h4>sample_images & sample_recipes.txt</h4>
  <p>These two files will contain the information you'll need to populate the submit form on the webpage. More on this later</p></li>
  <li><h4>tables</h4>
  <p>This folder will hold the backend portion of how the models are created and how the database runs.</p></li>
  <li><h4>api</h4>
  <p>This folder will hold all the routes we used on the backend to make the front-end dynamic</p></li>
  <li><h4>web_dynamic</h4>
  <p>This folder holds the html, css, javascript of the webpage</p></li>
  <li><h4>web_static</h4>
  <p>This folder hold the static onstent of the webpage, html and css</p><li>
</ol>
<p>Now that we are we know hwta each file does let us run and dump what we need and let's begin</p>

<h3>Landing Page</h3>
<img src='https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/landing_page.png'
<p>This is the landing page. On the top are links you can click on to take you to the diffrent areas of the webpage</p>

<h4>Calorie Predictor</h4>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/male_predictor.png?raw=true')
<p>Here is the calorie predictor. You will click or type in your information, such as  your age, gender and activity level on daily bases and it will show you how much you calorie intake should be.</p>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/female_predictor.png?raw=true')
<p>It gives alternative options for women who are pregnant as well</p>
<p>Ones you know how much your daily intake should be you can scroll down to the calorie counter section.</p>

<h4>Calorie Counter</h4>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/calorie_counter.png?raw=true')
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/calorie_counter_dinner.png?raw=true')
<p>Here you'll put in your meals to determine how much you ate.</p>
<p>Example: This person had clicked on 'Add Item' and we can see that they ate Chicken for supper that is of one Unit.</p>
<p>We can also see that, chicken of one unit is 189.2 Calories.</p>
<p>What you'll do is add your breakfast, lunch, supper and snakc meals and the counter will display on total how much you ate.
You will then get to see it is the amount you should be eating on daily basis, based on the calorie preditors calculation.</p>
<p>Let us scroll down and explore more</p>

<h4>Recipe</h4>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/recipe.png?raw=true')
<p>Here you will find a list of recipes people from around the world have submitted. You can even search for recipe you are looking for on the search button.</p>
<p>Each card comes with image of the food, name of the food, user who submitted the food and a badge on top to tell you the category of the food. It can be Snack, Dish, Soup, Stew, Drink...etc.</p>
<p>When you click on each card a pop-op will appear to show you the ingredients and preparation of the meal</p>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/recipe_view.png?raw=true')
<p>This section also comes with add recipe card where you can add your favorite dishes on the site. Click on the 'Plus sign' on the grey Add recipe and you'll find a submit form</p>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/submit.png?raw=true')
<p>The Submit form has many input fields where one can fill out. There is user name, recipe name, choose image(Image of the food), category(List of categories to pick from), Ingrediets(It shows you how to place ingredients), and preparation(It also show you how to add preparation section).</p>
<p>Once you fill out all the required input you then click submit. It will then be displayed on recipe section</p>
<p>Above we mentioned files called sample\_images and sample\_recipe.txt. These files have sample recipes you can try on the submit form.</p>
<p>Let us scroll down</p>

<h4>About Us</h4>
![alt text]('https://github.com/tcrz/Eat_Right/blob/dev/web_dynamic/static/images/readme_images/About_us.png?raw=true')
<p>This section briefly summerizes the app and the development of the app. You can read it for more details.</p>
<p>Let us scroll down</p>

<h4>Developers</h4>
<p>Here you will learn who the developers are and what they contributed to the making of the app</p>

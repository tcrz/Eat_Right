DROP DATABASE IF EXISTS eat_right_db;

CREATE DATABASE IF NOT EXISTS eat_right_db;

CREATE USER IF NOT EXISTS 'eat_right_devs' @'localhost' IDENTIFIED BY 'eat_right_dev_pwd';

GRANT ALL PRIVILEGES ON eat_right_db.* TO 'eat_right_devs' @'localhost';

FLUSH PRIVILEGES;

USE eat_right_db;

DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` (
    `id` varchar(45) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `name` varchar(45) NOT NULL,
    `ingredients` varchar(32000) NOT NULL,
    `preparation` varchar(32000) NOT NULL,
    `user_name` varchar(45) NOT NULL,
    `filename` varchar(200) NOT NULL,
    `mimetype` varchar(10) NOT NULL,
    `category` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOCK TABLES `recipes` WRITE;

INSERT INTO
    `recipes`
VALUES
    (
        '36715801-50a6-4ed5-8388-282b2b83dd15',
        '2022-05-16 18:07:26',
        'Italian Pasta Sauce',
        '1 TSP Finely Chopped Basil\r\n1 TSP Finely Chopped Parsely\r\n2 TBSP Oil\r\n5 TBSP of Tomato Paste\r\n2 TSP Salt\r\n2 TSP Pepper\r\n1 whole Pasta\r\n3 Cups of water',
        'Add the basil, parsely, oil to a pan\r\nLet it cook till slightly brown\r\nRemove the pan from heat and Add the tomato paste\r\nAdd water to paste until it has watery thickness, you do not need to add all of it\r\nAdd salt and black Pepper and let it cook for 7 to 10 minutes until it becomes thick\r\nServe immediately or after chilled',
        'Samra Solomon',
        'Italian_Styled_Spaghetti.jpg',
        'image/jpeg',
        'Sauce'
    ),
    (
        '45ea5988-27a5-4e6a-becf-5c5605df6957',
        '2022-05-16 17:42:29',
        'Ghana Waakye',
        '5 1/2 cups white rice\r\n2 Cups Black Eye Peas\r\n10-12 pieces of millet or waakye leaves\r\n1 TSP Baking soda\r\n1 TSP Salt\r\n5-7 Cups Water',
        ' Wash and soak beans overnight, or if in a hurry soak for 30 minutes\r\nStrain the water and transfer the bean to cooking pot and add the waakye leaves, baking soda, 3 cups of water and stir\r\nKeep stiring and Cook for 8 minutes\r\nWash the rice and add it to the pot also add 3 cups of water and salt\r\nCook rice for 10 minutes and remove the waakye leaves, fluff the rice with fork and cook for 10 more minutes\r\nFluff the rice with fork again, cover it with a paper towel until the rice is soft\r\nServer with tomato stew, fried fish, boiled egg, gari, spaghetti, and shito on the size',
        'Tony Baidoo',
        'Waakye.jpg',
        'image/jpeg',
        'Dish'
    ),
    (
        '7053fd4c-c21c-4461-8ca9-2588ff4dffbe',
        '2022-05-16 17:37:03',
        'Chocolate Pudding',
        '1 Cup Sugar\r\n1/2 Cup Cocoa Powder\r\n1/4 Cup Corn Starch\r\n300 ml Milk\r\n1 TBSP Vanilla',
        'Add the sugar, cocoa powder and corn starch on a pot, stir over medium heat for 10 minutes.\r\nAdd milk to the pot and stir constantly until it thickens.\r\nRemove from heat after it starts boiling, or let it boil for a minute.\r\nAdd Vanilla and stir.\r\nServe after 4 hrs of refrigeration.',
        'Samra Solomon',
        'Chocolate_pudding.png',
        'image/png',
        'Dessert'
    ),
    (
        'e59a5c09-e328-4fee-aa90-0331b4095f6f',
        '2022-05-16 17:37:44',
        'Shiro',
        '1 large Onion diced\r\n1 large tomato diced\r\n1 Medium Green pepper\r\n2 Cloves of garlic minced\r\n3 TBSP Oil\r\n4 TBSP of Chickpea Flour, more if necessary\r\n1 Liter water\r\n2 TSP salt',
        'Cook the onion, tomato, garlic and oil on a pot, on medium heat till golden brown\r\nAdd the water and bring it to boil\r\nAdd the chickpea flour while stirring the boiling water\r\nStir constantly until there is no lump\r\nAdd the green pepper and salt and close the lid\r\nLet it cook on  medium heat for 20 minutes\r\nServe while hot',
        'Samra Solomon',
        'Shiro.png',
        'image/png',
        'Stew'
    );

UNLOCK TABLES;
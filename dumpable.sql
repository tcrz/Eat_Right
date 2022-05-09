CREATE DATABASE IF NOT EXISTS eat_right_db;
CREATE USER IF NOT EXISTS 'eat_right_devs'@'localhost' IDENTIFIED BY 'eat_right_dev_pwd';
GRANT ALL PRIVILEGES ON eat_right_db.* TO 'eat_right_devs'@'localhost';
FLUSH PRIVILEGES;

USE eat_right_db;


DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` 
	(`id` varchar(45) NOT NULL, 
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
	`name` varchar(45) NOT NULL,
	`image` varchar(55) NOT NULL,
	`ingredients` varchar(32000) NOT NULL, 
	`preparation` varchar(32000) NOT NULL, 
	`user_name` varchar(45) NOT NULL, 
	PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `recipes` WRITE;

INSERT INTO `recipes` VALUES ('05b0b99c-f10e-4e3a-88d1-b3187d6998ee', '2022-05-07 02:17:06','Shiro', 'https://imgur.com/5w4QioS','1 large Onion diced</br>1 large tomato diced</br> 1 Medium Green pepper</br>2 Cloves of garlic minced</br>3 TBSP Oil</br>4 TBSP of Chickpea Flour, more if necessary</br>1 Liter water</br>2 TSP salt</br>', '<ol><li>Cook the onion, tomato, garlic and oil on a pot, on medium heat till golden brown</li><li>Add the water and bring it to boil</li><li>Add the chickpea flour while stirring the boiling water</li><li>Stir constantly until there is no lump</li><li>Add the green pepper and salt and close the lid</li><li>Let it cook on  medium heat for 20 minutes</li><li>Serve while hot</li></ol>', 'Samra Solomon'), ('421a55f4-7d82-47d9-b54c-a76916479545', '2022-05-07 02:18:06', 'Vegan Italian Styled Pasta', 'https://imgur.com/HAk9CdP','1 TSP Finely Chopped Basil</br>1 TSP Finely Chopped Parsely</br>2 TBSP Oil</br>5 TBSP of Tomato Paste</br>2 TSP Salt</br>2 TSP Pepper</br>1 whole Pasta</br>3 Cups of water</br>','<ol><li>Add the basil, parsely, oil to a pan</li><li>Let it cook till slightly brown</li><li>Remove the pan from heat and Add the tomato paste</li><li>Add water to paste until it has watery thickness, you do not need to add all of it</li><li>Add salt and black Pepper and let it cook for 7 to 10 minutes until it becomes thick</li><li>Boil water for the pasta, add oil and salt then add pasta until it gets cooked</li><li>Mix the sauce with pasta</li><li>Serve while hot or cool</li><li>Optional add cheese on top</li></ol>','Samra Solomon'), ('1e0f976d-beef-497b-b29c-b4a25d1c071a', '2022-05-09 11:17:06', 'Ghana Waakye', 'https://imgur.com/Rvu9PFq','5 1/2 cups white rice</br>2 Cups Black Eye Peas</br>10-12 pieces of millet or waakye leaves</br>1 TSP Baking soda</br>1 TSP Salt</br>5-7 Cups Water</br>', '<ol><li>Wash and soak beans overnight, or if in a hurry soak for 30 minutes</li><li>Strain the water and transfer the bean to cooking pot and add the waakye leaves, baking soda, 3 cups of water and stir</li><li>Keep stiring and Cook for 8 minutes</li><li>Wash the rice and add it to the pot also add 3 cups of water and salt</li><li>Cook rice for 10 minutes and remove the waakye leaves, fluff the rice with fork and cook for 10 more minutes</li><li>Fluff the rice with fork again, cover it with a paper towel until the rice is soft</li><li>Server with tomato stew, fried fish, boiled egg, gari, spaghetti, and shito on the size</li></ol>', 'Tony Baidoo');

UNLOCK TABLES;

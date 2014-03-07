<?php

/**
* index.php.  This file contains all the backend functions that run the website
* Uses Slim framework.  
*/

session_cache_limiter(false);
session_start();

require 'Slim/Slim.php';

$app = new Slim();

//Sets up the links to the functions
$app->get(
	'/',
	function() use($app) {
		$response = $app->response();
		$response->status(200);
		$response->write('The API is working');
	});
/**
* Links to get Orders
*/
$app->get('/PreviousOrders/:UserId', 'getPreviousOrders');
$app->get('/Orders/:OrderId', 'getOrder');
/**
* Links to get User
*/
$app->get('/Users/:Email', 'getUser');
/**
* Link to get Locations
*/
$app->get('/Locations/','getLocations');
/**
* Link to get Taco Toppings
*/
$app->get('/Menu/:ItemType', 'getMenuItem');
/**
* Link to get Payment
*/
$app->get('/Payment/:UserId', 'getPayment');

/**
* Checks whether the user is logged in
*/
$app->get('/LoginStatus', 'getLoginStatus');

/**
* User Registration
*/
$app->post('/Users', 'addUser');

/**
* User Login
*/
$app->post('/Login', 'login');

/**
* User Logout
*/
$app->post('/Logout', 'logout');

/*
* Link to add orders
*/
$app->post('/Orders', 'addOrder');

$app->run();

/**
* A function that gets the UserId based on the email
* @param String of the email of the User
* @return JSON of the UserId 
*/
function getUser($Email)
{
	$sql = "SELECT UserId FROM Users WHERE EmailAddresses=:Email";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("Email",$Email);
		$stmt->execute();
		$ID = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($ID);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}	
}
/**
* A function that gets the OrderId of the last order made by the User
* @param INT the UserId of the User
* @return JSON of the OrderId of the most recent Order
*/
function getPreviousOrders($UserId) {
	$sql = "SELECT OrderId FROM Orders WHERE UserId =:UserId AND DATE = ( 
		SELECT MAX(DATE) FROM Orders WHERE UserId =:UserId)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("UserId",$UserId);
		$stmt->execute();  
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"OrderId": ' . json_encode($orders) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

/**
* A function that gets the Order details 
* @param INT the OrderId of the most recent order
* @return JSON of the total price, quantity, OrderItemId, and toppings of the taco
*/
function getOrder($OrderId){
	$sql = "SELECT Orders.Total,OrderItem.Quantity,OrderItem.OrderItemId,Menu.ItemType, 			Menu.Name FROM Orders INNER JOIN (OrderItem INNER JOIN (OrderItemDetails 
			INNER JOIN Menu ON OrderItemDetails.TacoFixinId = Menu.TacoFixInId)
			ON OrderItem.OrderItemId = OrderItemDetails.OrderItemId) ON 
			Orders.OrderId = OrderItem.OrderId AND Orders.OrderId=:OrderId ";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("OrderId",$OrderId);
		$stmt->execute();  
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Order": ' . json_encode($orders) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	} 
}

/**
* A function that adds the order informations to the Order tables
*
*/
function addOrder()
{
	try {
	$request = Slim::getInstance()->request();
	$Order = json_decode($request->getBody(), true);
	$db = getConnection();
	date_default_timezone_set('America/Chicago');
	$date = date('Y-m-d h:i:s');
	$price = $Order['price'];
	$userId = 1;

	$sql = "INSERT INTO ORDERS (UserId, Date, Total) VALUES ('$userId', '$date', 		'$price')";
	$stmt = $db->query($sql);  
	$sql2 = "SELECT OrderId FROM Orders WHERE UserId = '$userId'AND Date = '$date' AND 			Total = '$price'";
	$stmt = $db->query($sql2);
	$OrderId = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
	foreach($Order['tacos'] as $type) {
		$TacoFixinIdArray = null;
		foreach($type['toppings'] as $topping) {
			$sql = "SELECT TacoFixinId FROM MENU WHERE Name = '$topping'";
			$stmt = $db->query($sql);
			$TacoFixinIdArray[] = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
		}
		$quantity = $type['quantity'];
		$sql = "INSERT INTO OrderItem (OrderId, Quantity) VALUES ('$OrderId', 			'$quantity')";
		$stmt = $db->query($sql);
		$sql2 = "SELECT OrderItemId FROM OrderItem WHERE OrderId = '$OrderId' AND 			Quantity = '$quantity'";
		$stmt = $db->query($sql2);
		$OrderItemId = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);	
		foreach($TacoFixinIdArray as $val){
			$sql = "INSERT INTO OrderItemDetails (OrderItemId, TacoFixinId) VALUES
				('$OrderItemId','$val')";
			$stmt = $db->query($sql);
		}	
	}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() . '}}';
	}

}

/**
* A function that gets the Payment details of the user 
* @param INT UserId of the User
* @return JSON of User's name, Credit Card Provider, and Credit Card Number
*/
function getPayment($UserId){
	$sql = "SELECT Users.GivenName, Users.SurName, Users.CC_Provider, Users.CC_Number
		FROM Users WHERE UserId =:UserId";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("UserId",$UserId);
		$stmt->execute();  
		$Payment = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Payment": ' . json_encode($Payment) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	} 
}

/**
* A function that returns the location of the Taco Truck
* @return Json of the Location's name, address, city, state, and zipcode
*/
function getLocations(){
	$sql = "SELECT Name,Address,City,State,Zipcode FROM Locations GROUP BY Name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$Locations = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Locations": ' . json_encode($Locations) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() . '}}';
	}
}

/**
* A function that gets the different Taco toppings
* @param String of the type of Item in the Taco, e.g. rice, sauce
* @return Json of the Name of the item and the price
*/
function getMenuItem($ItemType)
{
	if($ItemType != "Sauces"){	
		$sql = "SELECT Name, Price FROM Menu WHERE ItemType=:ItemType";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("ItemType",$ItemType);
			$stmt->execute();
			$Items = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			echo '{"' . $ItemType. '": ' . json_encode($Items) . '}';
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}
	else{
		$sql = "SELECT Name, Price, HeatRating FROM Menu WHERE ItemType=:ItemType";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("ItemType",$ItemType);
			$stmt->execute();
			$Items = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			echo '{"' . $ItemType. '": ' . json_encode($Items) . '}';
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

/**
* A function to check whether or not the user is logged in
*/
function getLoginStatus() {
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		return true;
	} else {
		return false;
	}
}

/**
* A funtion that takes the information inputed by a user and creates
* an account for them by inserting them into the database
*/

function addUser()
{
	$givenName = Slim::getInstance()->request()->post('firstname');
	$surname = Slim::getInstance()->request()->post('lastname');
	$emailAddress = Slim::getInstance()->request()->post('email');
	$password = password_hash(Slim::getInstance()->request()->post('password'), PASSWORD_DEFAULT);
	$cc_provider = Slim::getInstance()->request()->post('ccprovider');
	$cc_number = Slim::getInstance()->request()->post('ccnumber');
	
	$sql = "INSERT INTO Users (GivenName, Surname, EmailAddress, Password, CC_Provider, CC_Number) VALUES (:givenName, :surname, :emailAddress, :password, :cc_provider, :cc_number)";

	try
	{
		$db = getConnection();
				
		$stmt = $db->prepare($sql);
		$stmt->bindParam("givenName", $givenName);
		$stmt->bindParam("surname", $surname);
		$stmt->bindParam("emailAddress", $emailAddress);
		$stmt->bindParam("password", $password);
		$stmt->bindParam("cc_provider", $cc_provider);
		$stmt->bindParam("cc_number", $cc_number);

		$stmt->execute();
		$db = null;
	}
	catch(PDOException $e) 
	{
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

/**
* A function to check if the user entered the correct email and password.
* If so, a cookie is created containing their username
*/
function login() {
	$email = Slim::getInstance()->request()->post('email');
	$password = Slim::getInstance()->request()->post('password');

	$sql = "SELECT Password FROM Users WHERE EmailAddress=:email";

	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("email", $email);
		$stmt->execute();
		$hashedPassword = $stmt->fetchAll(PDO::FETCH_OBJ);
		
		if(password_verify($password, $hashedPassword) {
			$_SESSION['loggedin'] = true;
			$query = $db->prepare("SELECT UserId FROM Users WHERE EmailAddress=:email")->bindParam("email", $email);
			$query->execute();
			$_SESSION['userId'] = $query->fetchAll(PDO::FETCH_OBJ);
			$_SESSION['email'] = $email;
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

/**
* A function to log the user out
*/
function logout() {
	$_SESSION['loggedin'] = false;
	$_SESSION['userId' = NULL;
	$_SESSION['email'] = NULL:
}

/**
* A function that sets up the connection to the database
*/
function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="halomasterchief";
	$dbname="Taco_Truck";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>

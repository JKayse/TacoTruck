<?php

/**
* index.php.  This file contains all the backend functions that run the website
* Uses Slim framework.  
*/

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

//User Registration
$app->post('/AddUser', 'addUser');

//$app->post('/Orders', 'addOrders');
//$app->put('/wines/:id', 'updateWine');
//$app->delete('/wines/:id','deleteWine');

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
	$sql = "SELECT OrderId, MAX(DATE) FROM Orders WHERE UserId=:UserId";
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

//User Registration
function addUser()
{
	$firstname = $app->request()->post('givenName');
	$lastname = $app->request()->post('surname');
	$email = $app->request()->post('emailAddress');
	$password = password_hash($app->request()->post('password'));
	$cc_provider = $app->request()->post('cc_provider');
	$cc_number = $app->request()->post('cc_number');

	$db = getConnection();
	$sql = "INSERT INTO Users (GivenName, Surname, EmailAddress, Password, TelephoneNumber, CC_Provider, CC_Number);
			(:givenName, :surname, :emailAddress, :password, :cc_provider, :cc_number)";
	$stmt = $db->prepare($sql);
	$stmt->bindParam("GivenName", $givenName);
	$stmt->bindParam("Surname", $surname);
	$stmt->bindParam("EmailAddress", $emailAddress);
	$stmt->bindParam("Password", $password);
	$stmt->bindParam("CC_Provider", $cc_provider);
	$stmt->bindParam("CC_Number", $cc_number);

	$stmt->execute();
	$db = null;
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

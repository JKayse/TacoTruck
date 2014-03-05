<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get(
	'/',
	function() use($app) {
		$response = $app->response();
		$response->status(200);
		$response->write('The API is working');
	});

$app->get('/Orders', 'getPreviousOrders');
$app->get('/Locations/','getLocations');
//Getting the ingredients for tacos
$app->get('/Menu/:ItemType', 'getMenuItem');
$app->get('/Orders/Filling/', 'getFillings');
$app->get('/Orders/Tortillas/', 'getTortillas');
$app->get('/Orders/Rice/', 'getRice');
$app->get('/Orders/Cheese/', 'getCheese');
$app->get('/Orders/Beans/', 'getBeans');
$app->get('/Orders/Sauces/', 'getSauces');
$app->get('/Orders/Vegetables/', 'getVegetables');
$app->get('/Orders/Extras/', 'getExtras');
//$app->post('/Orders', 'addOrders');
//$app->put('/wines/:id', 'updateWine');
//$app->delete('/wines/:id','deleteWine');

$app->run();

function getPreviousOrders() {
	$sql = "SELECT ";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"orders": ' . json_encode($orders) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getLocations(){
	$sql = "SELECT Name,Address,City,State,Zipcode FROM Locations GROUP BY Name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{ Locations": ' . json_encode($orders) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() . '}}';
	}
}


/*
function getWine($id) {
	$sql = "SELECT * FROM wine WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
*//*
function addOrder() {
	error_log('addOrder\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}*/
/*
function updateWine($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteWine($id) {
	$sql = "DELETE FROM wine WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
*/

//Getting the different Taco ingredients
function getFillings() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'type'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Filling": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTortillas() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'tortillas'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Tortillas": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getRice() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'rice'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Rice": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCheese() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'cheese'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Cheese": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getBeans() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'beans'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Beans": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getSauces() {
	$sql = "SELECT Name, Price,HeatRating FROM Menu WHERE ItemType = 'sauces'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Sauces": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getVegetables() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'vegetables'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Vegetables": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getExtras() {
	$sql = "SELECT Name, Price FROM Menu WHERE ItemType = 'extras'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$Filling = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"Extras": ' . json_encode($Filling) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


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
		echo json_encode($Items);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

//Setting up connection to database
function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="Taco_Truck";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>

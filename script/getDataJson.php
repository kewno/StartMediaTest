<?php
	include_once '../model/Participant.php';
	include_once '../model/Attempts.php';

	if (isset($_GET)) {
		$dataCars = file_get_contents("../data/data_cars.json");
		$userJson = json_decode($dataCars, true);

		$dataAttempts = file_get_contents("../data/data_attempts.json");
		$attemptsJson = json_decode($dataAttempts, true);
		
		$users = [];

		foreach ($userJson as $key => $value) {
			$participant = new Participant($value['id'], $value['name'], $value['car'], $value['city']);
			array_push($users, $participant);
		}

		foreach ($attemptsJson as $key => $value) {
			$id = $value['id'] - 1;
			
			if ($users[$id]) {
				$attempt = new Attempts($value['id'], $value['result']);
				$users[$id]->addAttempts($attempt);
				$users[$id]->setSumAttempts($attempt->getResult());
			}
		}
	}

	echo json_encode($users);
	
?>
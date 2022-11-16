<?php  
	class Participant implements JsonSerializable {
		private $id;
		private $name;
		private $car;
		private $city;
		private $attempts = array(); 
		private $sumAttempts = 0;

		function __construct($id, $name, $car, $city) {
	    	$this->id = $id;
	    	$this->name = $name;
	    	$this->car = $car;
	    	$this->city = $city;
	  	}

	  	public function jsonSerialize() {
	        return [
		            'id' => $this->id,
			    	'name' => $this->name,
			    	'car' => $this->car,
			    	'city' => $this->city,
			    	'attempts' => $this->attempts,
			    	'sumAttempts' => $this->sumAttempts
        	];
    	}

		public function getId() {
			return $this->id;
		}
		public function setId($id) {
			return $this->id = $id;
		}

		public function getName() {
			return $this->name;
		}
		public function setName($name) {
			return $this->name = $name;
		}

		public function getCar() {
			return $this->car; 
		}
		public function setCar($car) {
			return $this->car = $car;
		}

		public function getCity() {
			return $this->city;
		}
		public function setCity($city) {
			return $this->city = $city;
		}


		public function addAttempts($attempt) {
			array_push($this->attempts, $attempt);
		}


		public function getSumAttempts() {
			return $this->sumAttempts;
		}
		public function setSumAttempts($result) {
			return $this->sumAttempts += $result;
		}
	}
?>
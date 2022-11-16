<?php  
	class Attempts implements JsonSerializable {
		private $id;
		private $result;

		function __construct($id, $result) {
	    	$this->id = $id;
	    	$this->result = $result;
	  	}

	  	public function jsonSerialize() {
	        return [
	            'id' => $this->id,
		    	'result' => $this->result
        	];
    	}

		public function getId() {
			return $this->id;
		}
		public function setId($id) {
			return $this->id = $id;
		}

		public function getResult() {
			return $this->result;
		}
		public function setResult($result) {
			return $this->result = $result;
		}
	}
?>
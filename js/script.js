addEventListener('DOMContentLoaded', () => {
	
	let dataSort; // data use in table & for filter

	let select = document.querySelector('.filter__select');
	let table = document.querySelector('.table');

	select.addEventListener("change", function() {

		switch (this.value) {
			case 'all-run':
		    	refreshTable(table);
		    	break;
		    case 'first-run':
		    	refreshTable(table, 0);
		    	break;
		    case 'second-run':
		    	refreshTable(table, 1);
		    	break;
	    	case 'third-run':
		    	refreshTable(table, 2);
		    	break;
	    	case 'fourth-run':
		    	refreshTable(table, 3);
		    	break;
		}
	})

	let sortDataUser = (data, attemptNumber = null) => {
		if (attemptNumber != null) return data.sort((a, b) => b.attempts[attemptNumber].result - a.attempts[attemptNumber].result);
		else return data.sort((a, b) => b.sumAttempts - a.sumAttempts);
	}

	let setPlaceDataUser = (data) => {
		for (let i = 0; i < data.length; i++) {
			data[i].winningPlace = i + 1;
		}
	}

	let refreshTable = (table, typeSort) => {
		table.replaceChildren();
		dataSort = sortDataUser(dataSort, typeSort);
		setElementTable(table, dataSort);
	}

	getUserData('script/getDataJson.php')
	  .then(data => {
	  	dataSort = sortDataUser(data);
	  	setPlaceDataUser(data);
	  	refreshTable(table);

	  });


	let clearTable = (table) => {
		table.replaceChildren();
	}

	let getNumberAttemt = (id) => {
		switch (id) {
			case 1:
		    	return 'Первый заезд';
		    	break;
		    case 2:
		    	return 'Второй заезд';
		    	break;
		    case 3:
		    	return 'Третий заезд';
		    	break;
	    	case 4:
		    	return 'Четвертый заезд';
		    	break;
		}
	}

	function createP(text) {
		let p = document.createElement('p');
		p.classList.add('table__text');
		p.innerHTML = `${text}`;

		return p;
	}

	function createTR() {
		let tr = document.createElement('tr');
		tr.classList.add('table__row');

		return tr;
	}

	function createTD() {
		let td = document.createElement('td');
		td.classList.add('table__column');

		return td;
	}


	let setElementTable = (table, data) => { 
		for (let i = 0; i < Object.keys(data).length; i++) {
			let user = data[i];

			let tr = createTR();
			
			let tdResult = createTD();
			let finalPlace = createP(`Итоговое место: ${user.winningPlace}`);
			let finalResult = createP(`Итоговый результат: ${user.sumAttempts}`);
			
			tdResult.append(finalPlace);
			tdResult.append(finalResult);
			tr.append(tdResult);


			let tdUser = createTD();
			let fio = createP(`ФИО: ${user.name}`);
			let city = createP(`Город: ${user.city}`);
			let car = createP(`Машина: ${user.car}`);

			tdUser.append(fio);
			tdUser.append(city);
			tdUser.append(car);
			tr.append(tdUser);

			let numberAttempt = 1;
			for (let i = 0; i < Object.keys(user.attempts).length; i++) {
				let userAttempt = user.attempts[i];
				
				let attempt = createTD();
				let attemptResult = createP(`${getNumberAttemt(numberAttempt)}: ${userAttempt.result}`);
				attempt.append(attemptResult);
				
				tr.append(attempt);
				
				numberAttempt++;
			}


			table.append(tr);
		}
	}
});

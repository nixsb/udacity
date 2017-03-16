
(function() {

	var elem = document.getElementById('cats');
	 	
	 	var catsRow = document.querySelectorAll('.testing');
		var header = document.querySelectorAll('.title');
		var counter1 = 0;
		var counter2 = 0;


	elem.addEventListener('click', function(e) {
		
		if (e.target && e.target.tagName === 'IMG') {
			e.preventDefault();
			if(e.target.id === "img-1") {
				counter1 += 1;
				catsRow[0].innerHTML = 'Cat has been clicked on ' + counter1 + ' times.';
				header[0].innerHTML = 'cat 1';
			} else {
				counter2 += 1;
				catsRow[1].innerHTML = 'Cat has been clicked on ' + counter2 + ' times.';
				header[1].innerHTML = 'cat 2';
			}
		}
	}, false);

})();
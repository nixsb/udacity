
(function() {
	'use strict';

	var catsWrapper = document.getElementById('cat-wrapper'),
		catList = document.getElementById('list-wrapper'),
		catDetails = document.getElementById('cat-details'),
		ul = document.createElement('ul'),
		title = document.createElement('p'),
		counterCopy = document.createElement('p'),
		img = document.createElement('img'),
		counter = 0,
		counter2 = 0,
		dir = 'images/';


	catList.appendChild(ul);
	var catArr = ['c-cat', 'a-cat', 'b-cat'];
	catArr.sort();

	//iterate over the cat names to create a list
	for (var i = 0; i < catArr.length; i++) {
		var li = document.createElement('li');  
	    li.innerHTML = catArr[i];
	    ul.appendChild(li);
	    //add a counter so can assign a data attribute to link to relevant image
	    counter += 1;
	    li.setAttribute('data-value', counter);
	}

	//add a click event to each li with event delgation
	catsWrapper.addEventListener('click', function(e) {

		if(e.target && e.target.tagName === 'LI') {
			var item = e.target,
				dataValue = item.dataset.value;

			title.innerHTML = item.innerHTML;
			catDetails.appendChild(title);
			img.src = dir + 'image_' + dataValue + '.jpg';
			catDetails.appendChild(img);
			counter2 = 0;
			catDetails.appendChild(counterCopy);
			counterCopy.innerHTML = 'Cat has been clicked on ' + counter2 + ' times.';
		}

		if (e.target && e.target.tagName === 'IMG') {
			e.preventDefault();
			var image = e.target;

			if (image) {
				counter2 += 1;
				counterCopy.innerHTML = 'Cat has been clicked on ' + counter2 + ' times.';
			}

		}
	}, false);
 	

})();
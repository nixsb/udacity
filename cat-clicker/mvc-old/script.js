
(function() {
	'use strict';

	/* ======= Model ======= */
	var model = {
		currentCat: null,
		currentDataValue: 1,
		counter: 0,
		storedCounter: 0,
		selectedItem:'',
		//catArr: ['c-cat', 'a-cat', 'b-cat'],
		catArr: [
			{
				name: 'a-cat',
				count: 0
			},
			{
				name: 'b-cat',
				count: 0
			},
			{
				name: 'c-cat',
				count: 0
			}
		],
		dir: 'images/'
	};

	/* ======= controller ======= */
	var controller = {

		init: function() {
			// sort cat order alphabetically
			model.catArr.sort();

			// set our current cat to the first one in the list
        model.currentCat = model.catArr[0];

			//views to initialize
            catsListView.init();
            catView.init();
        },

		selectedItem: function(elem) {
			model.selectedItem = elem;
		},

		countItem: function(counter) {
			model.counter = counter;
			//model.currentCat.clickCount++;
		},

		    getCurrentCat: function() {
        return model.currentCat;
    },

        // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

		countItema: function() {
			model.currentCat.count++;
			catView.render();
			//model.currentCat.clickCount++;
		},

		listDataValue: function(dataValue) {
			model.currentDataValue = dataValue;
		},

		catName: function() {
			return model.catArr;
		}


	};

	/* ======= View ======= */
	var catView = {
		init: function() {
			this.catDetails = document.getElementById('cat-details');
			this.img = document.getElementById('cat-img');
			this.title = document.getElementById('title');
			this.counterCopy = document.getElementById('cat-count');

			// on click, increment the current cat's counter
	        this.img.addEventListener('click', function(){
	            controller.countItema();
	            console.log('counter ' + model.counter);
	        });

	        this.render();


		},

		render: function() {
			var currentCat = controller.getCurrentCat();
			//var img = document.createElement('img');

			//counter to increment the value of image clicked on
			var counter = 0;

			//add the image into the image tag
			this.img.src = model.dir + 'image_' + model.currentDataValue + '.jpg';

			//add the list item copy to the header copy
			this.title.innerHTML = model.selectedItem;

			//add the counter copy to the body
			this.counterCopy.innerHTML = 'Cat has been clicked on ' + currentCat.count + ' times.';

			//click event on the image to update the counter
// 	        this.catDetails.addEventListener('click', function(e){

// 				if (e.target && e.target.tagName === 'IMG') {
					
// 					e.preventDefault();
// 					var image = e.target;

// 					if (image) {
// 						var a = counter += 1;
// 						var b = a;
// 						console.log(a);
// 						console.log('saved ' + b);
// 						//controller.countItem(a);
// 						//controller.countItem(a);
						
// 					}
// //this.counterCopy.innerHTML = 'Cat has been clicked on ' + model.counter + ' times.';
// 				}

// 	        });
		}
	};

	var catsListView = {
		init: function() {
			this.catList = document.getElementById('list-wrapper');
			this.render();
		},

		render: function() {
			var li, cat;

			var ul = document.createElement('ul'),
				counter = 0;


        	// get the cat names from the array
        	var cats = controller.catName();

			//iterate over the cat names to create a list
			for (var i = 0; i < cats.length; i++) {
			
				// this is the cat we're currently looping over
	            cat = cats[i];

				// make a new cat list item and set its text
				li = document.createElement('li');  
			    li.innerHTML = cat.name;
			    ul.appendChild(li);

			    //add a counter so can assign a data attribute to able to link to relevant image with data value number
			    counter += 1;
			    li.setAttribute('data-value', counter);
			}

			//add the ul to the list wrapper
        	this.catList.appendChild(ul);

        	//click event for the cat name list
			this.catList.addEventListener('click', function(e) {
				if(e.target && e.target.tagName === 'LI') {
					var item = e.target,
						dataValue = item.dataset.value,
						newTitle = item.innerHTML;
					//update the current data value in the model
					controller.listDataValue(dataValue);
					//update the content of the cat title in the model
					controller.selectedItem(newTitle);
					//invoke the catview
					catView.render();
				}
			}, false);


		}

	};

	controller.init();

	// var catsWrapper = document.getElementById('cat-wrapper'),
	// 	catList = document.getElementById('list-wrapper'),
	// 	catDetails = document.getElementById('cat-details'),
	// 	ul = document.createElement('ul'),
	// 	title = document.createElement('p'),
	// 	counterCopy = document.createElement('p'),
	// 	img = document.createElement('img'),
	// 	counter = 0,
	// 	counter2 = 0,
	// 	dir = 'images/';


	// catList.appendChild(ul);
	// var catArr = ['c-cat', 'a-cat', 'b-cat'];
	// catArr.sort();

	// //iterate over the cat names to create a list
	// for (var i = 0; i < catArr.length; i++) {
	// 	var li = document.createElement('li');  
	//     li.innerHTML = catArr[i];
	//     ul.appendChild(li);
	//     //add a counter so can assign a data attribute to link to relevant image
	//     counter += 1;
	//     li.setAttribute('data-value', counter);
	// }

	// //add a click event to each li with event delgation
	// catsWrapper.addEventListener('click', function(e) {

	// 	if(e.target && e.target.tagName === 'LI') {
	// 		var item = e.target,
	// 			dataValue = item.dataset.value;

	// 		title.innerHTML = item.innerHTML;
	// 		catDetails.appendChild(title);
	// 		img.src = dir + 'image_' + dataValue + '.jpg';
	// 		catDetails.appendChild(img);
	// 		counter2 = 0;
	// 		catDetails.appendChild(counterCopy);
	// 		counterCopy.innerHTML = 'Cat has been clicked on ' + counter2 + ' times.';
	// 	}

	// 	if (e.target && e.target.tagName === 'IMG') {
	// 		e.preventDefault();
	// 		var image = e.target;

	// 		if (image) {
	// 			counter2 += 1;
	// 			counterCopy.innerHTML = 'Cat has been clicked on ' + counter2 + ' times.';
	// 		}

	// 	}
	// }, false);
 	

})();
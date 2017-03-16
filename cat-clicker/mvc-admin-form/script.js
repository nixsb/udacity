
(function() {
	'use strict';

	/* ======= Model ======= */
	var model = {
		currentDataValue: 1,
		selectedItem:'',
		currentCat: null,
		catArr: [
			{
				name: 'a-cat',
				count: 0
			},
			{
				name: 'c-cat',
				count: 0
			},
			{
				name: 'b-cat',
				count: 0
			}
		],
		dir: 'images/',
		admin: false
	};

	/* ======= controller ======= */
	var controller = {
		init: function() {
			// tell our views to initialize
            catsListView.init();
            catView.init();
            once.init();
        },

		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.catArr;
		},

        // set the currently-selected cat to the object passed in
	    setCurrentCat: function(cat) {
	        model.currentCat = cat;
	    },

	    // increments the counter for the currently-selected cat
	    incrementCounter: function() {
	        model.currentCat.count++;
	        catView.render();
	    },

	    //cat title
		selectedItem: function(elem) {
			model.selectedItem = elem;
		},

		//data value added to li to target image name with same data value
		listDataValue: function(dataValue) {
			model.currentDataValue = dataValue;
		},

		//show hide admin section
		adminValue: function(display) {
			model.admin = display;
		},

		adminOpen: function() {

		},

		adminClose: function() {

		},

		addCat: function(adminCat, adminClicks) {
			model.catArr.push({name:adminCat,count:0});
			catsListView.render();
		},

		updateCat: function(adminCat) {
			model.currentCat.name = adminCat;
			catsListView.render();
		}

	};

	/* ======= View ======= */
	var catView = {
		init: function() {
			// store pointers to our DOM elements for easy access later
			this.catDetails = document.getElementById('cat-details');
			this.img = document.getElementById('cat-img');
			this.title = document.getElementById('title');
			this.counterCopy = document.getElementById('cat-count');

			// on click, increment the current cat's counter
			this.img.addEventListener('click', function(){
				controller.incrementCounter();
			});
		},

		render: function() {
			// update the DOM elements with values from the current cat
			var currentCat = controller.getCurrentCat();

			//add the image into the copy
			this.img.src = model.dir + 'image_' + model.currentDataValue + '.jpg';
			this.img.setAttribute('data-value', model.currentDataValue);

			//add the list item copy to the header copy
			this.title.innerHTML = model.selectedItem;
			
			//add the counter copy from current cat
			this.counterCopy.innerHTML = 'Cat has been clicked on ' + currentCat.count + ' times.';
		}
	};

	var catsListView = {
		init: function() {
			// store the DOM element for easy access later
			this.catList = document.getElementById('list-wrapper');

			// render this view (update the DOM elements with the right values)
			this.render();
		},

		render: function() {
			var ul = document.createElement('ul'),
				counter = 0,
				li, cat;

        	// get the cats we'll be rendering from the controller
        	var cats = controller.getCats();				

			// loop over the cats
			for (var i = 0; i < cats.length; i++) {
				// this is the cat we're currently looping over
	            cat = cats[i];

				// make a new cat list item and set its text
				li = document.createElement('li');  
			    li.innerHTML = cat.name;
			    ul.appendChild(li);

			    //add a counter so can assign a data attribute to link to relevant image
			    counter += 1;
			    li.setAttribute('data-value', counter);

			    // on click, setCurrentCat 
	            // (this uses our closure-in-a-loop trick to connect the value
	            //  of the cat variable to the click event function)

	            li.addEventListener('click', (function(catCopy) {
	                return function() {
	                    controller.setCurrentCat(catCopy);

	                };
	            })(cat));
			}

			this.catList.addEventListener('click', function(e) {
				if(e.target && e.target.tagName === 'LI') {
					var title = document.getElementById('title'),
						item = e.target,
						dataValue = item.dataset.value,
						titleCopy = item.innerHTML;

					//add the data value to reference the correct image
					controller.listDataValue(dataValue);
					//add the title of li into the main body
					controller.selectedItem(titleCopy);

					catView.render(); 

				}
			}, false);

			// finally, add the element to the list wrapper
			this.catList.appendChild(ul);

		}

	};

	var once = {
		init: function() {
			// store pointers to our DOM elements for easy access later
			this.adminSection = document.querySelector('.admin-section');
			
			
			
			this.render();
		},

		render: function() {
			var currentCat = controller.getCurrentCat();
			var inputs = document.getElementsByTagName('input');
			// var nameValue = document.getElementById('name');
			var currentUl = document.getElementsByTagName('ul')[0];
			var catList = document.getElementById('list-wrapper');

			this.adminSection.addEventListener('click', function(e){
				e.preventDefault();
				console.dir(e.target);
				
				if(e.target && e.target.nodeName === 'BUTTON') {
					
					//toggle form element with false and true
					if (model.admin === false) {
						this.classList.add('show');
						controller.adminValue(true);
						
						
					} else if (model.admin === true) {
						
						this.classList.remove('show');
						controller.adminValue(false);
					}
				}

				if(e.target && e.target.nodeName === 'INPUT'){
					var buttons = e.target,
						adminCat = inputs.item('name').value,
						adminImage = inputs.item('image').value,
						adminClicks = inputs.item('clicks').value;

					switch(buttons.name) {
						case 'add':
							//add value into array
							controller.addCat(adminCat, adminImage, adminClicks);
							//remove the current li to replace with new list
							catList.removeChild(currentUl);
							break;
						case 'save':
							//update current view with new cat
							controller.updateCat(adminCat);
							//remove the current li to replace with new list
							catList.removeChild(currentUl);
							break;
						case 'cancel':
							console.log('input cancel');
							break;
						default:
							break;
					}
					

				}
			}, false);
		}
	};

	controller.init();

})();
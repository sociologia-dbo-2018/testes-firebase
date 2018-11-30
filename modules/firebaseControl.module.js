import {db} from './fb.js';

export const firebaseControl = {
    sendForm: function(object) {
    	const database = db.ref(`/dados/num/obj`);
    	// const objectSecondary = object.secondary;
    	database.once('value').then(function(snapshot) {
  			// console.log(regex);
  			// console.log(snapshot.val()	);
  			const num = snapshot.val();
  			function writeUserData(num) {
  				database.set(num);
			}
			writeUserData(num+1);
		});
    	// const value = database.val() ++; 
    	// database.set(value);
    },
    sendMap: function(object) {

    }	
}

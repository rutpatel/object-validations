
var invalidObjects = {
  	"invalid_objects": []
}

//performs a validation check on each object
function validate(validations, arrayOfObj, callback){
	
	var validationsLen = validations.length;
	var validationObj = {};
	var arrLen = arrayOfObj.length;

	for(var k = 0; k < arrLen; k++){
		var currObject = arrayOfObj[k];
		var lenCheck = "length";
		var invalidObject = {"array_index": k, "invalid_fields": [] };

		for(var j = 0; j < validationsLen; j++){
	
			var keyName = Object.keys(validations[j])[0];
			var toCheck = validations[j][keyName];
	
			var validOrNot = new Promise((resolve, reject) =>{
				
				if(toCheck.required){

					if(!currObject[keyName] === undefined || currObject[keyName] === null){ // required but the value in object is NULL
						invalidObject.invalid_fields.push(keyName);
						return;
					}
				
				}

				if(toCheck.type){
				
					if(typeof(currObject[keyName]) !== toCheck.type){
						invalidObject.invalid_fields.push(keyName);
						return;
					}
				
				}
				
				if(toCheck.length_min){
				
					if(currObject[keyName] && currObject[keyName].length < toCheck.length_min){
						invalidObject.invalid_fields.push(keyName);
						return;
					}
				
				}
				
				if(toCheck.length_max){
				
					if(currObject[keyName] && currObject[keyName].length > toCheck.length_max){
						invalidObject.invalid_fields.push(keyName);
						return;
					}
				
				}
				
				resolve(true);
			
			});
		}
		
		if(invalidObject.invalid_fields.length > 0){ 
			//object in not valid
			invalidObjects.invalid_objects.push(invalidObject);
		}

	}

	callback(invalidObjects);

}

function returnObj(invalidObj){
	//console.log(JSON.stringify(obj));
	if(invalidObj.invalid_objects && invalidObj.invalid_objects.length > 0){
		return {"error": true, "invalid_object": invalidObj }
	}
	else{
		return {"error": false}
	}
}

module.exports = {
	function findInvalidObjects(validations, array){
		validate(validations, array, returnObj);
	}
};

//findInvalidObjects(validationsSchema, arrayObject);

import { NewUser } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";

const handleInputChange = (propertyName: string, propertyValue: string, object: NewUser, setObject: Dispatch<SetStateAction<NewUser>>) => {

  if(propertyName === 'areasOfInterest'){
    const areasOfInterestArray = object.areasOfInterest.split(',');
    const indexOfValue = areasOfInterestArray.indexOf(propertyValue);

    if( indexOfValue === -1){
      areasOfInterestArray.push(propertyValue);
    } else{
      areasOfInterestArray.splice(indexOfValue, 1);
    }
    propertyValue = areasOfInterestArray.length === 0 ? 'No interests' : areasOfInterestArray.join();  }

  setObject({
    ...object,
    [propertyName]: propertyValue
  });
}

export { handleInputChange };
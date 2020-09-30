import { helper } from "@ember/component/helper"

const InsertBorder = value => {
    let returnString
    if(value > 0)
        returnString = 'border: 2px solid green ' 
        
    else if(value < 0)
        returnString = 'border: 2px solid red ' 
    
    else 
        returnString = ''
    
    return returnString
        
}
export default helper(InsertBorder)
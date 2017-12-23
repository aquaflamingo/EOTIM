const initialState = {
    cdetails: null
  }
  
  const debugReducer = (state = initialState, action) => {
    console.log("debugReducer: ",action.type, action.payload)
    if (action.type === 'CONTRACT_UPDATE')
    {
      
      return Object.assign({}, state, {
        cdetails: action.payload
      })
    } 
    else if (action.type === 'CONTRACT_CREATE') 
    {
      
      return Object.assign({}, state, {
        contract: action.payload
      })
    }
  
    return state
  }
  
  export default debugReducer
  
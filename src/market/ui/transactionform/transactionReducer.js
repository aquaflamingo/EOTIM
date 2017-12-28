const initialState = {
    status: null
  }
  
  const transactionReducer = (state = initialState, action) => {
    console.log("transactionReducer: ",action.type, action.payload)
 
    if (action.type === 'CONTRACT_CREATE') 
    {
      
      return Object.assign({}, state, {
        status: action.payload
      })
    }
  
    return state
  }
  
  export default transactionReducer
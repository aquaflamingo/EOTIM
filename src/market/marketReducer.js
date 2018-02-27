const initialState = {
    data: null,
    offers: null,
    status: null,
  }
  
  /**
   * Handles redux state objects related to marketplace actions
   */
  const marketReducer = (state = initialState, action) => {
      console.log("Market Reducers, ", state)
    switch (action.type) {
        case 'REFRESH_OFFERS':
            return Object.assign({}, state, {
                offers: action.payload
            })
        case 'INSURE_TRANSACTION':
            return Object.assign({},state,{
                data: action.payload
            })
        case 'CONTRACT_CREATE':
        console.log("CONTRACT_CREATE state ",action.payload)
            return Object.assign({}, state, {
                status: action.payload
              })
        default:
            return state
    }
  
  }
  
  export default marketReducer
  
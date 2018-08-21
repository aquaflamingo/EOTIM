const initialState = {
    purchaseStatus: null,
    offers: null,
    createContract: null,
    searchContract: null
  }
  
  /**
   * Handles redux state objects related to marketplace actions
   */
  const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_OFFERS':
            return Object.assign({}, state, {
                offers: action.payload
            })
        case 'INSURE_TRANSACTION':
            return Object.assign({},state,{
                purchaseStatus: action.payload
            })
        case 'CONTRACT_CREATE':
            console.log("INSIDE MARKET REDUCER. action: ",action.payload)
            return Object.assign({}, state, {
                createContract: action.payload
              })
        case 'CONTRACT_FOUND':
            return Object.assign({}, state, {
                searchContract: action.payload
              })
        case 'CONTRACT_NOT_FOUND':
            return Object.assign({}, state, {
                searchContract: action.payload
            })
        default:
            return state
    }
  
  }
  
  export default marketReducer
  
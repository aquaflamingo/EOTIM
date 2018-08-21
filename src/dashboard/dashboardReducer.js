const initialState = {
    offers:null,
    settlement: null
  }
  
  /**
   * Handles redux state objects related to marketplace actions
   */
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'GET_OWNED_OFFERS':
            return Object.assign({}, state, {
                offers: action.payload
            })
        case 'OFFER_SETTLED':
            return Object.assign({}, state, {
                settlement: action.payload
            })
        default:
            return state
    }
  
  }
  
  export default dashboardReducer
  
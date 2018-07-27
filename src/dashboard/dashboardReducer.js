const initialState = {
    ownedOffers:null
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
        default:
            return state
    }
  
  }
  
  export default dashboardReducer
  
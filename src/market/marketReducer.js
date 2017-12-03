const initialState = {
    data: null
  }
  
  const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ESCROWS':
            return Object.assign({}, state, {
                escrows: action.payload
            })
        case 'INSURE_ESCROW':
            return Object.assign({}, state, {
                data: action.payload
            })
        default:
            return state
    }
  
  }
  
  export default marketReducer
  
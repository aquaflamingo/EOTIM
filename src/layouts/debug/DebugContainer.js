import { connect } from 'react-redux'
import Debug from './Debug'
import { fetchDetails, fundTransaction, createTransaction} from './DebugActions'

const mapStateToProps = (state, ownProps) => {
  console.log("Mapping state to props " , state)
    return {
        contract: state.debug.cdetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: (event) => {
        // event.preventDefault();
  
        dispatch(fetchDetails())
      },
      onCreate: (params) => {
        dispatch(createTransaction(params))
      },
      
      onFund: (event) => {
        dispatch(fundTransaction())
      }
    }
  }
  
  const DebugContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Debug)
  
  export default DebugContainer
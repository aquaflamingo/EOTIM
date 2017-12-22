import { connect } from 'react-redux'
import Debug from './Debug'
import { fetchDetails } from './DebugActions'

const mapStateToProps = (state, ownProps) => {
    return {
        contract:state.debug.cdetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: (event) => {
        // event.preventDefault();
  
        dispatch(fetchDetails())
      }
    }
  }
  
  const DebugContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Debug)
  
  export default DebugContainer
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../offersgrid/GridContainer'

import {purchaseOffer} from '../offeritem/OfferActions'


// TODO make Marketplace container (that polls the blockchain for escrow accounts) 
// that takes the mapDispatch to props and connects to GridContainer
// Passing it the relevent details
// Grid container than passes on clicks but dispatches happen at the marketplace container level



// const mapDispatchToProps = (dispatch) => {
//     return {
//       onPurchaseClick: (event) => {
//         event.preventDefault();
//         dispatch(purchaseOffer)
//       }
//     }
//   }
  
//   const  OfferContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(OfferItem)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
import React from 'react'

import TransactionItemContainer from './market/ui/transactionitem/TransactionItemContainer'

/**
 * Grid container creates the list of offers - eventually to become a grid based 
 * component but for now lists in one row.
 */

const FeedContainer = ({ offers }) => (
  <section className="is-medium">
    <br/>
    {
          offers.map(offer => {
           return (
              <div className="no-params">
                  <TransactionItemContainer 
                    {...offer} />
              </div>
              )
          })
    }
            
    </section>
  )



export default FeedContainer;

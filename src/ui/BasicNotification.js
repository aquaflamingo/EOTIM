import React from 'react';

const BasicNotification = ({title,description,color}) => {
    return (
        <div className={`notification is-light ${color}`}>
            <p className="subtitle">{title}</p>
            <p> {description}</p>
      </div>
    )
}

export default BasicNotification;
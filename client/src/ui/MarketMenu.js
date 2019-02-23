import React from 'react'
import { Link } from 'react-router-dom'

const MarketMenu = ({title,links}) => (
        <aside className="menu">
            <p className="menu-label">
            {title}
            </p>
            <ul className="menu-list">
            {
                 links.map(link=> (       
                    <li key={link.key}>
                        <Link to={link.to}>{link.name}</Link>
                    </li>
                ))
            }
            </ul>
        </aside>
)


export default MarketMenu;
import React from 'react'

const Filter = ({handleFilterChange, newFilter}) => (
    <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
    </div>
)

export default Filter
import React from "react" 
import PropTypes from "prop-types"
import style from "./Search.css"

const Search = ({ query, updateQuery }) => {
  return (
    <div className="search">
      <div className="container">
        <span className="icon">🔍</span>
        <input 
          value={query}
          onChange={e => updateQuery(e.target.value)} />
      </div>
    </div>
  )
}

Search.propTypes = {
  query: PropTypes.string,
  updateQuery: PropTypes.function
}

export default Search
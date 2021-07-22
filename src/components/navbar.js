import React from "react"

const NavBar = ({ setPage }) => {
  return (
    <nav>
      <button type="button" onClick={() => setPage("planets")}>
        Planets
      </button>
      <button type="button" onClick={() => setPage("people")}>
        People
      </button>
    </nav>
  )
}

export default NavBar

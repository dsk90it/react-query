import { useState } from "react"
import NavBar from "./components/navbar"
import People from "./components/people"
import Planets from "./components/planets"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

// Create a client
const queryClient = new QueryClient()

function App() {
  const [page, setPage] = useState("planets")

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars Info</h1>

        <NavBar setPage={setPage} />

        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

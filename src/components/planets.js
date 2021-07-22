import { useState } from "react"
import { useQuery } from "react-query"
import PlanetCard from "./planet-card"

// Fetch data
const fetchPlanets = async (pageNo) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${pageNo}`)
  return res.json()
}

// Render data in ui
const Planets = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    }
  )

  return (
    <div>
      <h2>Planets</h2>

      {isLoading && <p>Loading data...</p>}

      {isError && <p>Erorr fetching data...</p>}

      {isSuccess && (
        <>
          <button
            type="button"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <span>{page}</span>

          <button
            type="button"
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1)
              }
            }}
            disabled={isPreviousData || !data.next}
          >
            Next Page
          </button>

          <div>
            {data.results.map((planet) => (
              <PlanetCard key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Planets

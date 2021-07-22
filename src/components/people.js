import { useState } from "react"
import { useQuery } from "react-query"
import PersonCard from "./person-card"

// Fetch data
const fetchPeople = async (pageNo) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${pageNo}`)
  return res.json()
}

// Render data in ui
const People = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    {
      keepPreviousData: true,
    }
  )

  return (
    <div>
      <h2>People</h2>

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
            {data.results.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default People

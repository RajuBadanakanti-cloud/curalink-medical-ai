import axios from "axios"


export const fetchOpenAlex = async (query) => {

  const encodedQuery = encodeURIComponent(query)

  const url =
  `https://api.openalex.org/works?search=${encodedQuery}&per-page=25`

  const response = await axios.get(url)

  return response.data.results
}
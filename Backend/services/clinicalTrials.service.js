import axios from "axios"

export const fetchClinicalTrials = async (disease) => {

  const url =
  `https://clinicaltrials.gov/api/v2/studies?query.cond=${disease}&pageSize=20`

  const response = await axios.get(url)

  return response.data.studies
}
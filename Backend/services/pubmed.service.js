import axios from "axios"

export const fetchPubMed = async (query) => {

  const url =
  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${query}&retmax=50&retmode=json`

  const response = await axios.get(url)

  return response.data.esearchresult.idlist
}
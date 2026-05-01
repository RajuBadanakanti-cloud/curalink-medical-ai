// >>>>>>>>>>>>>>>>>>>>

export const normalizeOpenAlex = (papers) => {

  return papers.map(paper => ({
    title: paper.title,
    year: paper.publication_year,
    source: paper.primary_location?.source?.display_name || "Unknown",
    doi: paper.doi,
    citations: paper.cited_by_count
  }))

}

// >>>>>>>>>>>>>>>>>>
export const normalizePubMed = (ids) => {

  return ids.map(id => ({
    pubmedId: id,
    url: `https://pubmed.ncbi.nlm.nih.gov/${id}`
  }))

}

// >>>>>>>>>>>>>>>>>>>>>>

export const normalizeTrials = (trials) => {

    return trials.map(trial => ({

        id: trial.protocolSection?.identificationModule?.nctId,

        title: trial.protocolSection?.identificationModule?.briefTitle,

        status: trial.protocolSection?.statusModule?.overallStatus,

        condition: trial.protocolSection?.conditionsModule?.conditions,

        summary: trial.protocolSection?.descriptionModule?.briefSummary,

        location:
        trial.protocolSection?.contactsLocationsModule?.locations?.[0]?.country

    }))

}
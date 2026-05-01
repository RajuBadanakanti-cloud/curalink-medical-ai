// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const rankPapers = (papers) => {

 return papers
   .sort((a,b)=> b.citations - a.citations)
   .slice(0,5)

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const rankTrials = (trials) => {

  return trials
    .filter(t => t.status === "RECRUITING" || t.status === "COMPLETED")
    .slice(0,3)

}
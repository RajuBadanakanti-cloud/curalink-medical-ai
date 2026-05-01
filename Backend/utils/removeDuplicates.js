export const removeDuplicatePapers = (papers) => {

    const seen = new Set()

        return papers.filter(paper => {

            if(seen.has(paper.title)) return false

            seen.add(paper.title)

            return true
    })

}
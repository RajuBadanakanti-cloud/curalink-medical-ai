import { correctMedicalTerm } from "../services/queryCorrection.service.js"
import { expandQuery} from "../utils/expansionQuery.js"
import {removeDuplicatePapers } from "../utils/removeDuplicates.js"

import { fetchPubMed } from "../services/pubmed.service.js"
import { fetchOpenAlex } from "../services/openalex.service.js"
import { fetchClinicalTrials } from "../services/clinicalTrials.service.js"
import { rankPapers, rankTrials } from "../services/ranking.service.js"

import { normalizeOpenAlex, normalizePubMed, normalizeTrials } from "../utils/normalizeResearch.js"

// llms
import { generateAnswer } from "../services/llm.service.js"
import { buildPrompt } from "../utils/buildPrompt.js"

import Chat from "../model/Chat.js" // model/schema

// >>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const handleQuery = async (req, res, next) => {

  try {

    const { disease, query } = req.body

    if (!disease || !query) {
      return res.status(400).json({
        success:false,
        message:"Disease and query are required"
      })
    }

    // if spelling correction
    const correctedDisease = await correctMedicalTerm(disease)
    const correctedQuery = await correctMedicalTerm(query)

    //  Expand Query
    const expandedQuery = expandQuery(correctedDisease, correctedQuery)

    //  Fetch Research Data
    const pubmedResults = await fetchPubMed(expandedQuery) // pumbed
    const openalexResults = await fetchOpenAlex(expandedQuery)
    const trialsResults = await fetchClinicalTrials(correctedDisease)


    const cleanOpenAlex = normalizeOpenAlex(openalexResults)
    const cleanPubMed = normalizePubMed(pubmedResults)
    const trials = normalizeTrials(trialsResults)

   // remove duplicates 
    const uniquePapers = removeDuplicatePapers(cleanOpenAlex)

    // top 5 results
    const topPapers = rankPapers(uniquePapers) // paper
    const topTrials = rankTrials(trials) // trial



    if(topPapers.length === 0 && topTrials.length === 0){

        return res.status(200).json({
          success: false,
          message: "No scientific research found for this query. Please check the disease name or try another medical term."
        })
    }

    // connect Ai
   const prompt = buildPrompt(correctedQuery, topPapers, topTrials)
    const aiResponse = await generateAnswer(prompt)



    // save Chat history
      await Chat.create({
        disease: correctedDisease,
        query: correctedQuery,
        expandedQuery,
        aiResponse,
        publications: topPapers,
        clinicalTrials: topTrials
      })

    // final response 
    return res.status(200).json({
      success:true,

      correctedDisease,
      correctedQuery,
      expandedQuery,

      papers: topPapers,
      trials: topTrials,
      pubmed: pubmedResults.slice(0,5),

      aiResponse  
    })

    

  } catch (error) {

            console.error("HandleQuery Error:", error)

            return res.status(500).json({
            success:false,
            message:"Internal Server Error"
            })

  }

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...

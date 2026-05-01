

export const expandQuery = (disease, query) => {
    if(!disease)return query 
    return `${disease} AND ${query}`
}
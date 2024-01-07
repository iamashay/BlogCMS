export const createSummary = (body) => {
    return body?.replace(/(<([^>]+)>)/gi, '').trim().slice(0, process.env.SUMMARY_CHAR_LIMIT)
}

export const formatDate = (date) => {
    return date?.split('T')[0]
}
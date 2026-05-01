import ReactMarkdown from "react-markdown"

const AIResponse = ({ response }) => {
    console.log(response)

  if(!response) return null

  return (
  <div className="bg-white prose prose-slate prose-lg max-w-3xl
        prose-table:border
        prose-table:border-slate-200
        prose-th:bg-slate-100
        prose-td:p-2">

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        AI Medical Analysis
      </h2>

      <div className="prose max-w-none text-slate-700">
        <ReactMarkdown>
          {response}
        </ReactMarkdown>
      </div>

    </div>
  )
}

export default AIResponse
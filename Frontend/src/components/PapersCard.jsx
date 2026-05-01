

const PapersCard = ({papersList}) => {

    console.log(papersList)

    return (
        <div className="max-w-[80%] rounded-xl
            flex flex-col justify-start items-start p-6">
        {/* Papers */}
        <ul className="grid grid-cols-2 gap-4">
        {papersList.map(each => (
            <li className="bg-white px-4 py-2">
                <h2>{each.title}</h2>
                <p>{each.source}</p>
                <p>{each.doi}</p>
            </li>
        ))}
        </ul>
        </div>
    )
}

export default PapersCard
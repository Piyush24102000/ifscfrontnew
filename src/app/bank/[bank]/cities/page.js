import Cities from "../../../components/Cities"

async function GetDataByBank(bankName) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBank`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bankName })
    })
    let responseData = await response.json()
    return responseData.data[0].distinctCities
}

const CitiesData = async ({ params }) => {
    let bankName = params.bank
    let citiesData = await GetDataByBank(bankName)
    let cities = citiesData.slice(0, 300)
    
    return (
        <div>
            <Cities cities={cities} bankName = {bankName} />
        </div>
    )
}

export default CitiesData
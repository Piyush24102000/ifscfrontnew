import Cities from "../../../../../components/Cities"

async function GetDataByBankDist(bankName, distName) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBankDist`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bankName, districtName: distName })
    })
    let responseData = await response.json()
    return responseData.data[0].distinctCities
}

const page = async ({ params }) => {
    let bankName = params.bank //removed the decodeURIComponent
    let distName = decodeURIComponent(params.district)
    let data = await GetDataByBankDist(bankName, distName)
    return (
        <div>
            <Cities cities={data} district={distName} bankName = {bankName} />
        </div>
    )
}

export default page
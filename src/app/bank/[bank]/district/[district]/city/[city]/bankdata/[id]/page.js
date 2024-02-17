import BankData from "@/app/components/BankData"

async function getBankDataMap(id) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bank/${id}`)
        let responseData = await response.json()
        return responseData.data
    } catch (error) {
        console.log(error)
    }
}
const bankdata = async ({ params }) => {
    let { id } = params
    let bankData = await getBankDataMap(id)

    return (
        <div>
            <BankData bankData={bankData} />
        </div>
    )
}

export default bankdata
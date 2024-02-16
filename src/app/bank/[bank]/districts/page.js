import Districts from "../../../components/Districts"

async function GetDataByBank(bankName) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBank`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bankName })
    })
    let responseData = await response.json()
    return responseData.data[0].distinctDistricts
  }
  
  const DistrictsData = async ({params}) => {
    let bankName = params.bank
    let districtData = await GetDataByBank(bankName)
    let districts = districtData.slice(0, 300)
  
    return (
      <div>
        <Districts districts={districts} bankName = {bankName} />
      </div>
    )
  }
  
  export default DistrictsData
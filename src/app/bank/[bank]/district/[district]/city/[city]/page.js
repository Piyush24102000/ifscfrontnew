import BankHome from '@/app/components/BankHome'

async function GetDataByBankDistCity(bankName, distName, cityName) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBankDistCity`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bankName, districtName: distName, cityName })
  })
  let responseData = await response.json()
  return responseData.data
}

const BankDistCity = async ({ params }) => {
  let bankName = params.bank
  let distName = decodeURIComponent(params.district)
  let cityName = decodeURIComponent(params.city)
  let data = await GetDataByBankDistCity(bankName, distName, cityName)

  return (
    <div>
      <BankHome bankData={data[0]} bankName={bankName} distName={distName} cityName={cityName}/>
    </div>
  )
}

export default BankDistCity
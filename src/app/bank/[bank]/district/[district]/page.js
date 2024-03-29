import BankHome from '@/app/components/BankHome'
import NotFound from '@/app/not-found'

async function GetDataByBankDist(bankName, distName) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBankDist`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bankName, districtName: distName })
  })
  let responseData = await response.json()
  return responseData
}
const BankDistData = async ({ params }) => {
  let bankName = params.bank
  let distName = decodeURIComponent(params.district)
  let data = await GetDataByBankDist(bankName, distName)
  return (
    <div>
      {
        data.success == false ? <NotFound /> :
          <BankHome bankData={data.data[0]} bankName={bankName} distName={distName} />
      }
    </div>
  )
}

export default BankDistData
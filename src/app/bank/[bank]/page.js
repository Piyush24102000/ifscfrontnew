import BankHome from '@/app/components/BankHome'

async function GetDataByBank(bankName) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getDataByBank`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bankName })
  })
  let responseData = await response.json()
  return responseData.data
}
const BankNameData = async ({ params }) => {
  let bankName = params.bank
  let bankData = await GetDataByBank(bankName)
  return (
    <div>
      <BankHome bankData={bankData[0]} bankName = {bankName} />
    </div>
  )
}

export default BankNameData
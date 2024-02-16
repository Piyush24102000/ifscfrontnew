import QuickAtmData from "../../../../components/Quicksearch/QuickAtmData"

async function getAtmDetails(id) {
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/atm/${id}`)
      let responseData = await response.json()
      return responseData.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const atm = async ({ params }) => {
    let { id } = params
    let atmData = await getAtmDetails(id)
    return (
      <div>
        <QuickAtmData atmData={atmData} />
      </div>
    )
  }
  
  export default atm
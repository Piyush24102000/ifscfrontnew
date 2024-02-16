'use client'
import React, { useState, useEffect } from 'react'
import BankList from '@/app/components/BankList'
import AtmList from '@/app/components/AtmList'

const BankDistCityBranch = ({ params }) => {
    let bankName = params.bank
    let districtName = decodeURIComponent(params.district)
    let cityName = decodeURIComponent(params.city)
    let branchName = decodeURIComponent(params.branch)

    /* States */
    const [bankData, setBankData] = useState([])
    const [atmData, setAtmData] = useState([])
    const [quickBank, setQuickBank] = useState('')


    // State to keep track of the selected radio button
    const [selectedRadio, setSelectedRadio] = useState('both');
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    }

    useEffect(() => {
        if (selectedRadio == 'bank' || selectedRadio == 'both') {
            // Remove the slug from bankname to search in atm api
            bankName = bankName.replace(/-/g, ' ')
            async function getIFSCData() {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stepSearch/getBankData`,
                        {
                            method: "POST",
                            body: JSON.stringify({ bankName, districtName, cityName, branchName }),
                            headers: {
                                "Content-type": "application/json",
                            },
                        }
                    );
                    let responseData = await response.json()
                    setBankData(responseData.data)
                } catch (error) {
                    console.log(error);
                }
            }
            getIFSCData()
        }

        if (selectedRadio == 'atm' || selectedRadio == 'both') {
            // Remove the slug from bankname to search in atm api
            bankName = bankName.replace(/-/g, ' ')
            async function getATMData() {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/atm/getAtmData`,
                        {
                            method: "POST",
                            body: JSON.stringify({ bankName, districtName, cityName, branchName }),
                            headers: {
                                "Content-type": "application/json",
                            },
                        }
                    );
                    let responseData = await response.json()
                    setAtmData(responseData.data)
                } catch (error) {
                    console.log(error);
                }
            }
            getATMData()
        }
    }, [bankName, districtName, branchName, cityName])

    return (
        <div>

            {/* Search bar */}
            <div className='mb-16 mt-10 '>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="flex items-center justify-center"> {/* Added flex and justify-center */}
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <div className="flex">
                            <input
                                type="search"
                                id="default-search"
                                onChange={(e) => { setQuickBank(e.target.value) }}
                                className="block w-54 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Bank City and Branch"
                                required
                            />
                            <button
                                type="submit"
                                onClick={() => {
                                    newData()
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Radio Button */}
            <div className="flex justify-center">
                <div className="flex items-center me-4">
                    <input
                        id="inline-radio"
                        type="radio"
                        value="bank"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedRadio === 'bank'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Banks</label>
                </div>
                <div className="flex items-center me-4">
                    <input
                        id="inline-2-radio"
                        type="radio"
                        value="atm"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedRadio === 'atm'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ATMs</label>
                </div>
                <div className="flex items-center me-4">
                    <input
                        id="inline-checked-radio"
                        type="radio"
                        value="both"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedRadio === 'both'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Both</label>
                </div>
            </div>

            {/* Table Data */}
            {
                selectedRadio == 'both' ?
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <BankList bankData={bankData} bankName={bankName} districtName={districtName} cityName={cityName} branchName={branchName} />
                        </div>
                        <div className="w-full">
                            <AtmList atmData={atmData} bankName={bankName} districtName={districtName} cityName={cityName} branchName={branchName} />
                        </div>
                    </div>
                    :
                    selectedRadio == 'bank' ?
                        <BankList bankData={bankData} bankName={bankName} districtName={districtName} cityName={cityName} branchName={branchName} />
                        :
                        <AtmList atmData={atmData} bankName={bankName} districtName={districtName} cityName={cityName} branchName={branchName} />

            }
        </div>
    )
}

export default BankDistCityBranch
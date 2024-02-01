import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('https://n2.adprophet.de/googleads/campaigns', {
        headers: {
          'Authorization': 'Bearer ' + ''
        }
      })
      setData(
        // data.data.map(campaign => ({
        //   name: campaign.name,
        //   id: campaign.id,
        //   status: campaign.status,
        // }))
        data.data
      )
    }
    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Campaigns</h2>
          <div className="mt-4">
            {data && data.map(campaign => (
              <div key={campaign.id} className="bg-gray-100 rounded-lg p-4 mt-2">
                <h3 className="text-lg font-bold">{campaign.name}</h3>
                <p className="text-sm">{campaign.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [platforms, setPlatforms] = useState(null)

  // load available platforms
  useEffect(() => {
    const fetchPlatforms = async () => {
      const fetchedPlatforms = await axios.get('https://api.n2api.io/v1/platforms', {
        headers: {
          'Authorization': 'Bearer ' + '<YOUR_TOKEN_HERE>'
        }
      })
      setPlatforms(fetchedPlatforms.data.map(platform => platform.name.toLowerCase()))
    }
    fetchPlatforms()
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const combinedData = await Promise.all(platforms?.map(async platform => {
        const platformData = await axios.get('https://api.n2api.io/v1/' + platform + '/campaigns', {
          headers: {
            'Authorization': 'Bearer ' + '<YOUR_TOKEN_HERE>'
          }
        })
        console.log(platformData.data);
        return platformData.data;
      }))
      setData(combinedData.flat())
      console.log("Combined data");
      console.log(combinedData.flat());
    }
    fetchData()
  }, [platforms]);

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
import { useState, useEffect } from "react";
import { client, recommendedProfiles } from "../../api";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function RecommendedProfiles() {
    const [profiles, setProfiles] = useState([])
        useEffect(() => {
            fetchRecommendedProfiles()
        }, [])

        async function fetchRecommendedProfiles() {
            try {
              /* fetch profiles from Lens API */
              let response = await client.query({ query: recommendedProfiles })
              console.log(response.data)
              /* loop over profiles, create properly formatted ipfs image links */
              let profileData = await Promise.all(response.data.exploreProfiles.items.map(async (profileInfo: any) => {
                let profile = { ...profileInfo }
                
                return profile
              }))
        
              /* update the local state with the profiles array */
              // @ts-ignore
              setProfiles(profileData)
            } catch (err) {
              console.log({ err })
            }
          }
    return (
        <div className='pt-20'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-5xl mb-6 font-bold'> Recommended profiles 🌿 </h1>
            </div>
            {
            profiles.map(({bio, id, name}) => (
                <div key={id} className='w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col'>
                  <p className='text-xl text-center mt-6'>{name}</p>
                  <p className='text-base text-gray-400  text-center mt-2'>{bio}</p>
                </div>
            ))
          }
        </div>
    )
}

/* pages/index.js */
import { useEffect, useState } from 'react'
import { client, searchProfiles } from '../api'
import Link from 'next/link'

export default function SearchProfiles() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchWantedProfiles()
  }, [])
  async function fetchWantedProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: searchProfiles })
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(response.data.search.items.map(async (profileInfo: any) => {
        
        let profile = { ...profileInfo }
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }
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
          <h1 className='text-5xl mb-6 font-bold'>Results : </h1>
          {
            profiles.map(({avatarUrl, bio, handle, id, name, stats: {totalFollowers}}) => (
                <div key={id} className='w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center'>
                  <img className='w-48' src={avatarUrl || 'https://picsum.photos/200'} />
                  <p className='text-xl text-center mt-6'>{name}</p>
                  <p className='text-base text-gray-400  text-center mt-2'>{bio}</p>
                  <Link href={`/profile/${handle}`}>
                    <p className='cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2'>{handle}</p>
                  </Link>
                  <p className='text-pink-600 text-sm font-medium text-center'>{totalFollowers} followers</p>
                </div>
            ))
          }

        </div>
      </div>
  )
}


// export default function RecommendedProfiles() {
//     const [profiles, setProfiles] = useState([])
//         useEffect(() => {
//             fetchRecommendedProfiles()
//         }, [])

//         async function fetchRecommendedProfiles() {
//             try {
//               /* fetch profiles from Lens API */
//               let response = await client.query({ query: recommendedProfiles })
//               console.log(response.data)
//               setProfiles(response.data.recommendedProfiles)
//             } catch (err) {
//               console.log({ err })
//             }
//           }
//     return (
//         <div className='pt-20'>
//             <div className='flex flex-col justify-center items-center'>
//                 <h1 className='text-5xl mb-6 font-bold'> Recommended profiles 🌿 </h1>
//             </div>
//             {
//             profiles.map(({bio, id, name}) => (
//                 <div key={id} className='flex flex-col justify-center items-center'>
//                   <div  className='shadow p-10 rounded mb-8 w-2/3'> 
//                     <p className='text-xl text-center mt-6'>{name}</p>
//                     <Link href={`./details/${id}`}>
//                       <p className='cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2'>{id}</p>
//                     </Link>                  
//                     <p className='text-base text-gray-400  text-center mt-2'>{bio}</p>
//                   </div>
//                 </div>
//             ))
//           }
//         </div>
//     )
// }
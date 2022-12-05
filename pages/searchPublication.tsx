import { useEffect, useState } from 'react'
import { client, searchPublications } from '../api'
import Link from 'next/link'

export default function SearchPublications() {
  const [publications, setPublications] = useState([])
  useEffect(() => {
    fetchWantedPublications()
  }, [])
  async function fetchWantedPublications() {
    try {
      /* fetch Publications from Lens API */
      let response = await client.query({ query: searchPublications})
      /* loop over Publications, create properly formatted ipfs image links */
      let publicationData = await Promise.all(response.data.search.items.map(async (publicationInfo: any) => {
        
        let publication = { ...publicationInfo }
       
        return publication
      })) 

      /* update the local state with the Publications array */
      // @ts-ignore
      setPublications(publicationData)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
      <div className='pt-20'>
        <div className='flex flex-col justify-center items-center'>
                {
                    publications.map((pub:any) => (
                        <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                            <p>{pub.metadata.content}</p>
                        </div>
                    ))
                }

        </div>
      </div>
  )
}
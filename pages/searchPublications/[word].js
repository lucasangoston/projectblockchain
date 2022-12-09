/* pages/index.js */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client, searchPublications } from '../../api'

export default function SearchPublications() {
    const [publications, setPublications] = useState([])
    const router = useRouter()
    const { word } = router.query

    useEffect(() => {
        if (word) {
            fetchWantedPublications()
        }
    }, [word])
    async function fetchWantedPublications() {
        try {
            let response = await client.query({ query: searchPublications, variables: { word, limit: 50 } })
            let publicationData = await Promise.all(response.data.search.items.map(async (publicationInfo) => {

                let publication = { ...publicationInfo }
                return publication
            }))

            setPublications(publicationData)
        } catch (err) {
            console.log({ err })
        }
    }
    return (
        <div className='pt-20'>
            <div className='flex flex-col justify-center items-center'>
                {
                    publications.map((pub) => (
                        <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                            <p>{pub.metadata.content}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
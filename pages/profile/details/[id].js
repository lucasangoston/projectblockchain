import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { client, getPublications, getProfileById } from '../../../api'

export default function ProfileId() {

    const [profile, setProfile] = useState()
    const [publications, setPublications] = useState([])

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            fetchProfileById()
        }
    }, [id])

    async function fetchProfileById() {
        try {
            const returnedProfileById = await client.query({
                query: getProfileById,
                variables: { id }
            })
            console.log(returnedProfileById)
            // const profileData = { ...returnedProfile.data.profile }
            // setProfile(profileData)

            // const pubs = await client.query({
            //     query: getPublications,
            //     variables: {
            //         id: profileData.id, limit: 50
            //     }
            // })
            // setPublications(pubs.data.publications.items)

        } catch (err) {
            console.log('failed to fetch profile by id ', err)
        }
    }

    return (
        <div className='pt-20'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-4xl mt-8 mb-8'>{id}</p>
            </div>
        </div>
    )
}
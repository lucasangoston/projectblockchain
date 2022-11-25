import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { client, getPublications, getProfileById } from '../../../api'
import { ethers } from 'ethers'
import ABI from '../../../abi.json'

const address = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"

export default function ProfileId() {

    const [profileData, setProfileData] = useState()
    const [pubs, setPubs] = useState([])

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
            const data = { ...returnedProfileById.data.profile }     
            /* format their picture if it is not in the right format */
            const picture = data.picture
            if (picture || picture.original || picture.original.url) {
                if (picture.original.url.startsWith('ipfs://')) {
                    let result = picture.original.url.substring(7, picture.original.url.length)
                    data.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
                } else {
                    data.avatarUrl = data.picture.original.url
                }
            }     
            setProfileData(data)

            const publications = await client.query({
                query: getPublications,
                variables: {
                    id: data.id, limit: 50
                }
            })
            setPubs(publications.data.publications.items)

            console.log("pubs : ", publications)

        } catch (err) {
            console.log('error fetching profile...', err)
        }
    }

    async function followUser() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()

        const contract = new ethers.Contract(
            address, 
            ABI, 
            signer
            )

        try {
            const tx = await contract.follow(
                [id],
                [0x0]
            )
            await tx.wait()
            console.log("followed user successfully")
        } catch (err) {
            console.log({ err })
        }
    }

    if (!profileData || !pubs) return null

    return (
        <div className='pt-20'>
            <div className='flex flex-col justify-center items-center'>
                <button onClick={followUser}>Follow User</button>
                <p className='text-4xl mt-8 mb-8'>{profileData.name}</p>
                { 
                    profileData.picture ? (
                        <img
                        className='w-64 rounded-full'
                        src={profileData.avatarUrl}
                    /> ) : (
                        <div className='w-64 rounded-full'  style={{width: '200px', height: '200px', backgroundColor: 'black'}} />
                        )
                }

                <p className='text-4xl mt-8 mb-8'>Followers {profileData.stats.totalFollowers}</p>
                <p className='text-4xl mt-8 mb-8'>Following {profileData.stats.totalFollowing}</p>

                {
                    pubs.map(pub => (
                        <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                            <p>{pub.metadata.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
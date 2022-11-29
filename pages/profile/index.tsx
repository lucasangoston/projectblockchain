import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RecommendedProfiles from "./recommended";
import { client, defaultProfile, getProfileById, getPublications } from "../../api";
import { ethers } from 'ethers'
import ABI from '../../abi.json'
import { PostList } from "../../components/home/post/PostList";
import { PrimarySearchAppBar } from "../../components/navigationBar/navigationBar";
import { cardProfile } from "../../components/profile/cardProfile"
const address = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"

export default function Profile() {

    const [profile, setProfile] = useState()
    const [pubs, setPubs] = useState([])


    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        try {
            const returnedProfileById = await client.query({
                query: getProfileById,
                variables: { id: "0x01" }
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
            setProfile(data)

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

    if (!profile || !pubs) return null


    return (

        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <div>
            </div>
            <div className='pt-20'>
                <div className='flex flex-col justify-center items-center'>
                    <h1><Link href={"./"}>Accueil</Link></h1>
                    <p className='text-4xl mt-8 mb-8'>{profile.name}</p>
                    {
                        profile.picture ? (
                            <img
                                className='w-64 rounded-full'
                                src={profile.avatarUrl}
                            />) : (
                            <div className='w-64 rounded-full' style={{ width: '200px', height: '200px', backgroundColor: 'black' }} />
                        )
                    }

                    <p className='text-4xl mt-8 mb-8'>Followers {profile.stats.totalFollowers}</p>
                    <p className='text-4xl mt-8 mb-8'>Following {profile.stats.totalFollowing}</p>

                    {
                        pubs.map(pub => (
                            <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                                <p>{pub.metadata.content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

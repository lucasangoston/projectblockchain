import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RecommendedProfiles from "./recommended";
import { client } from "../../api/api";
import { getProfileById } from "../../api/profile";
import { getPublications} from "../../api/publication"
import { ethers } from 'ethers'
import ABI from '../../abi.json'
import { PostList } from "../../components/home/post/PostList";
import { PrimarySearchAppBar } from "../../components/navigationBar/navigationBar";
import { Box, Container, Grid } from "@mui/material";
import { Profile } from "../../components/profile/profile";
const address = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"

export default function ProfilePage() {

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
            <div style={{marginTop: 100}}>
                <Profile></Profile>
            </div>
        </div>
    );
}

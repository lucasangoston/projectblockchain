import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api-mumbai.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

// export const refresh = gql`
//   mutation Refresh($refreshToken: ) {
//     refresh(request: {
//       refreshToken: $refreshToken
//     }) {
//       accessToken
//       refreshToken
//     }
//   }
// `


// export const defaultProfile = gql`
//   query DefaultProfile($address: EthereumAddress!) {
//     defaultProfile( address: $address ) {
//       id
//       name
//       bio
//       isDefault
//       followNftAddress
//       metadata
//       handle
//       picture {
//         ... on NftImage {
//           contractAddress
//           tokenId
//           uri
//           chainId
//           verified
//         }
//         ... on MediaSet {
//           original {
//             url
//             mimeType
//           }
//         }
//       }
//       coverPicture {
//         ... on NftImage {
//           contractAddress
//           tokenId
//           uri
//           chainId
//           verified
//         }
//         ... on MediaSet {
//           original {
//             url
//             mimeType
//           }
//         }
//       }
//       ownedBy
//       dispatcher {
//         address
//         canUseRelay
//       }
//       stats {
//         totalFollowers
//         totalFollowing
//         totalPosts
//         totalComments
//         totalMirrors
//         totalPublications
//         totalCollects
//       }
//       followModule {
//         ... on FeeFollowModuleSettings {
//           type
//           contractAddress
//           amount {
//             asset {
//               name
//               symbol
//               decimals
//               address
//             }
//             value
//           }
//           recipient
//         }
//         ... on ProfileFollowModuleSettings {
//         type
//         }
//         ... on RevertFollowModuleSettings {
//         type
//         }
//       }
//     }
//   }
// `



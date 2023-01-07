import { gql } from "@apollo/client";


export const getUserNfts = gql `
query Nfts($address: EthereumAddress!) {
    nfts(request: {
      ownerAddress: $address,
      limit: 10,
      chainIds: [80001]
    }) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`
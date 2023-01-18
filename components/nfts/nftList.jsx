import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function NftList({ nfts }) {
  let myNfts;
  if (!nfts.nfts) myNfts = nfts;
  else myNfts = nfts.nfts;

  return (
    <div>
      <div className="flex grid grid-cols-5 justify-between w-full">
        {myNfts.map(({ name, collectionName, originalContent, tokenId }) => {
          return (
            <Card key={tokenId} style={{ margin: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Détenteur:</span>
              <h6 style={{ fontSize: '12px' }}> {name}</h6>
              <CardContent>
                <img
                  src={
                    originalContent.uri.startsWith('ipfs://')
                      ? `http://lens.infura-ipfs.io/ipfs/${originalContent.uri.substring(
                          7,
                          originalContent?.uri.length,
                        )}`
                      : 'https://img.freepik.com/vecteurs-premium/pixel-art-nft-coin-investissement-dans-icone-vecteur-jeux-crypto-pour-jeu-8bit-fond-blanc_360488-390.jpg?w=2000'
                  }
                />
                <span style={{ fontWeight: 'bold' }}>Catégorie:</span>
                <p>{collectionName}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function NftList({ nfts }) {

  console.log("nfts", nfts);

  return (
    <div>
      <div className="flex grid grid-cols-5 justify-between w-full">
        {nfts.map(
          ({ name, description, collectionName, originalContent, tokenId }) => (
            <div
              key={tokenId}
              className="w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
            >
              <img
                className="w-48"
                src={
                  originalContent.uri.startsWith('ipfs://')
                    ? `http://lens.infura-ipfs.io/ipfs/${originalContent.uri.substring(
                        7,
                        originalContent?.uri.length,
                      )}`
                    : originalContent.uri
                }
              />
              <p className="text-xl text-center mt-6">{name}</p>
              <p className=" text-center mt-6 italic">{collectionName}</p>
              {/* <p className="text-base text-gray-400  text-center mt-2">{description}</p> */}
              {/* <Link href={`/profile/${handle}`}>
                <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
                  {handle}
                </p>
              </Link>  */}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

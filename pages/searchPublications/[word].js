/* pages/index.js */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../../api/api'
import { searchPublications } from '../../api/search'

export default function SearchPublications() {
  const [publications, setPublications] = useState([]);
  const router = useRouter();
  const { word } = router.query;

  useEffect(() => {
    if (word) {
      fetchWantedPublications();
    }
  }, [word]);
  async function fetchWantedPublications() {
    try {
      const response = await client.query({
        query: searchPublications,
        variables: { word, limit: 50 },
      });
      const publicationData = await Promise.all(
        response.data.search.items.map(async (publicationInfo) => {
          return { ...publicationInfo };
        }),
      );

      setPublications(publicationData);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">        
      <h1 className="text-5xl mb-6 font-bold">Results : </h1>
        {publications.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

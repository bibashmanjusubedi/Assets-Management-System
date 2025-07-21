// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

// const SingleAssetsDetailsPage = () => {
//   const { assetId } = useParams<{ assetId: string }>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAssetDetails = async () => {
//       try {
//         const response = await fetch(`https://asset-management-system-2y9g.onrender.com/api/asset-details/${assetId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching asset details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssetDetails();
//   }, [assetId]);

//   return (
//     <div>
//       {loading ? <p>Loading...</p> : <p>Asset ID: {assetId}</p>}
//     </div>
//   );
// };

// export default SingleAssetsDetailsPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "@/lib/api";

type AssetDetailsResponse = {
  
  assetId: number;
  name: string;
  shortName?: string;
  description?: string;
  unit?: number;
  
};

const SingleAssetsDetailsPage = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<AssetDetailsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const { data }: { data: AssetDetailsResponse } = await api.get(
          `/Asset/Details/${assetId}/`
        );
        console.log("Fetched Asset Data:", data);
        setAsset(data);
      } catch {
        setError("Error fetching asset details.");
        setAsset(null);
      } finally {
        setLoading(false);
      }
    };

    if (assetId) fetchAssetDetails();
  }, [assetId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl  mb-2">Asset Details</h2>
      {asset ? (
        // <pre className="bg-gray-100 p-4 rounded  ">{asset.assetId}</pre>
        <div className="bg-gray-100 p-6 rounded shadow max-w-md">
          <div className="mb-2">
            <strong>Asset ID:</strong> {asset.assetId}
          </div>
          <div className="mb-2">
            <strong>Name:</strong> {asset.name}
          </div>
          <div className="mb-2">
            <strong>Shortname:</strong> {asset.shortName ?? "N/A"}
          </div>
          <div className="mb-2">
            <strong>Description:</strong> {asset.description ?? "N/A"}
          </div>
          <div className="mb-2">
            <strong>Unit:</strong> {asset.unit ?? "N/A"}
          </div>
        </div>
      ) : (
        <div>No asset found.</div>
      )}
    </div>
  );
};

export default SingleAssetsDetailsPage;



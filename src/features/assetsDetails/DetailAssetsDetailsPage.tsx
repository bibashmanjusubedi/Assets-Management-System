import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "@/lib/api";

type AssetDetailsResponse = {
  sn: number;
  assetId: number;
  assetCode: number;
  price: number;
  purchaseDate: string;
  remark: string;
  status: string;
};

const DetailAssetsDetailsPage = () => {
  const { sn } = useParams<{ sn: string }>();  // ✅ Fix here
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<AssetDetailsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const { data }: { data: AssetDetailsResponse } = await api.get(
          `/AssetDetail/Details/${sn}`
        );
        console.log("Fetched Asset Data:", data);
        setAsset(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Error fetching asset details.");
        setAsset(null);
      } finally {
        setLoading(false);
      }
    };

    if (sn) fetchAssetDetails(); // ✅ Ensure this matches the param
  }, [sn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl mb-2">Asset Details</h2>
      {asset ? (
        <div className="bg-gray-100 p-6 rounded shadow max-w-md">
          <div className="mb-2"><strong>Sn:</strong> {asset.sn}</div>
          <div className="mb-2"><strong>Asset ID:</strong> {asset.assetId}</div>
          <div className="mb-2"><strong>Asset Code:</strong> {asset.assetCode}</div>
          <div className="mb-2"><strong>Price:</strong> {asset.price}</div>
          <div className="mb-2"><strong>Purchase Date:</strong> {asset.purchaseDate}</div>
          <div className="mb-2"><strong>Remark:</strong> {asset.remark}</div>
          <div className="mb-2"><strong>Status:</strong> {asset.status}</div>
        </div>
      ) : (
        <div>No asset details found.</div>
      )}
    </div>
  );
};

export default DetailAssetsDetailsPage;

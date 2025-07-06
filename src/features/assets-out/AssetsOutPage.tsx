//yesma user ko api taneko xa
import React, { useState, useEffect } from "react";

// Define the Row interface
interface Row {
  id: number;
  Outdate: string;
  DateToReturn: string;
  ReturnDate: string;
  Remarks: string;
  AssetDetail: string;
  OutTo: string;
}

interface Asset {
  id: string;
  AssetCode: string; // Example: "tbl001" or "lab001"
}

interface User {
  id: string; // Special token (e.g., "1", "2", "3")
  name: string; // User name (e.g., "deepa", "sweta")
}

export default function AssetTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    Outdate: "",
    DateToReturn: "",
    ReturnDate: "",
    Remarks: "",
    AssetDetail: "",
    OutTo: "",
  });
  const [assets, setAssets] = useState<Asset[]>([]); // State to store asset details
  const [users, setUsers] = useState<User[]>([]); // State to store user data

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-out/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Row[] = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAssets = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Asset[] = await response.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching asset details:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/users/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    fetchAssets();
    fetchUsers();
  }, []);

  const handleAddRow = async () => {
    if (
      !formData.OutTo ||
      !formData.Outdate ||
      !formData.DateToReturn ||
      !formData.AssetDetail
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-out/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newRow: Row = await response.json(); // Get the saved row from the response
      setRows([...rows, newRow]); // Update the table with the new row
      setFormData({
        Outdate: "",
        DateToReturn: "",
        ReturnDate: "",
        Remarks: "",
        AssetDetail: "",
        OutTo: "",
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://localhost:7252/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Name: "se",
          Password: "0123456789",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed! Status: ${response.status}`);
        console.log("shit");
        console.log(response.json);
      }
  
      const data = await response.json();
      console.log("Login Success:", data);
  
      // Optional: Store token if returned
      // localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check the credentials or server.");
    }
  };
  

  return (
    <div>
      <h1 className="underline font-bold pl-1.5 text-2xl mt-20 flex item-center justify-center">
        Asset-Out Details
      </h1>

      {/* Add Records Button */}
      <div className="mt-3 py-2 flex pr-8 justify-end">
        <button
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="px-4 py-2  text-black hover:bg-blue-300 bg-gray-500"
        >
          {isFormOpen ? "   ----❌----   " : "➕Add Records"}{" "}
        </button>
        {/* <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 underline text-black hover:bg-blue-500 bg-blue-500"
        >
          Add Records
        </button> */}
      </div>

      {/* Form */}

      {isFormOpen && (
        <div className="bg-white justify-center shadow-4xl border-2 overflow-hidden min-w-[400px] max-w-[800px] mx-auto p-4 ">
          <h3 className="text-lg pl-80 font-semibold mb-3">Add New Record</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label htmlFor="OutTo" className="block text-black text-sm mb-1">
                Out To
              </label>
              <select
                id="OutTo"
                name="OutTo"
                value={formData.OutTo}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="Outdate"
                className="block text-gray-700 text-sm mb-1"
              >
                Outdate
              </label>
              <input
                type="date"
                id="Outdate"
                name="Outdate"
                value={formData.Outdate}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="DateToReturn"
                className="block text-gray-700 text-sm mb-1"
              >
                Date To Return
              </label>
              <input
                type="date"
                id="DateToReturn"
                name="DateToReturn"
                value={formData.DateToReturn}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="ReturnDate"
                className="block text-gray-700 text-sm mb-1"
              >
                Return Date
              </label>
              <input
                type="date"
                id="ReturnDate"
                name="ReturnDate"
                value={formData.ReturnDate}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="AssetDetail"
                className="block text-gray-700 text-sm mb-1"
              >
                Asset Detail
              </label>
              <select
                id="AssetDetail"
                name="AssetDetail"
                value={formData.AssetDetail}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">Select Asset</option>
                {Array.isArray(assets) &&
                  assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.AssetCode}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="Remarks"
                className="block text-gray-700 text-sm mb-1"
              >
                Remarks
              </label>
              <input
                type="text"
                id="Remarks"
                name="Remarks"
                placeholder="Remarks"
                value={formData.Remarks}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleAddRow}
              className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              ➡️
            </button>
            <button
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-blue-500"
            >
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Table */}

      <div className="items-center px-7 py-7 shadow-2xl ">
        {/* min-w-full text-sm text-left text-gray-600 bg-blue-200 shadow-4xl border-3 overflow-hidden */}
        <table className="w-full table-auto border-2  ">
          <thead className="bg-gray-500 text-black text-xs uppercase">
            <tr>
              <th className="px-4 py-3 border-r-2">Out To</th>
              <th className="px-4 py-3 border-r-2">Outdate</th>
              <th className="px-4 py-3 border-r-2">Date To Return</th>
              <th className="px-4 py-3 border-r-2">Return Date</th>
              <th className="px-4 py-3 border-r-2">Asset Detail</th>
              <th className="px-4 py-3 border-r-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-l-2 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border-r-2">{row.OutTo}</td>
                  <td className="px-4 py-2 border-r-2">{row.Outdate}</td>
                  <td className="px-4 py-2 border-r-2">{row.DateToReturn}</td>
                  <td className="px-4 py-2 border-r-2">{row.ReturnDate}</td>
                  <td className="px-4 py-2 border-r-2">{row.AssetDetail}</td>
                  <td className="px-4 py-2 border-r-2">{row.Remarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h1>hello</h1>
        <table className="w-full table-auto border-2" >
                <tbody>
                  <tr>
                    <th className="px-4 py-3 border-r-2">Out To From Backend</th>
                    <th className="px-4 py-3 border-r-2">Outdate from Backend</th>
                    <th className="px-4 py-3 border-r-2">Date To Return from Backend</th>
                    <th className="px-4 py-3 border-r-2">Return Date from Backend</th>
                    <th className="px-4 py-3 border-r-2">Asset Detail from Backend</th>
                    <th className="px-4 py-3 border-r-2">Remarks from Backend</th>
              </tr>
                </tbody>
        </table>
        <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Login</button>



      </div>
    </div>
  );
}

// //nayaaya
// import React, { useState, useEffect } from "react";

// //Row interface define gareko
// interface Row {
//   id: number;
//   Outdate: string;
//   DateToReturn: string;
//   ReturnDate: string;
//   Remarks: string;
//   AssetDetail: string;
//   OutTo: string;
// }

// interface Asset {
//   id: string;
//   AssetCode: string; // Example: "tbl001" or "lab001"
// }

// export default function AssetTable() {
//   const [rows, setRows] = useState<Row[]>([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     Outdate: "",
//     DateToReturn: "",
//     ReturnDate: "",
//     Remarks: "",
//     AssetDetail: "",
//     OutTo: "",
//   });
//   const [assets, setAssets] = useState<Asset[]>([]); // State to store asset details

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-out/"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Row[] = await response.json();
//         setRows(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const fetchAssets = async () => {
//       try {
//         const response = await fetch(
//           "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/"
//         ); // Replace with your actual API endpoint for assets
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Asset[] = await response.json();
//         setAssets(data);
//       } catch (error) {
//         console.error("Error fetching asset details:", error);
//       }
//     };

//     fetchData();
//     fetchAssets();
//   }, []);

//   const handleAddRow = () => {
//     if (!formData.OutTo || !formData.Outdate || !formData.DateToReturn) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const newRow: Row = {
//       id: rows.length + 1,
//       ...formData,
//     };
//     setRows([...rows, newRow]);
//     setFormData({
//       Outdate: "",
//       DateToReturn: "",
//       ReturnDate: "",
//       Remarks: "",
//       AssetDetail: "",
//       OutTo: "",
//     });
//     setIsFormOpen(false);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1 className="underline font-bold pl-1.5 text-2xl mt-20 flex item-center justify-center">
//         Asset-Out Details
//       </h1>

//       {/* Add Records Button */}
//       <div className="mt-3 py-2 flex pr-8 justify-end">
//         <button
//           onClick={() => setIsFormOpen(true)}
//           className="px-4 py-2 underline text-black hover:bg-blue-500 bg-blue-500"
//         >
//           Add Records
//         </button>
//       </div>

//       {/* Form */}
//       {isFormOpen && (
//         <div className="bg-white justify-center shadow-2xl border overflow-hidden min-w-[400px] max-w-[800px] mx-auto p-4 mt-4">
//           <h3 className="text-lg pl-100 font-semibold mb-3">Add New Record</h3>
//           <div className="flex flex-wrap gap-4">
//             <div className="flex-1">
//               <label htmlFor="OutTo" className="block text-black text-sm mb-1">
//                 Out To
//               </label>
//               <input
//                 type="text"
//                 id="OutTo"
//                 name="OutTo"
//                 placeholder="Out To"
//                 value={formData.OutTo}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               />
//             </div>

//             <div className="flex-1">
//               <label
//                 htmlFor="Outdate"
//                 className="block text-gray-700 text-sm mb-1"
//               >
//                 Outdate
//               </label>
//               <input
//                 type="date"
//                 id="Outdate"
//                 name="Outdate"
//                 value={formData.Outdate}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               />
//             </div>

//             <div className="flex-1">
//               <label
//                 htmlFor="DateToReturn"
//                 className="block text-gray-700 text-sm mb-1"
//               >
//                 Date To Return
//               </label>
//               <input
//                 type="date"
//                 id="DateToReturn"
//                 name="DateToReturn"
//                 value={formData.DateToReturn}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               />
//             </div>

//             <div className="flex-1">
//               <label
//                 htmlFor="ReturnDate"
//                 className="block text-gray-700 text-sm mb-1"
//               >
//                 Return Date
//               </label>
//               <input
//                 type="date"
//                 id="ReturnDate"
//                 name="ReturnDate"
//                 value={formData.ReturnDate}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               />
//             </div>

//             <div className="flex-1">
//               <label
//                 htmlFor="AssetDetail"
//                 className="block text-gray-700 text-sm mb-1"
//               >
//                 Asset Detail
//               </label>
//               <select
//                 id="AssetDetail"
//                 name="AssetDetail"
//                 value={formData.AssetDetail}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               >
//                 <option value="">Select Asset</option>
//                 {assets.map((asset) => (
//                   <option key={asset.id} value={asset.id}>
//                     {asset.AssetCode}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex-1">
//               <label
//                 htmlFor="Remarks"
//                 className="block text-gray-700 text-sm mb-1"
//               >
//                 Remarks
//               </label>
//               <input
//                 type="text"
//                 id="Remarks"
//                 name="Remarks"
//                 placeholder="Remarks"
//                 value={formData.Remarks}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               onClick={handleAddRow}
//               className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//             >
//               ➡️
//             </button>
//             <button
//               onClick={() => setIsFormOpen(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-blue-500"
//             >
//               ❌
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="items-center px-7 py-7">
//         <table className="min-w-full text-sm text-left text-gray-600 bg-blue-200 shadow-2xl border-3 overflow-hidden">
//           <thead className="bg-blue-500 text-gray-800 text-xs uppercase">
//             <tr>
//               <th className="px-4 py-3 border-r-2">Out To</th>
//               <th className="px-4 py-3 border-r-2">Outdate</th>
//               <th className="px-4 py-3 border-r-2">Date To Return</th>
//               <th className="px-4 py-3 border-r-2">Return Date</th>
//               <th className="px-4 py-3 border-r-2">Asset Detail</th>
//               <th className="px-4 py-3 border-r-2">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => (
//               <tr key={row.id} className="border-b border-l-2 hover:bg-gray-50">
//                 <td className="px-4 py-2 border-r-2">{row.OutTo}</td>
//                 <td className="px-4 py-2 border-r-2">{row.Outdate}</td>
//                 <td className="px-4 py-2 border-r-2">{row.DateToReturn}</td>
//                 <td className="px-4 py-2 border-r-2">{row.ReturnDate}</td>
//                 <td className="px-4 py-2 border-r-2">{row.AssetDetail}</td>
//                 <td className="px-4 py-2 border-r-2">{row.Remarks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

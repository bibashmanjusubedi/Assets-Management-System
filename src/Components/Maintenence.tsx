// // import React, { useState } from "react";

// // type MaintenanceStatus =
// //   | "Pending"
// //   | "In Progress"
// //   | "Completed"
// //   | "Awaiting Parts";

// // interface MaintenanceRecord {
// //   id: number;
// //   assetName: string;
// //   category: string;
// //   assignedUser: string;
// //   issue: string;
// //   reportedDate: string;
// //   status: MaintenanceStatus;
// //   technician: string;
// //   expectedCompletion: string;
// //   cost: number;
// // }

// // const initialData: MaintenanceRecord[] = [
// //   {
// //     id: 1,
// //     assetName: "Laptop Dell XPS 13",
// //     category: "Laptop",
// //     assignedUser: "Ram",
// //     issue: "Battery not charging",
// //     reportedDate: "2025-05-25",
// //     status: "In Progress",
// //     technician: "John Doe",
// //     expectedCompletion: "2025-05-30",
// //     cost: 120,
// //   },
// //   {
// //     id: 2,
// //     assetName: "HP LaserJet Printer",
// //     category: "Printer",
// //     assignedUser: "Sita",
// //     issue: "Paper jam",
// //     reportedDate: "2025-05-27",
// //     status: "Pending",
// //     technician: "Jane Smith",
// //     expectedCompletion: "2025-06-01",
// //     cost: 50,
// //   },
// //   // Add more records as needed
// // ];

// // const statusColors: Record<MaintenanceStatus, string> = {
// //   Pending: "bg-yellow-100 text-yellow-800",
// //   "In Progress": "bg-blue-100 text-blue-800",
// //   Completed: "bg-green-100 text-green-800",
// //   "Awaiting Parts": "bg-red-100 text-red-800",
// // };

// // const MaintenanceTable: React.FC = () => {
// //   const [data, setData] = useState(initialData);

// //   // Example action handler
// //   const markCompleted = (id: number) => {
// //     setData((prev) =>
// //       prev.map((rec) => (rec.id === id ? { ...rec, status: "Completed" } : rec))
// //     );
// //   };

// //   return (
// //     <div className="overflow-x-auto p-4">
// //       <h2 className="text-xl font-semibold mb-4">Maintenance Records</h2>
// //       <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
// //         <thead>
// //           <tr>
// //             <th className="px-4 py-2 text-left">Asset Name</th>
// //             <th className="px-4 py-2 text-left">Category</th>
// //             <th className="px-4 py-2 text-left">Assigned User</th>
// //             <th className="px-4 py-2 text-left">Issue</th>
// //             <th className="px-4 py-2 text-left">Reported Date</th>
// //             <th className="px-4 py-2 text-left">Status</th>
// //             <th className="px-4 py-2 text-left">Technician</th>
// //             <th className="px-4 py-2 text-left">Expected Completion</th>
// //             <th className="px-4 py-2 text-left">Cost ($)</th>
// //             <th className="px-4 py-2 text-left">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((rec) => (
// //             <tr key={rec.id} className="border-b dark:border-gray-700">
// //               <td className="px-4 py-2">{rec.assetName}</td>
// //               <td className="px-4 py-2">{rec.category}</td>
// //               <td className="px-4 py-2">{rec.assignedUser}</td>
// //               <td className="px-4 py-2">{rec.issue}</td>
// //               <td className="px-4 py-2">{rec.reportedDate}</td>
// //               <td className="px-4 py-2">
// //                 <span
// //                   className={`px-2 py-1 rounded text-xs font-medium ${
// //                     statusColors[rec.status]
// //                   }`}
// //                 >
// //                   {rec.status}
// //                 </span>
// //               </td>
// //               <td className="px-4 py-2">{rec.technician}</td>
// //               <td className="px-4 py-2">{rec.expectedCompletion}</td>
// //               <td className="px-4 py-2">{rec.cost}</td>
// //               <td className="px-4 py-2 space-x-2">
// //                 {rec.status !== "Completed" && (
// //                   <button
// //                     className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
// //                     onClick={() => markCompleted(rec.id)}
// //                   >
// //                     Mark Complete
// //                   </button>
// //                 )}
// //                 {/* Add more actions as needed */}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default MaintenanceTable;
// import React, { useState } from "react";

// type MaintenanceStatus =
//   | "Pending"
//   | "In Progress"
//   | "Completed"
//   | "Awaiting Parts";

// interface MaintenanceRecord {
//   id: number;
//   assetName: string;
//   category: string;
//   assignedUser: string;
//   issue: string;
//   reportedDate: string;
//   status: MaintenanceStatus;
//   technician: string;
//   expectedCompletion: string;
//   cost: number;
// }

// const initialData: MaintenanceRecord[] = [
//   {
//     id: 1,
//     assetName: "Laptop Dell XPS 13",
//     category: "Laptop",
//     assignedUser: "Ram",
//     issue: "Battery not charging",
//     reportedDate: "2025-05-25",
//     status: "In Progress",
//     technician: "John Doe",
//     expectedCompletion: "2025-05-30",
//     cost: 120,
//   },
//   {
//     id: 2,
//     assetName: "HP LaserJet Printer",
//     category: "Printer",
//     assignedUser: "Sita",
//     issue: "Paper jam",
//     reportedDate: "2025-05-27",
//     status: "Pending",
//     technician: "Jane Smith",
//     expectedCompletion: "2025-06-01",
//     cost: 50,
//   },
//   // Add more records as needed
// ];

// const statusColors: Record<MaintenanceStatus, string> = {
//   Pending:
//     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//   "In Progress":
//     "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
//   Completed:
//     "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//   "Awaiting Parts": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
// };

// const MaintenanceTable: React.FC = () => {
//   const [data, setData] = useState(initialData);

//   const markCompleted = (id: number) => {
//     setData((prev) =>
//       prev.map((rec) => (rec.id === id ? { ...rec, status: "Completed" } : rec))
//     );
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//         Maintenance Records
//       </h2>
//       <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
//           <thead className="bg-gray-100 dark:bg-gray-700">
//             <tr>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Asset Name
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Category
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Assigned User
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Issue
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Reported Date
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Technician
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Expected Completion
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Cost ($)
//               </th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//             {data.map((rec) => (
//               <tr
//                 key={rec.id}
//                 className="hover:bg-green-50 dark:hover:bg-green-900/30 transition"
//               >
//                 <td className="px-4 py-3">{rec.assetName}</td>
//                 <td className="px-4 py-3">{rec.category}</td>
//                 <td className="px-4 py-3">{rec.assignedUser}</td>
//                 <td className="px-4 py-3">{rec.issue}</td>
//                 <td className="px-4 py-3">{rec.reportedDate}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       statusColors[rec.status]
//                     }`}
//                   >
//                     {rec.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">{rec.technician}</td>
//                 <td className="px-4 py-3">{rec.expectedCompletion}</td>
//                 <td className="px-4 py-3">{rec.cost}</td>
//                 <td className="px-4 py-3 space-x-2">
//                   {rec.status !== "Completed" && (
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition text-xs font-medium"
//                       onClick={() => markCompleted(rec.id)}
//                     >
//                       Mark Complete
//                     </button>
//                   )}
//                   {/* Add more actions as needed */}
//                 </td>
//               </tr>
//             ))}
//             {data.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={10}
//                   className="text-center py-8 text-gray-400 dark:text-gray-500 italic"
//                 >
//                   No maintenance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MaintenanceTable;
import React, { useState, useEffect } from "react";

type MaintenanceStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Awaiting Parts";

interface MaintenanceRecord {
  id: number;
  assetId: number;
  categoryId: number;
  assignedUserId: number;
  issue: string;
  reportedDate: string;
  status: MaintenanceStatus;
  technician: string;
  expectedCompletion: string;
  cost: number;
}

interface User {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Asset {
  id: number;
  name: string;
}

const statusColors: Record<MaintenanceStatus, string> = {
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "In Progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Awaiting Parts": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const MaintenanceTable: React.FC = () => {
  const [data, setData] = useState<MaintenanceRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Fetch users, categories, assets
  useEffect(() => {
    fetch("http://asset-management-system-2y9g.onrender.com/api/user/users/")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));

    fetch("http://asset-management-system-2y9g.onrender.com/api/categories/")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setCategories([]));

    fetch("http://asset-management-system-2y9g.onrender.com/api/assets/")
      .then((res) => res.json())
      .then(setAssets)
      .catch(() => setAssets([]));
  }, []);

  // Example: Fetch maintenance records (replace with your real API)
  useEffect(() => {
    // Replace this with your actual maintenance API endpoint
    // For demo, using static data:
    setData([
      {
        id: 1,
        assetId: 1,
        categoryId: 1,
        assignedUserId: 1,
        issue: "Battery not charging",
        reportedDate: "2025-05-25",
        status: "In Progress",
        technician: "John Doe",
        expectedCompletion: "2025-05-30",
        cost: 120,
      },
      {
        id: 2,
        assetId: 2,
        categoryId: 2,
        assignedUserId: 2,
        issue: "Paper jam",
        reportedDate: "2025-05-27",
        status: "Pending",
        technician: "Jane Smith",
        expectedCompletion: "2025-06-01",
        cost: 50,
      },
    ]);
  }, []);

  const getUserName = (id: number) =>
    users.find((u) => u.id === id)?.name || "Unknown";
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "Unknown";
  const getAssetName = (id: number) =>
    assets.find((a) => a.id === id)?.name || "Unknown";

  const markCompleted = (id: number) => {
    setData((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: "Completed" } : rec))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Maintenance Records
      </h2>
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Asset Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Assigned User
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Issue
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Reported Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Technician
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Expected Completion
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Cost ($)
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {data.map((rec) => (
              <tr
                key={rec.id}
                className="hover:bg-green-50 dark:hover:bg-green-900/30 transition"
              >
                <td className="px-4 py-3">{getAssetName(rec.assetId)}</td>
                <td className="px-4 py-3">{getCategoryName(rec.categoryId)}</td>
                <td className="px-4 py-3">{getUserName(rec.assignedUserId)}</td>
                <td className="px-4 py-3">{rec.issue}</td>
                <td className="px-4 py-3">{rec.reportedDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[rec.status]
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-4 py-3">{rec.technician}</td>
                <td className="px-4 py-3">{rec.expectedCompletion}</td>
                <td className="px-4 py-3">{rec.cost}</td>
                <td className="px-4 py-3 space-x-2">
                  {rec.status !== "Completed" && (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition text-xs font-medium"
                      onClick={() => markCompleted(rec.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-8 text-gray-400 dark:text-gray-500 italic"
                >
                  No maintenance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceTable;

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/Components/ui/card";
// import { useState, useEffect } from "react";
// import { FaCheck } from "react-icons/fa";
// import { PiGridFour } from "react-icons/pi";
// import { RiAddFill } from "react-icons/ri";
// import { BsPersonFill } from "react-icons/bs";
// import { HiDocumentReport } from "react-icons/hi";
// import { PiKeyReturnBold } from "react-icons/pi";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router";

// function useCountUp(target: number, duration = 1000) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     let start = 0;
//     const increment = target / (duration / 16);
//     let raf: number;
//     function animate() {
//       start += increment;
//       if (start < target) {
//         setCount(Math.floor(start));
//         raf = requestAnimationFrame(animate);
//       } else {
//         setCount(target);
//       }
//     }
//     animate();
//     return () => cancelAnimationFrame(raf);
//   }, [target, duration]);
//   return count;
// }

// const TOTAL_ASSETS = 128;
// const ASSIGNED_ASSETS = 75;
// const MAINTENANCE_ASSETS = 40;

// const activities = [
//   {
//     icon: BsPersonFill,
//     message: "Laptop assigned to Ram",
//     time: "5 min ago",
//   },
//   {
//     icon: PiKeyReturnBold,
//     message: "Mouse returned by Sita",
//     time: "1 hr ago",
//   },
//   {
//     icon: BsPersonFill,
//     message: "Chair assigned to Hari",
//     time: "2 days ago",
//   },
//   {
//     icon: PiKeyReturnBold,
//     message: "Printer returned by Gita",
//     time: "4 hrs ago",
//   },
// ];

// const chartData = [
//   { name: "Assigned", value: ASSIGNED_ASSETS },
//   { name: "Maintenance", value: MAINTENANCE_ASSETS },
//   {
//     name: "Available",
//     value: TOTAL_ASSETS - ASSIGNED_ASSETS - MAINTENANCE_ASSETS,
//   },
// ];

// const COLORS = ["#6366f1", "#22c55e", "#fbbf24"];

// const Statistics = () => {
//   // const [darkMode, setDarkMode] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("latest");
//   const navigate = useNavigate();

//   // Always generate a new key on every render for PieChart animation on refresh
//   const chartKey = Date.now();

//   const totalAssets = useCountUp(TOTAL_ASSETS);
//   const assignedAssets = useCountUp(ASSIGNED_ASSETS);
//   const maintenanceAssets = useCountUp(MAINTENANCE_ASSETS);

//   const assignedPercent = Math.round((ASSIGNED_ASSETS / TOTAL_ASSETS) * 100);
//   const maintenancePercent = Math.round(
//     (MAINTENANCE_ASSETS / TOTAL_ASSETS) * 100
//   );

//   const filteredActivities = activities
//     .filter((a) => a.message.toLowerCase().includes(search.toLowerCase()))
//     .sort(() => (filter === "latest" ? -1 : 1));

//   return (
//     <div className="min-h-screen py-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-100 dark:from-gray-400 dark:via-slate-300 dark:to-blue-750 transition-colors duration-500">
//       <Navbar />
//       {/* Top Controls */}

//       <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-6 gap-4">
//         <span className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Search activities..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none"
//           >
//             <option value="latest">Latest</option>
//             <option value="oldest">Oldest</option>
//           </select>
//         </div>
//       </div>
//       {/* Stats Cards */}

//       <div className="flex  px-15 gap-30 mt-5 ">
//         {/* Total Assets */}
//         <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
//           <CardHeader>
//             <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//             <div className="flex items-center gap-4">
//               <PiGridFour className="text-3xl  text-green-600 dark:text-white drop-shadow-lg" />
//               <div>
//                 <h1 className="text-lg font-semibold  text-black dark:text-white">
//                   Total Assets
//                 </h1>
//                 <h3 className="font-bold  text-black dark:text-white px-1 text-3xl tabular-nums">
//                   {totalAssets}
//                 </h3>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="w-full text-black dark:bg-gray-700 rounded-full h-2 mt-2">
//               <div
//                 className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
//                 style={{ width: "100%" }}
//               ></div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <span className="text-xs text-black dark:text-card-foreground flex items-center gap-1">
//               <span className="inline-block bg-green-100 dark:text-black text-green-700   px-2 py-0.5 rounded-full font-semibold">
//                 100%
//               </span>
//               total assets
//             </span>
//           </CardFooter>
//         </Card>
//         {/* Assigned Assets */}
//         <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
//           <CardHeader>
//             <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//             <div className="flex items-center gap-4">
//               <BsPersonFill className="text-3xl text-green-600 dark:text-white drop-shadow-lg" />
//               <div>
//                 <h1 className="text-lg font-semibold text-black dark:text-white">
//                   Assigned Assets
//                 </h1>
//                 <h3 className="font-bold text-black dark:text-white  text-3xl tabular-nums">
//                   {assignedAssets}
//                 </h3>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="w-full  bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
//               <div
//                 className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${assignedPercent}%` }}
//               ></div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <span className="text-xs  text-black dark:text-white flex items-center gap-1">
//               <span className="inline-block bg-green-100 dark:text-black text-green-700  px-2 py-0.5 rounded-full font-semibold">
//                 {assignedPercent}%
//               </span>
//               assigned
//             </span>
//           </CardFooter>
//         </Card>
//         {/* Maintenance Assets */}
//         <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
//           <CardHeader>
//             <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//             <div className="flex items-center gap-4">
//               <FaCheck className="text-3xl text-green-400 dark:text-white drop-shadow-lg" />
//               <div>
//                 <h1 className="text-lg font-semibold text-black dark:text-white">
//                   Under Maintenance
//                 </h1>
//                 <h3 className="font-bold text-black dark:text-white  text-3xl tabular-nums">
//                   {maintenanceAssets}
//                 </h3>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
//               <div
//                 className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${maintenancePercent}%` }}
//               ></div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <span className="text-xs text-black dark:text-white flex items-center gap-1  ">
//               <span className="inline-block bg-green-100 dark:text-black text-green-700  rounded-full font-semibold px-2 py-0.5">
//                 {maintenancePercent}%
//               </span>
//               under maintenance
//             </span>
//           </CardFooter>
//         </Card>
//       </div>

//       <div>
//         {/* Main Content */}
//         <div className="flex  gap-18 mt-15 px-15 mb-10">
//           {/* Quick Actions */}
//           <Card className=" w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col">
//             <CardHeader>
//               <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//               <div className="flex items-center gap-4">
//                 <RiAddFill className="text-3xl text-green dark:text-white drop-shadow-lg" />
//                 <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                   Quick Actions
//                 </h1>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-6 mt-2">
//                 <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
//                   <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
//                     <RiAddFill className="text-2xl text-green-600" />
//                   </span>
//                   <span className="font-medium">
//                     <p onClick={() => navigate("/assets")}>Add Asset</p>
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
//                   <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
//                     <BsPersonFill className="text-xl text-green-600" />
//                   </span>
//                   <span className="font-medium">
//                     <p onClick={() => navigate("/assets-out")}>Assign Asset</p>
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
//                   <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
//                     <HiDocumentReport className="text-xl text-green-600" />
//                   </span>
//                   <span className="font-medium">Generate Report</span>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>

//           {/* Recent Activities */}
//           <Card className="w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col">
//             <CardHeader>
//               <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//               <div className="flex items-center gap-4">
//                 <BsPersonFill className="text-3xl text-green-600 drop-shadow-lg" />
//                 <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                   Recent Activities
//                 </h1>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-5 mt-2">
//                 {filteredActivities.map(
//                   ({ icon: Icon, message, time }, idx) => (
//                     <li
//                       key={idx}
//                       className="flex gap-3 items-start animate-fade-in"
//                       style={{
//                         animationDelay: `${idx * 0.1 + 0.2}s`,
//                         animationFillMode: "forwards",
//                       }}
//                     >
//                       <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full flex items-center justify-center">
//                         <Icon className="text-xl text-green-600" />
//                       </span>
//                       <div>
//                         <p className="text-gray-700 dark:text-gray-300 font-medium hover:text-green-600 cursor-pointer">
//                           {message}
//                         </p>
//                         <p className="text-sm text-gray-400 dark:text-gray-500">
//                           {time}
//                         </p>
//                       </div>
//                     </li>
//                   )
//                 )}
//                 {filteredActivities.length === 0 && (
//                   <li className="text-gray-400 dark:text-gray-500 italic">
//                     No activities found.
//                   </li>
//                 )}
//               </ul>
//             </CardContent>
//           </Card>

//           {/* Charts */}
//           <Card className="w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col px-2">
//             <CardHeader>
//               <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
//               <div className="flex items-center gap-4">
//                 <PiGridFour className="text-3xl text-green-600 drop-shadow-lg" />
//                 <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                   Asset Distribution
//                 </h1>
//               </div>
//             </CardHeader>
//             <CardContent className="w-full flex flex-col items-center">
//               <ResponsiveContainer width="100%" height={180}>
//                 <PieChart key={chartKey}>
//                   <Pie
//                     data={chartData}
//                     dataKey="value"
//                     outerRadius={60}
//                     label={({ name, value }) => `${name}: ${value}`}
//                     isAnimationActive={true}
//                   >
//                     {chartData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//               <ResponsiveContainer width="100%" height={120} className="mt-6">
//                 <BarChart data={chartData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#22c55e" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {filteredActivities.length === 0 && (
//           <>
//             <li className="text-gray-400 dark:text-gray-500 italic">
//               No activities found.
//             </li>
//           </>
//         )}
//       </div>

//       {/* Fade-in animation for activities */}
//       <style>
//         {`
//                 @keyframes fade-in {
//                   from { opacity: 0; transform: translateY(20px);}
//                   to { opacity: 1; transform: translateY(0);}
//                 }
//                 .animate-fade-in {
//                   animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
//                 }
//               `}
//       </style>
//     </div>
//   );
// };

// export default Statistics;

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { PiGridFour } from "react-icons/pi";
import { RiAddFill } from "react-icons/ri";
import { BsPersonFill, BsLightningCharge } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { PiKeyReturnBold } from "react-icons/pi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function useCountUp(target: number, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;
    function animate() {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

const TOTAL_ASSETS = 128;
const ASSIGNED_ASSETS = 75;
const MAINTENANCE_ASSETS = 40;

const activities = [
  {
    icon: BsPersonFill,
    message: "Laptop assigned to Ram",
    time: "5 min ago",
    color: "text-blue-500",
  },
  {
    icon: PiKeyReturnBold,
    message: "Mouse returned by Sita",
    time: "1 hr ago",
    color: "text-green-500",
  },
  {
    icon: BsPersonFill,
    message: "Chair assigned to Hari",
    time: "2 days ago",
    color: "text-blue-500",
  },
  {
    icon: PiKeyReturnBold,
    message: "Printer returned by Gita",
    time: "4 hrs ago",
    color: "text-green-500",
  },
  {
    icon: FaTools,
    message: "Monitor sent for maintenance",
    time: "1 day ago",
    color: "text-yellow-500",
  },
];

const chartData = [
  { name: "Assigned", value: ASSIGNED_ASSETS },
  { name: "Maintenance", value: MAINTENANCE_ASSETS },
  {
    name: "Available",
    value: TOTAL_ASSETS - ASSIGNED_ASSETS - MAINTENANCE_ASSETS,
  },
];

const COLORS = ["#6366f1", "#22c55e", "#fbbf24"];

const Statistics = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("latest");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const totalAssets = useCountUp(TOTAL_ASSETS);
  const assignedAssets = useCountUp(ASSIGNED_ASSETS);
  const maintenanceAssets = useCountUp(MAINTENANCE_ASSETS);

  const assignedPercent = Math.round((ASSIGNED_ASSETS / TOTAL_ASSETS) * 100);
  const maintenancePercent = Math.round(
    (MAINTENANCE_ASSETS / TOTAL_ASSETS) * 100
  );

  const filteredActivities = activities
    .filter((a) => a.message.toLowerCase().includes(search.toLowerCase()))
    .sort(() => (filter === "latest" ? -1 : 1));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 transition-colors duration-500">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200 dark:bg-blue-900 opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          {/* <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            Asset Dashboard
          </h1> */}

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {["overview", "analytics", "reports"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-800 shadow-md text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 transition-all"
            />
            <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
              <BsLightningCharge className="text-lg" />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Assets */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <PiGridFour className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      Total Assets
                    </h1>
                    <h3 className="font-bold text-3xl text-gray-800 dark:text-white tabular-nums">
                      {totalAssets}
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: "100%" }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                    100%
                  </span>
                  of total inventory
                </span>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Assigned Assets */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50">
                    <BsPersonFill className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      Assigned Assets
                    </h1>
                    <h3 className="font-bold text-3xl text-gray-800 dark:text-white tabular-nums">
                      {assignedAssets}
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${assignedPercent}%` }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                    {assignedPercent}%
                  </span>
                  currently assigned
                </span>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Maintenance Assets */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                    <FaTools className="text-2xl text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      Under Maintenance
                    </h1>
                    <h3 className="font-bold text-3xl text-gray-800 dark:text-white tabular-nums">
                      {maintenanceAssets}
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${maintenancePercent}%` }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <span className="inline-block bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
                    {maintenancePercent}%
                  </span>
                  in maintenance
                </span>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <RiAddFill className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Quick Actions
                  </h1>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition group"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition">
                      <RiAddFill className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <span
                      className="font-medium"
                      onClick={() => navigate("/assets")}
                    >
                      Add New Asset
                    </span>
                    <div className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.li>

                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition group"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition">
                      <BsPersonFill className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <span
                      className="font-medium"
                      onClick={() => navigate("/assets-out")}
                    >
                      Assign Asset
                    </span>
                    <div className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.li>

                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition group"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition">
                      <HiDocumentReport className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">Generate Report</span>
                    <div className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.li>

                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition group"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition">
                      <FaTools className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">Request Maintenance</span>
                    <div className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                      <BsPersonFill className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      Recent Activities
                    </h1>
                  </div>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View All
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <AnimatePresence>
                    {filteredActivities.map(
                      ({ icon: Icon, message, time, color }, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                          className="flex gap-3 items-start p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50 transition"
                        >
                          <div
                            className={`p-2 rounded-lg ${color} bg-opacity-20`}
                          >
                            <Icon className="text-xl" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                              {message}
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {time}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </motion.li>
                      )
                    )}
                  </AnimatePresence>

                  {filteredActivities.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-gray-400 dark:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-2">No activities found</p>
                    </motion.div>
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <PiGridFour className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Asset Distribution
                  </h1>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} assets`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          padding: "0.5rem",
                        }}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{
                          paddingTop: "1rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value) => [`${value} assets`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          padding: "0.5rem",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      >
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

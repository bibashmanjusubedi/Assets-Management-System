// import { useState } from "react";
// import {
//   FaAssistiveListeningSystems,
//   FaBoxOpen,
//   FaUserFriends,
// } from "react-icons/fa";
// import { RiLayoutGridLine } from "react-icons/ri";
// import { TbCategoryPlus, TbLayoutDashboardFilled } from "react-icons/tb";
// import { NavLink } from "react-router";

// import { cn } from "@/lib/utils";
// import { RiAddLargeLine } from "react-icons/ri";
// import logo from "../assets/logo.png";

// const HamburgerIcon = () => (
//   <span
//     title="Toggle sidebar"
//     className="flex flex-col justify-center items-center w-10 h-6"
//   >
//     <span className="block w-5 h-0.5 bg-gray-700 mb-1 rounded"></span>
//     <span className="block w-5 h-0.5 bg-gray-700 mb-1 rounded"></span>
//     <span className="block w-5 h-0.5 bg-gray-700 rounded"></span>
//   </span>
// );

// const sideLinks = [
//   {
//     name: "Dashboard",
//     link: "/",
//     icon: TbLayoutDashboardFilled,
//   },
//   {
//     name: "Assets",
//     link: "/assets",
//     icon: RiLayoutGridLine,
//   },
//   {
//     name: "Categories",
//     link: "/categories",
//     icon: TbCategoryPlus,
//   },
//   {
//     name: "Users",
//     link: "/users",
//     icon: FaUserFriends,
//   },
//   {
//     name: "Assets Details",
//     link: "/assets-details",
//     icon: FaBoxOpen,
//   },
//   {
//     name: "Assets Out",
//     link: "/assets-out",
//     icon: FaAssistiveListeningSystems,
//   },
//   {
//     name: "Create Newuser",
//     link: "/newUsers",
//     icon: RiAddLargeLine,
//   },
// ];

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div
//       className={`min-h-screen relative ${
//         collapsed ? "w-20" : ""
//       } border-1 border-gray-200 shadow-xl dark:bg-gray-700 backdrop-blur-lg transition-all duration-300`}
//       style={{
//         background:
//           "linear-gradient(135deg, rgba(236,245,255,0.85) 60%, rgba(186,230,253,0.7) 100%)",
//       }}
//     >
//       <button
//         className="absolute top-4 right-0 p- rounded hover:bg-gray-200 z-20 flex items-center justify-center"
//         onClick={() => setCollapsed((prev) => !prev)}
//         aria-label="Toggle sidebar"
//       >
//         <HamburgerIcon />
//       </button>

//       <div className={`pt-1 ${collapsed ? "px-2" : "px-2"}`}>
//         <div
//           className={`flex gap-2 mt-10 mb-10 ${
//             collapsed ? "justify-center" : ""
//           }`}
//         >
//           <img
//             src={logo}
//             alt="Logo"
//             className={`object-contain rounded-full shadow ${
//               collapsed ? "w-10 h-10" : "w-15 h-15"
//             }`}
//           />
//           {!collapsed && (
//             <h1 className="text-1.5xl py-2 font-bold  text-green-400 mb-2">
//               <span className="hidden md:flex leading-tight font-serif ">
//                 Assets <br /> Management
//               </span>
//               <span className="md:hidden">AM</span>
//             </h1>
//           )}
//         </div>

//         <div className="flex flex-col items-start">
//           <div className="mt-4 flex items-start md:items-start flex-col space-y-1 ">
//             {sideLinks.map((l) => {
//               return (
//                 <NavLink
//                   key={l.link}
//                   to={l.link}
//                   // className={`group flex justify-start  w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative
//                   // ${
//                   //   isActive
//                   //     ? "bg-blue-100 text-green-400 font-semibold shadow"
//                   //     : "hover:bg-blue-50 hover:text-green-200 text-gray-700"
//                   // }`}
//                   className={({ isActive }) =>
//                     cn(
//                       "group flex  justify-start  w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
//                       isActive
//                         ? "bg-blue-100 peer/active text-green-400 hover:text-green-800 font-semibold shadow"
//                         : "hover:bg-blue-50 peer/inactive hover:text-green-800 text-gray-700"
//                     )
//                   }
//                   title={l.name}
//                 >
//                   <span
//                     className={`text-xl  transition-transform duration-200 group-hover:scale-125 group-hover:duration-300 group-hover:text-green-800`}
//                   >
//                     <l.icon />
//                   </span>
//                   {!collapsed && (
//                     <span className="hidden group-hover:ml-1 duration-200 md:inline">
//                       {l.name}
//                     </span>
//                   )}
//                   {/* Tooltip for collapsed sidebar */}
//                   {collapsed && (
//                     <span className="absolute left-16 bg-green-400 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
//                       {l.name}
//                     </span>
//                   )}
//                   {/* Tooltip for mobile */}
//                   {!collapsed && (
//                     <span className="md:hidden absolute  bg-green-400 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
//                       {l.name}
//                     </span>
//                   )}
//                 </NavLink>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import {
  FaAssistiveListeningSystems,
  FaBoxOpen,
  FaUserFriends,
  FaTools,
} from "react-icons/fa";
import { RiLayoutGridLine } from "react-icons/ri";
import { TbCategoryPlus, TbLayoutDashboardFilled } from "react-icons/tb";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RiAddLargeLine } from "react-icons/ri";
import logo from "../assets/logo.png";

const HamburgerIcon = ({ collapsed }: { collapsed: boolean }) => (
  <motion.span
    title="Toggle sidebar"
    className="flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span
      className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
        collapsed ? "w-4 mb-1" : "w-5 mb-1.5"
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
        collapsed ? "w-4 mb-1" : "w-5 mb-1.5"
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
        collapsed ? "w-4" : "w-5"
      }`}
    ></span>
  </motion.span>
);

const sideLinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: TbLayoutDashboardFilled,
    color: "text-blue-500",
  },
  {
    name: "Assets",
    link: "/assets",
    icon: RiLayoutGridLine,
    color: "text-green-500",
  },
  {
    name: "Categories",
    link: "/categories",
    icon: TbCategoryPlus,
    color: "text-purple-500",
  },
  {
    name: "Users",
    link: "/users",
    icon: FaUserFriends,
    color: "text-amber-500",
  },
  {
    name: "Assets Details",
    link: "/assets-details",
    icon: FaBoxOpen,
    color: "text-cyan-500",
  },
  {
    name: "Assets Out",
    link: "/assets-out",
    icon: FaAssistiveListeningSystems,
    color: "text-pink-500",
  },
  {
    name: "Maintenance",
    link: "/maintenance",
    icon: FaTools,
    color: "text-yellow-500",
  },
  {
    name: "Create New User",
    link: "/newUsers",
    icon: RiAddLargeLine,
    color: "text-red-500",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <motion.div
      className={`min-h-screen relative ${
        collapsed ? "w-20" : "w-64"
      } border-r border-gray-200 dark:border-gray-600 shadow-xl dark:bg-gray-800 backdrop-blur-lg transition-all duration-300`}
      style={{
        background:
          "linear-gradient(135deg, rgba(236,245,255,0.95) 60%, rgba(186,230,253,0.85) 100%)",
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="absolute top-4 -right-5 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg z-20 flex items-center justify-center border border-gray-200 dark:border-gray-600"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle sidebar"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <HamburgerIcon collapsed={collapsed} />
      </motion.button>

      <div className={`pt-1 ${collapsed ? "px-2" : "px-4"}`}>
        <motion.div
          className={`flex gap-3 items-center mt-10 mb-10 ${
            collapsed ? "justify-center" : "justify-start"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src={logo}
            alt="Logo"
            className={`object-contain rounded-full shadow ${
              collapsed ? "w-10 h-10" : "w-12 h-12"
            }`}
            whileHover={{ rotate: 10 }}
          />
          {!collapsed && (
            <motion.h1
              className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Asset Management
            </motion.h1>
          )}
        </motion.div>

        <div className="flex flex-col items-start mt-6">
          <div className="w-full flex flex-col space-y-2">
            {sideLinks.map((l, index) => (
              <motion.div
                key={l.link}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <NavLink
                  to={l.link}
                  title={l.name}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center w-full gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? // ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium shadow-inner"
                          // : "hover:bg-blue-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                          "bg-blue-100 peer/active text-green-400 hover:text-green-800 font-semibold shadow"
                        : "hover:bg-blue-50 peer/inactive hover:text-green-800 text-gray-700"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.span
                        className={`text-xl ${l.color} transition-transform duration-200`}
                        animate={{
                          scale: hoveredItem === index ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <l.icon />
                      </motion.span>

                      {!collapsed && (
                        <motion.span
                          className="text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          {l.name}
                        </motion.span>
                      )}

                      {collapsed && (
                        <motion.div
                          className="absolute left-full ml-3 bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium rounded-md px-3 py-2 shadow-lg z-50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: hoveredItem === index ? 1 : 0,
                            x: hoveredItem === index ? 0 : -10,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {l.name}
                          <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-700 rotate-45 -left-1.5 top-1/2 -translate-y-1/2 -z-10" />
                        </motion.div>
                      )}

                      {isActive && !collapsed && (
                        <motion.div
                          className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full"
                          layoutId="activeDot"
                        />
                      )}
                    </>
                  )}
                </NavLink>

                {hoveredItem === index && !collapsed && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                    layoutId="hoverBg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar footer */}
        {!collapsed && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              v1.0.0 • AssetFlow
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;

// import { useEffect, useState } from "react";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import BusCard from "../components/BusCard";

// export default function UserDashboard() {
//   const [buses, setBuses] = useState([]);
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   const fetchBuses = async () => {
//     try {
//       const res = await API.get("/buses");
//       setBuses(res.data);
//     } catch {
//       alert("Failed to load buses");
//     }
//   };

//   return (
//     <>
//       <Navbar
//         active="buses"
//         onLogout={() => {
//           localStorage.clear();
//           window.location.href = "/";
//         }}
//       />

//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>User Dashboard</h2>
//           <p style={styles.sub}>Welcome, {email}</p>

//           {/* 🔥 Card wrapper to control spacing */}
//           <div style={styles.listWrapper}>
//             {buses.map((bus) => (
//               <BusCard
//                 key={bus._id}
//                 bus={bus}
//                 onSeatBooked={fetchBuses}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   page: {
//     background: "linear-gradient(180deg, #2C3333 0%, #1f2424 100%)",
//     minHeight: "100vh",
//     padding: "40px 0",
//     display: 'flex',
//   justifyContent: 'center', // Centers horizontally
//   alignItems: 'center',
//   },

//   container: {
//     width: "100%",
//     maxWidth: "1400px",
//     margin: "0 auto",
//     padding: "0 32px",
//   },

//   heading: {
//     color: "#E7F6F2",
//     marginBottom: "6px",
//   },

//   sub: {
//     color: "#A5C9CA",
//     marginBottom: "28px",
//   },

//   listWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
// };
import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import BusCard from "../components/BusCard";

export default function UserDashboard() {
  const [buses, setBuses] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch {
      alert("Failed to load buses");
    }
  };

  return (
    <>
      <Navbar
        active="buses"
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>User Dashboard</h2>
          <p style={styles.sub}>Welcome, {email}</p>

          {/* 🔥 Card wrapper to control spacing */}
          <div style={styles.listWrapper}>
            {buses.map((bus) => (
              <BusCard
                key={bus._id}
                bus={bus}
                onSeatBooked={fetchBuses}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    background: "linear-gradient(180deg, #2C3333 0%, #1f2424 100%)",
    minHeight: "100vh",
    padding: "40px 0",
  },

  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 32px",
  },

  heading: {
    color: "#E7F6F2",
    marginBottom: "6px",
  },

  sub: {
    color: "#A5C9CA",
    marginBottom: "28px",
  },

  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

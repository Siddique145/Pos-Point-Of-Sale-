// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import { auth, db } from "../utilis/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router";
// import { Spin } from "antd";

// export const AuthContext = createContext();

// function AuthContextProvider({ children }) {
//   const [user, setUser] = useState({ isLogin: false });
//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     const subscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const userInfo = (await getDoc(docRef)).data();
//         console.log("userInfo=>", userInfo);
//         setUser({
//           isLogin: true,
//           ...userInfo,
//         });
//         setLoader(false);
//       } else {
//         setUser({ isLogin: false });
//         setLoader(false);
//       }
//     });
//     return subscribe;
//   }, []);
//   return (
//     <AuthContext.Provider value={{ user }}>
//       {loader ? (
//         <div
//           className="flex h-screen
//       justify-center items-center"
//         >
//           <Spin />{" "}
          
//         </div>
//       ) : (
//         children
//       )}
//     </AuthContext.Provider>
//   );
// }

// export default AuthContextProvider; 














import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../utilis/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Spin } from "antd";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null); // For handling error

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userInfo = (await getDoc(docRef)).data();
        if (userInfo) {
          setUser({
            isLogin: true,
            ...userInfo,
          });
        } else {
          setError("This user does not exist."); // Set error if user data doesn't exist
        }
        setLoader(false);
      } else {
        setUser({ isLogin: false });
        setLoader(false);
      }
    });
    return subscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, error }}>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Spin />
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

// import { message } from "antd";
// import { collection, getDocs } from "firebase/firestore";
// import { createContext, useEffect, useState } from "react";
// import { db } from "../utilis/firebase";

// export const ProductContext = createContext();

// function ProductContextProvider({ children }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getProductsFromDB();
//   }, []);

//   const getProductsFromDB = async () => {
//     try {
//       setLoading(true);
//       const ref = collection(db, "products");
//       const productData = await getDocs(ref);
//       if (!productData.empty) {
//         const allProducts = productData.docs.map((product) => ({
//           ...product.data(),
//           id: product.id,
//         }));
//         setProducts(allProducts);
//       }
//     } catch (err) {
//       message.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProduct = async (id, quantity) => {
//     const productIndex = products.findIndex((data) => data.id === id);
//     if (productIndex !== -1) {
//       products[productIndex].quantity = quantity;
//       setProducts([...products]);
//     }
//   };

//   return (
//     <ProductContext.Provider value={{ products, setProducts, updateProduct }}>
//       {loading ? <div>...</div> : children}
//     </ProductContext.Provider>
//   );
// }

// export default ProductContextProvider;
import { message, Spin } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../utilis/firebase";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsFromDB();
  }, []);

  const getProductsFromDB = async () => {
    try {
      setLoading(true);
      const ref = collection(db, "products");
      const productData = await getDocs(ref);
      if (!productData.empty) {
        const allProducts = productData.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allProducts);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, quantity) => {
    const productIndex = products.findIndex((data) => data.id === id);
    if (productIndex !== -1) {
      products[productIndex].quantity = quantity;
      setProducts([...products]);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateProduct }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;

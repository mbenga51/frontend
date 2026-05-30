// fetch products
useEffect(()=>{
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      console.log("product.",response.data)
    } catch (error) {

      console.log(error);
      alert("Failed to fetch products");
    }
  };
  fetchProducts();
}, []);
import axios from 'axios';
import React from 'react'
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';

const SubCategories = () => {



    async function getSubcategories(categoryId) {
        const {data} = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        console.log(data.data.subcategories);
    
        return data.data.subcategories;
      }
    
      const { data, isLoading, error } = useQuery("products", getProducts);
    
      if (isLoading) {
        return (
          <div className="h-screen bg-emerald-700 flex flex-wrap justify-center items-center">
            <Bars
              height="80"
              width="80"
              color="#fff"
              ariaLabel="bars-loading"
              visible={true}
            />
          </div>
        );
      }
    
      if (error) {
        return <div>Error loading products!</div>;
      }
  return (
    <div>SubCategories</div>
  )
}

export default SubCategories
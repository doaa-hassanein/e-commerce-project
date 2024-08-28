import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {


    if(localStorage.getItem("tkn") == null){
        return (
            // navigate to login page
           <Navigate to="/login" />
        )
    }
    return (

        <>
        {children}

        </>
      );
}

export default ProtectedRoute;
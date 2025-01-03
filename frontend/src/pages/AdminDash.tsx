import { useNavigate } from "react-router-dom";
import Dashboard from "../packages/components/Dashbord";

const  AdminDash = () => {

    const navigate = useNavigate();

return <>
    <Dashboard DashboardProps={{user: "admin", navLinks: [
         {label: "Logout", link: "#", onClick: () => {
            localStorage.removeItem("authToken");
            navigate("/")
            alert("Logged out succesfully")
          }}
    ]}} />
</>
}

export default AdminDash
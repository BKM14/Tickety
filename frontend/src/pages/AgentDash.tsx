import { useNavigate } from "react-router-dom";
import Dashboard from "../packages/components/Dashbord";

const  AgentDash = () => {

    const navigate = useNavigate();

return <>
    <Dashboard DashboardProps={{user: "agent", navLinks: [
         {label: "Logout", link: "#", onClick: () => {
            localStorage.removeItem("authToken");
            navigate("/")
            alert("Logged out succesfully")
          }}
    ]}} />
</>
}

export default AgentDash
import { HeaderProps } from "../packages/components/HeaderSimple";
import { FormProps } from "../packages/components/CreateForm";
import Dashboard from "../packages/components/Dashbord";
import { useNavigate } from "react-router-dom";

const UserDash = () => {

    const navigate = useNavigate();

    const links: HeaderProps = {
      linksArray: [
        { link: "#", label: "Create Ticket"},
        { label: "Logout", link: "#", onClick: () => {
          localStorage.removeItem("authToken");
          navigate("/")
          alert("Logged out succesfully")
        }}
      ],
      user: "user"
    }
    ;

    const props: FormProps = {
        inputs: [ 
            {label: "Title", placeholder: "Summarize the issue", key: "title"},
        ],
        textareas: [
            {label: "Description", placeholder: "Please describe the issue in detail", key: "description"}
        ],
        selects: [
            {label: "Issue Type", description: "What is the type of the issue?", key: "issueType", data: ["Select", "Bug", "Feature Request", "Access Issue", "Other"]},
            {label: "Urgency Level", description: "How urgent is this issue?", key: "urgencyType", data: ["Select", "Low", "Medium", "High", "Critical"]}
        ],
        checkbox: false,
        submitLabel: "Submit Ticket",
        fileInputs: [
          {
            key: "screenshot_links",
            label: "Screenshots",
            description: "Attach a screenshot of the issue",
            placeholder: "Click to select",
            accept: "image/png, image/jpeg",
            multiple: true
          }
        ]
    }

    return (
        <>
          <Dashboard DashboardProps={{
            navLinks: links.linksArray,
            user: links.user,
            formProps: props,
          }}/>
        </>
    );
  };
  
export default UserDash;
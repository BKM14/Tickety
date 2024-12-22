import { HeaderProps } from "../packages/components/HeaderSimple";
import { FormProps } from "../packages/components/CreateForm";
import Dashboard from "../packages/components/Dashbord";

const UserDash = () => {

    const links: HeaderProps = {
      linksArray: [
        { link: "#", label: "Create Ticket"}
      ],
      isUser: true
    }
    ;

    const props: FormProps = {
        inputs: [
            {label: "Name", placeholder: "John Doe", key: "name"},
            {label: "Email", placeholder: "john@gmail.com", key: "email"},
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
    }

    return (
        <>
          <Dashboard DashboardProps={{
            navLinks: links.linksArray,
            isUser: links.isUser,
            formProps: props,
          }}/>
        </>
    );
  };
  
export default UserDash;
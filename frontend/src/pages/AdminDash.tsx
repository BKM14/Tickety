import  { Issue } from "../packages/components/CreateTable";
import Dashboard from "../packages/components/Dashbord";

const  AdminDash = () => {

    const issues: Issue[] = [
            {
              email: "john@gmail.com",
              issueDescription:
                'I tried resetting my password through the "Forgot Password" link on the login page, but I’m not receiving any reset email. I checked my spam folder and verified that my email address is correct. The issue has persisted for the last 24 hours, and I am unable to access my account.',
              issueTitle: "Unable to reset my password",
              issueType: "Bug",
              name: "John Doe",
              urgencyType: "High",
            },
            {
              email: "jane.smith@example.com",
              issueDescription:
                "I cannot access the premium features even though I recently upgraded my account. My billing shows a successful payment. Please resolve this as soon as possible.",
              issueTitle: "Premium features not accessible",
              issueType: "Access Issue",
              name: "Jane Smith",
              urgencyType: "Critical",
            },
            {
              email: "mike.brown@example.com",
              issueDescription:
                "I would like to request a feature that allows users to schedule reports to be generated and emailed automatically on a weekly or monthly basis.",
              issueTitle: "Feature request for scheduled reports",
              issueType: "Feature Request",
              name: "Mike Brown",
              urgencyType: "Medium",
            },
            {
              email: "emily.wilson@example.com",
              issueDescription:
                "The website's dashboard loads very slowly on my computer. I have tried clearing my cache and switching browsers, but the issue persists.",
              issueTitle: "Slow loading dashboard",
              issueType: "Bug",
              name: "Emily Wilson",
              urgencyType: "Low",
            },
            {
              email: "david.jones@example.com",
              issueDescription:
                "I am unable to delete a file that I accidentally uploaded. The delete button is unresponsive, and I tried different browsers with no success.",
              issueTitle: "Unable to delete uploaded file",
              issueType: "Bug",
              name: "David Jones",
              urgencyType: "High",
            },
            {
              email: "sarah.miller@example.com",
              issueDescription:
                "I need access to the admin panel for managing user accounts, but I am getting an authorization error despite having the required permissions.",
              issueTitle: "Authorization error on admin panel",
              issueType: "Access Issue",
              name: "Sarah Miller",
              urgencyType: "Critical",
            },
            {
              email: "oliver.clark@example.com",
              issueDescription:
                "The UI is difficult to use on smaller screens. Buttons and text overlap, making it hard to navigate and complete tasks on my mobile device.",
              issueTitle: "UI issues on mobile devices",
              issueType: "Bug",
              name: "Oliver Clark",
              urgencyType: "Medium",
            },
            {
              email: "emma.davis@example.com",
              issueDescription:
                "I would like to suggest adding a dark mode feature to the platform. It would be helpful for working late at night and reducing eye strain.",
              issueTitle: "Request for dark mode feature",
              issueType: "Feature Request",
              name: "Emma Davis",
              urgencyType: "Low",
            },
            {
              email: "lucas.lee@example.com",
              issueDescription:
                "The search functionality does not return relevant results when I search for specific terms. It seems to be case-sensitive and does not account for typos.",
              issueTitle: "Search functionality issues",
              issueType: "Bug",
              name: "Lucas Lee",
              urgencyType: "High",
            },
            {
              email: "mia.taylor@example.com",
              issueDescription:
                "I am unable to download invoices from the billing section. The download button is greyed out, and no error message is displayed.",
              issueTitle: "Unable to download invoices",
              issueType: "Bug",
              name: "Mia Taylor",
              urgencyType: "Medium",
            },
          ];

    return <Dashboard DashboardProps={{
        isUser: false,
        tableElements: issues,
    }}/>
}

export default AdminDash
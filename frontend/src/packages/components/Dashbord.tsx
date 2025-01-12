import { useState, useEffect } from "react";
import CreateTable, { Issue } from "./CreateTable"
import { HeaderProps, HeaderSimple } from "./HeaderSimple"
import { Modal } from "@mantine/core";
import CreateForm, { FormProps } from "./CreateForm";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../../api";

interface DashboardPropsInterface {
    navLinks?: HeaderProps['linksArray'],
    user: "user" | "admin" | "agent",
    formProps?: FormProps,
}

const Dashboard = ({DashboardProps}: {DashboardProps: DashboardPropsInterface}) => {
    
    const [modalOpened, setModalOpened] = useState(false);
    const [tableElements, setTableElements] = useState<Issue[]>([]);
    const navigate = useNavigate();

    const ticketStatus = ["Open",  "In Progress",  "Resolved", "Closed"]
    const [agents, setAgents] = useState<string[]>([]);

    const addTableElements = async (newElement: Issue) => {

        const authToken = localStorage.getItem("authToken");

        if (!authToken) navigate("/");
        await post({
            url: "/api/user/create-ticket/",
            payload: newElement,
            customHeaders: {
                "Authorization": `Bearer ${authToken}`
            },
            customErrorMessage: "Error creating new ticket"
        })

        setTableElements(tableElements => [...tableElements, newElement])
    }
    
    const updateElementState = async(index: number, {newState, agent_id }: {newState?: Issue['status'], agent_id?: string}) => {

        const ticketId = tableElements[index].id;
        const authToken = localStorage.getItem("authToken");

        if (!authToken) navigate("/");

        await put({
            url: `/api/admin/${ticketId}/${agent_id ? "assign_agent/" : "change_status/"}`,
            customHeaders: {
                 'Authorization': `Bearer ${authToken}`
            },
            customErrorMessage: "Error updating ticket status",
            payload: agent_id ? {agent_id} : {status: newState}
        })
    }

    useEffect(() => {

        const authToken = localStorage.getItem("authToken");

        if (!authToken) navigate("/");

        const fetchDataFromDB = async () => await get({
            url: `/api/${DashboardProps.user === "user" ? 'user/user-tickets/' : DashboardProps.user === "admin" ? "admin/" : "agents/"}`,
            customHeaders: {
                'Authorization': `Bearer ${authToken}`
            },
            customErrorMessage: "Failed to fetch tickets"
        })

        fetchDataFromDB().then((data: Issue[]) => setTableElements(data))
  
        if (DashboardProps.user === "admin") {

            const getAgents = async () => await get({
                url: "/api/agents/",
                customHeaders: {
                    "Authorization": `Bearer ${authToken}`
                },
                customErrorMessage: "Error fetching agents"
            })

            getAgents().then((data) => {
                setAgents((agents) => [...agents, ...data.map((agent: {email: string}) => agent.email)]);
            });
        }
      }, []);

    if (DashboardProps.user === "user") {
        DashboardProps.navLinks?.map(link => {
            if (link.label == "Create Ticket") link.onClick =  () => setModalOpened(true);
        })
    
        if (DashboardProps.formProps) DashboardProps.formProps.closeOnSubmit = () => setModalOpened(false);
    }

    const greeting = DashboardProps.user === "user" ? "Tickets opened by you" : DashboardProps.user === "agent" ? "Tickets assigned to you" : "All tickets"
    
    return <>
        <HeaderSimple links={{
            linksArray: DashboardProps.navLinks ? DashboardProps.navLinks : [],
            user: DashboardProps.user,
        }}/>

            <div style={{textAlign: "center", fontSize: "48px", fontWeight: 600}}>
                <p>{greeting}</p>
            </div>

        { DashboardProps.user === "user" && DashboardProps.formProps && DashboardProps.navLinks &&  <div>
            <div style={{ width: "50%", margin: "0 auto", textAlign: "center", marginTop: "20px" }}>
                <Modal
                    opened={modalOpened}
                    onClose={() => setModalOpened(false)}
                    title="Submit a New Ticket"
                    centered
                >
                    <CreateForm props={DashboardProps.formProps} addTableElements={addTableElements}/>
                </Modal>
            </div>
        </div>
        }
        <div style={{"width": "80%", margin: "0 auto"}}>
                <CreateTable 
                    issues={tableElements} 
                    user={DashboardProps.user} 
                    updateState={updateElementState}
                    ticketStatusOptions={ticketStatus}
                    agents={agents}
                />
        </div>
    </>
}

export default Dashboard
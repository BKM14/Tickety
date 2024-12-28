import { useState, useEffect } from "react";
import CreateTable, { Issue } from "./CreateTable"
import { HeaderProps, HeaderSimple } from "./HeaderSimple"
import { Modal } from "@mantine/core";
import CreateForm, { FormProps } from "./CreateForm";
import { useNavigate } from "react-router-dom";

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

        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/user/create-ticket/`,{
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(newElement)
        })

        if (!response.ok) throw new Error(`Error creating new ticket: ${response.statusText}`);

        setTableElements(tableElements => [...tableElements, newElement])
    }
    
    const updateElementState = async(index: number, {newState, agent_id }: {newState?: Issue['status'], agent_id?: string}) => {

        const ticketId = tableElements[index].id;
        const authToken = localStorage.getItem("authToken");

        if (!authToken) navigate("/");

        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/admin/${ticketId}/${agent_id ? "assign_agent" : "change_status"}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(agent_id ? {agent_id} : {status: newState})
        })

        if (!response.ok) {
            throw new Error(`Error updating ticket status: ${response.statusText}`);
        }
    }

    useEffect(() => {

        const authToken = localStorage.getItem("authToken");

        if (!authToken) navigate("/");

        const fetchDataFromDB = async () => {
          const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/${DashboardProps.user === "user" ? 'user/user-tickets/' : DashboardProps.user === "admin" ? "admin/" : "agents"}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
          });
          
          if (!response.ok) throw new Error(`Failed to fetch : ${response.statusText}`)
          return await response.json();
        }
  
        fetchDataFromDB().then((data) => setTableElements(data));

        if (DashboardProps.user === "admin") {
            const getAgents = async () => {
                const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/agents/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                })

                if (!response.ok) throw new Error(`Failed to fetch : ${response.statusText}`)
                return await response.json();
            }

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
import { useState, useEffect } from "react";
import CreateTable, { Issue } from "./CreateTable"
import { HeaderProps, HeaderSimple } from "./HeaderSimple"
import { Modal } from "@mantine/core";
import CreateForm, { FormProps } from "./CreateForm";

interface DashboardPropsInterface {
    navLinks?: HeaderProps['linksArray'],
    isUser: boolean,
    formProps?: FormProps,
}

const Dashboard = ({DashboardProps}: {DashboardProps: DashboardPropsInterface}) => {
    
    const [modalOpened, setModalOpened] = useState(false);
    const [tableElements, setTableElements] = useState<Issue[]>([]);

    const addTableElements = async (newElement: Issue) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/tickets/`,{
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newElement, "user": 123})
        })

        if (!response.ok) throw new Error(`Error creating new ticket: ${response.statusText}`);

        setTableElements(tableElements => [...tableElements, newElement])
    }
    
    const updateElementState = async(index: number, newState: Issue['status']) => {

        const ticketId = tableElements[index].id;

        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/tickets/${ticketId}/change_status/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: newState})
        })

        if (!response.ok) {
            throw new Error(`Error updating ticket status: ${response.statusText}`);
        }
    
        const updatedTicket = await response.json();
        console.log("Updated Ticket:", updatedTicket);
    }

    useEffect(() => {
        const fetchDataFromDB = async () => {
          const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/tickets/`, {
            method: "GET"
          })
          
          if (!response.ok) throw new Error(`Failed to fetch : ${response.statusText}`)
          return await response.json();
        }
  
        fetchDataFromDB().then((data) => setTableElements(data));
      }, []);

    if (DashboardProps.isUser) {
        DashboardProps.navLinks?.map(link => {
            if (link.label == "Create Ticket") link.onClick =  () => setModalOpened(true);
        })
    
        if (DashboardProps.formProps) DashboardProps.formProps.closeOnSubmit = () => setModalOpened(false);
    }
    
    return <>
        <HeaderSimple links={{
            linksArray: DashboardProps.navLinks ? DashboardProps.navLinks : [],
            isUser: DashboardProps.isUser,
        }}/>

        { DashboardProps.isUser && DashboardProps.formProps && DashboardProps.navLinks &&  <div>
            <div style={{textAlign: "center", fontSize: "48px", fontWeight: 600}}>
                <p>Tickets opened by you</p>
            </div>
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
                <CreateTable issues={tableElements} isAdmin={!DashboardProps.isUser} updateState={updateElementState}/>
        </div>
    </>
}

export default Dashboard
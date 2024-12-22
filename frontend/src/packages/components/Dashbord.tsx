import { useState } from "react";
import CreateTable, { Issue } from "./CreateTable"
import { HeaderProps, HeaderSimple } from "./HeaderSimple"
import { Modal } from "@mantine/core";
import CreateForm, { FormProps } from "./CreateForm";

interface DashboardPropsInterface {
    navLinks?: HeaderProps['linksArray'],
    tableElements: Issue[],
    isUser: boolean,
    formProps?: FormProps,
}

const Dashboard = ({DashboardProps}: {DashboardProps: DashboardPropsInterface}) => {
    
    const [modalOpened, setModalOpened] = useState(false);
    const [tableElements, setTableElements] = useState<Issue[]>(DashboardProps.tableElements);

    const addTableElements = (newElement: Issue) => {
        setTableElements(tableElements => [...tableElements, newElement])
    }

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
                <CreateTable issues={tableElements} isAdmin={!DashboardProps.isUser}/>
        </div>
    </>
}

export default Dashboard
import { Table, Select, Modal, Button, Image } from '@mantine/core';
import { useState } from 'react';

export interface Issue {
    description: string,
    title: string,
    issueType: string,
    urgencyType: string,
    status?: string,
    id?:number,
    user: string,
    agent_email?: string,
    screenshot_links?: string[]
}

interface TableProps {
  issues: Issue[],
  user: "user" | "admin" | "agent",
  updateState: (index: number , {agent_id, newState} : {agent_id?: string, newState?: Issue['status']}) => void,
  ticketStatusOptions?: string[],
  agents?: string[]
}

function CreateTable({ issues, user, updateState, ticketStatusOptions, agents } : TableProps) {

  const [openedModalIndex, setOpenedModalIndex] = useState<number | null>(null);  
  const open = (index: number) => {
    setOpenedModalIndex(index);
  }
  const close = () => setOpenedModalIndex(null)

  const rows = issues.map((issue, index) => (
    <Table.Tr key={index}>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.description}</Table.Td>
      <Table.Td>
        {issue.screenshot_links && issue.screenshot_links.length > 0 ? (
          <>
          <Modal opened={openedModalIndex === index} onClose={close} title="Issues">
            {issue.screenshot_links.map((screenshot, index) => (
              <Image radius={"sm"} p={2} src={screenshot} key={index}/>
            ))}
          </Modal>
          <Button variant="default" onClick={() => open(index)}>
          View screenshots
          </Button>
          </>
        ): (
          <div className='text-center'>NA</div>
        )}
      </Table.Td>
      {user === "admin" ? (
        <>
        <Table.Td>
         <Select
          data={ticketStatusOptions ? ticketStatusOptions : ["Open",  "In Progress", "Resolved", "Closed"]} 
          defaultValue={issue.status || "Open"}
          placeholder='Status of Ticket'
          onChange={(value) => {
            updateState(index, {newState: value ||  "Open"});
          }}
        />
      </Table.Td>
      <Table.Td>
        <Select
          data={agents} 
          defaultValue={issue.agent_email}
          placeholder='Assign an agent'
          onChange={(value) => {
            if (value) updateState(index, {agent_id: value});
          }}
        />
      </Table.Td>
        </>
    ) : (
    <>
      <Table.Td>{issue.status ? issue.status : "Open"}</Table.Td>
      <Table.Td>{issue.agent_email ? issue.agent_email : "Not Assigned Yet"}</Table.Td>
    </>
  )} 
      {user != "user" && (
              <Table.Td>{issue.user}</Table.Td>
      )}
      <Table.Td>{issue.issueType}</Table.Td>
      <Table.Td>{issue.urgencyType}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table style={{margin: '20px'}} withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Issue Title</Table.Th>
          <Table.Th>Issue Description</Table.Th>
          <Table.Th>Issue Screenshots</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Agent Assigned</Table.Th>
          {user != "user" && (
              <Table.Th>Created By</Table.Th>
          )}
          <Table.Th>Issue Type</Table.Th>
          <Table.Th>Urgency</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default CreateTable;
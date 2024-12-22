import { Table, Select } from '@mantine/core';

export interface Issue {
    email: string,
    description: string,
    title: string,
    issueType: string,
    name: string,
    urgencyType: string,
    status?: string,
    id?:number
}

function CreateTable({ issues, isAdmin, updateState } : { issues: Issue[], isAdmin: boolean, updateState: (index: number, newState: Issue['status']) => void}) {

  const rows = issues.map((issue, index) => (
    <Table.Tr key={index}>
      {/* <Table.Td>{issue.email}</Table.Td> */}
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.description}</Table.Td>
      {isAdmin ? (<Table.Td>
         <Select
          data={["Open",  "In Progress",  "Resolved", "Closed"]} 
          defaultValue={issue.status || "Open"}
          placeholder='Status of Ticket'
          onChange={(value) => {
            updateState(index, value ||  "Open");
          }}
        /> 
      </Table.Td>) : (<Table.Td>{issue.status ? issue.status : "Open"}</Table.Td>)} 
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
          <Table.Th>Status</Table.Th>
          <Table.Th>Issue Type</Table.Th>
          <Table.Th>Urgency</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default CreateTable;
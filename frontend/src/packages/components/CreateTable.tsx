import { Table, Select } from '@mantine/core';
import { useState } from 'react';

export interface Issue {
    email: string,
    issueDescription: string,
    issueTitle: string,
    issueType: string,
    name: string,
    urgencyType: string,
    status?: string
}

function CreateTable({ issues, isAdmin } : { issues: Issue[], isAdmin: boolean }) {

  const [issuesState, setIssuesState] = useState(issues);

  const handleStatusChange = (value: string , index: number) => {
    const updatedIssues = [...issuesState];
    updatedIssues[index]['status'] = value;
    setIssuesState(updatedIssues);
  }

  const rows = issues.map((issue, index) => (
    <Table.Tr key={issue.name}>
      {/* <Table.Td>{issue.email}</Table.Td> */}
      <Table.Td>{issue.issueTitle}</Table.Td>
      <Table.Td>{issue.issueDescription}</Table.Td>
      {isAdmin ? (<Table.Td>
         <Select
          data={["Open",  "In Progress",  "Resolved", "Closed"]} 
          defaultValue={issue.status || "Open"}
          placeholder='Status of Ticket'
          onChange={(value) => {
            handleStatusChange(value ? value : "Open", index);
            console.log(issuesState);
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
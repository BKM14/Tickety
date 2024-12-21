import { Table } from '@mantine/core';

export interface Issue {
    email: string,
    issueDescription: string,
    issueTitle: string,
    issueType: string,
    name: string,
    urgencyType: string
}

function CreateTable({ issues } : { issues: Issue[] }) {
  const rows = issues.map((issue) => (
    <Table.Tr key={issue.name}>
      {/* <Table.Td>{issue.email}</Table.Td> */}
      <Table.Td>{issue.issueTitle}</Table.Td>
      <Table.Td>{issue.issueDescription}</Table.Td>
      <Table.Td>{issue.issueType}</Table.Td>
      <Table.Td>{issue.urgencyType}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Issue Title</Table.Th>
          <Table.Th>Issue Description</Table.Th>
          <Table.Th>Issue Type</Table.Th>
          <Table.Th>Urgency</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default CreateTable;
import React from 'react';
import { Text, Heading, Table } from "@chakra-ui/react"

interface ReceivedParametersProps {
  state: string | null;
  params: URLSearchParams;
}

const ReceivedParameters: React.FC<ReceivedParametersProps> = ({ state, params }) => {
  const paramEntries = Array.from(params.entries());

  return (
    <div>
      <Heading size="xl">Received Parameters:</Heading>
      <Table.Root size="sm" tableLayout="fixed" interactive>
        <Table.Body>
          {paramEntries.map(([key, value]) => (
            <Table.Row key={key}>
              <Table.Cell w="10em">{key}</Table.Cell>
              <Table.Cell w="45%">
                <Text truncate>
                  {String(value)}
                </Text>
              </Table.Cell>
              <Table.Cell>
                {key === 'state' && state && (
                  <>
                    {(value === state) ?
                      (<Text truncate color="border.success">{"Matches request: " + String(state)}</Text>) :
                      (<Text truncate color="border.error">{"Does not match request:  " + String(state)}</Text>)
                    }
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ReceivedParameters;
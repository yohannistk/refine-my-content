import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableData {
  title: string;
  sutitle: string;
  rows: { feature: string; explanation: string }[];
}
interface Props {
  tableData: TableData;
}
export function DetailTable(props: Props) {
  return (
    <div className="mx-auto mb-20 mt-24 max-w-2xl text-center">
      <h2 className="text-3xl font-semibold">{props.tableData.title}</h2>
      <p className="text-muted-foreground mt-3">{props.tableData.sutitle}</p>
      <Table className="mt-9 rounded-full border">
        <TableBody className="">
          {props.tableData.rows.map(({ explanation, feature }) => (
            <TableRow key={feature}>
              <TableCell className="border-r text-start text-base">
                {feature}
              </TableCell>
              <TableCell className="text-start text-base">
                {explanation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

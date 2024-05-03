import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { subtle } from "crypto";

interface TableData {
  title?: string;
  sutitle?: string;
  rows: { feature: string; explanation: string }[];
}
interface Props {
  tableData: TableData;
}
export function DetailTable({ tableData: { rows, sutitle, title } }: Props) {
  return (
    <div className="z-10 mb-20 mt-8 max-w-2xl overflow-hidden rounded-xl border text-center shadow-xl">
      {title && subtle ? (
        <>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-muted-foreground mt-3">{sutitle}</p>
        </>
      ) : null}
      <Table className="">
        <TableBody className="">
          {rows.map(({ explanation, feature }) => (
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

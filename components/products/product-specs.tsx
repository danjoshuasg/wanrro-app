import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductSpecsProps {
  specs: Record<string, string | number | boolean>
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Especificación</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(specs).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>{String(value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


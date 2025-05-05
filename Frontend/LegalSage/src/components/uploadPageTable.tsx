import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Document {
  id: number
  title: string
  content: string
}

interface TableProps {
  refreshTrigger?: boolean;
}

export function PageTable({ refreshTrigger }: TableProps) {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/documents")
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(err => console.error("Failed to fetch documents", err))
  }, [refreshTrigger])

  const handleDelete = async (title: string) => {
    const res = await fetch(`http://localhost:8000/delete/${encodeURIComponent(title)}`, {
      method: "DELETE",
    })

    if (res.ok) {
      // Filter out the deleted document
      setDocuments(prev => prev.filter(doc => doc.title !== title))
    } else {
      console.error("Failed to delete document")
    }
  }

  return (
    <Table>
      <TableCaption>Uploaded Documents</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Document Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map(doc => (
          <TableRow key={doc.id}>
            <TableCell className="font-small">{doc.title}</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive" size="icon" onClick={() => handleDelete(doc.title)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


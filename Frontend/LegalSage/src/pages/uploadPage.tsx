import { useState } from "react"
import { UploadButton } from "@/components/uploadButton"
import { PageTable } from "@/components/uploadPageTable"

export function UploadPage() {
  const [refreshTable, setRefreshTable] = useState(false)

  const handleUploadSuccess = () => {
    setRefreshTable(prev => !prev)
  }

  return (
    <div>
        <div className="flex justify-end mb-4">
            <UploadButton onSuccess={handleUploadSuccess} />
        </div>
        <PageTable refreshTrigger={refreshTable}/>
    </div>
  )
}

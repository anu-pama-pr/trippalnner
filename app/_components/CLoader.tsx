import { Loader } from "lucide-react"

const CLoader = () => {
  return (
   <>
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="animate-spin h-10 w-10 text-primary" />
    </div>
   </>
  )
}

export default CLoader
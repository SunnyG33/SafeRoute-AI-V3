import PatentPortfolio from "@/components/patent/PatentPortfolio"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"

export default function PatentWheelPage() {
  return (
    <>
      <UniversalNavigation showBackButton={true} customBackPath="/landing" customBackLabel="Home" />
      <PatentPortfolio />
    </>
  )
}

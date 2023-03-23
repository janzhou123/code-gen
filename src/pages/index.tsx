import LeftBox from "./components/leftBox";
import RightBox from "./components/rightBox";

export default function Home() {
  return (
    <div className="p-96 m-8 border-2  border-gray-50 bg-gray-50 space-x-3 relative  ">
      <LeftBox />
      <RightBox />
    </div>
  )
}

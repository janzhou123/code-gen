import { useState } from "react";
import DetailBox from "./detailBox";
import ListBox from "./listBox";

export default function LeftBox() {

  const [tableLists, setTableLists] = useState([]);

  const gettableLists = (lists: any) => {
    console.log('lists=======', lists);
    setTableLists(lists);
  }

  return (
    <div className="absolute top-0 left-0 w-1/3 h-full border-2 border-gray-50">
      <DetailBox onInitList={gettableLists} />
      <ListBox tableData={tableLists} />
    </div>
  )
}

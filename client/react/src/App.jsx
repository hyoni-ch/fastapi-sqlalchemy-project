import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ItemInput from "./components/ItemInput";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/items");
      setItems(res.data);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        await axios.delete(`http://127.0.0.1:8000/items/${id}`);
        fetchItems();
      }
    } catch (error) {
      console.error("삭제 실패했습니다", error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <h1 className="text-center font-bold text-2xl">금전출납부</h1>

      <div className="">
        <ItemInput fetchItems={fetchItems} />
        <div className="border rounded-md p-5">
          <ul className="list font-bold border-b border-current py-2 text-lg">
            <li className="a text-center">날짜</li>
            <li className="b text-center">내용</li>
            <li className="c text-center">수입</li>
            <li className="d text-center">지출</li>
          </ul>
          {items.map((item, idx) => {
            return (
              <ul key={idx} className="list py-1 border-b">
                <li className="text-center a">{item.date}</li>
                <li className="text-center b">{item.title}</li>
                <li className="text-center c text-blue-600">
                  {item.upMoney.toLocaleString("ko-KR")}
                </li>
                <li className="text-center d text-red-600">
                  {item.downMoney.toLocaleString("ko-KR")}
                </li>
                <li className="text-center e">
                  <button
                    className="hover:text-gray-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteForever size="22" />
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

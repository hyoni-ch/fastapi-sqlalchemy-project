import React, { useState } from "react";
import axios from "axios";

export default function ItemInput({ fetchItems }) {
  const now_utc = Date.now();
  const timeOff = new Date().getTimezoneOffset() * 60000;
  const today = new Date(now_utc - timeOff).toISOString().split("T")[0];
  //console.log(today);

  const [formData, setFormData] = useState({
    date: today,
    title: "",
    upMoney: "",
    downMoney: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      date: today,
      title: "",
      upMoney: "",
      downMoney: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      (!formData.upMoney && !formData.downMoney)
    ) {
      alert("항목을 채워주세요!");
    } else if (formData.upMoney && formData.downMoney) {
      return alert("수입 금액과 지출 금액 중 한 가지만 작성해주세요!");
    } else {
      let body = {
        date: formData.date,
        title: formData.title,
        upMoney: formData.upMoney === "" ? 0 : parseInt(formData.upMoney, 10),
        downMoney:
          formData.downMoney === "" ? 0 : parseInt(formData.downMoney, 10),
      };

      try {
        await axios.post("http://127.0.0.1:8000/items", body);
        alert("작성이 완료되었습니다.");
        fetchItems();
        handleReset();
      } catch (error) {
        console.error("실패했습니다.", error);
        alert("작성이 실패하였습니다");
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      onReset={handleReset}
      className="border rounded-md p-5 my-5"
    >
      <div>
        <label className="block text-sm">날짜</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          max={today}
          onChange={handleInputChange}
          className="border rounded-md p-1 hover:cursor-pointer"
        />
      </div>
      <div className="w-full">
        <label className=" text-sm">내용</label>
        <input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"
          className="border pl-3 p-1 rounded-md w-full"
        />
      </div>
      <div className="flex gap-2 justify-between ">
        <div className="flex gap-2 l">
          <div className="">
            <label className=" block text-sm">수입</label>
            <input
              type="number"
              step="1000"
              min="0"
              value={formData.upMoney}
              name="upMoney"
              placeholder="0"
              onChange={handleInputChange}
              className="border pl-3 p-1 rounded-md placeholder:text-right"
            />
          </div>
          <div>
            <label className=" block text-sm">지출</label>
            <input
              type="number"
              step="1000"
              min="0"
              value={formData.downMoney}
              name="downMoney"
              placeholder="0"
              onChange={handleInputChange}
              className="border pl-3 p-1 rounded-md placeholder:text-right"
            />
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button className="text-white bg-gray-900 hover:bg-gray-700 rounded-lg p-2 text-sm">
            입력
          </button>
          <button
            type="reset"
            className="text-white bg-gray-900 hover:bg-gray-700 rounded-lg p-2 text-sm"
          >
            리셋
          </button>
        </div>
      </div>
    </form>
  );
}

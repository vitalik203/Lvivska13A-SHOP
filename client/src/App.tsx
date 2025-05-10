import "./App.css";
import { useState, useRef, ReactNode } from "react";


type DataItem = {
  id: number;
  name: string;
  date: string;
  price: number;
  percent: number;
  price_with_extra: unknown;
  amount: number;
  general_price_without_percent: unknown;
  general_price_with_percent: unknown;
};
function App() {
  const [datas, setDatas] = useState<DataItem[]>([]);

  const [selectedData, setSelectedData] = useState<string>("bacalia")
  const [insertedData, setInsertedData] = useState<string>("bacalia")

  const [dateVal, setDateVal] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [nameVal, setNameVal] = useState<string>("");
  const [priceVal, setPriceVal] = useState<string>("");
  const [percentVal, setPercentVal] = useState<string>("");
  const [priceWithExtraValDraft, setPriceWithExtraVal] = useState<any>(0);
  const [priceWithExtraVal, setPriceWithExtraVal] = useState<any>(0);
  const [amountVal, setAmountVal] = useState<string>("");
  const [generalPriceWithoutExtraVal, SetGeneralPriceWithoutExtraVal] =
    useState<any>(0);
  const [generalPriceWithExtraVal, SetGeneralPriceWithExtraVal] =
    useState<any>(0);
  // const [scrollY, setScrollY] = useState(0);

  //Refs
  const formField = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  

  function resetFormFields() {
    setDateVal("");
    setNameVal("");
    setPriceVal("");
    setPercentVal("");
    setAmountVal("");
    setPriceWithExtraVal("");
    SetGeneralPriceWithoutExtraVal("");
    SetGeneralPriceWithExtraVal("");
  }

  function getData() {
    spinRef.current?.classList.remove("hidden");
    fetch(`https://server-for-shop-c353.onrender.com/${selectedData}`)
      .then((res) => res.json())
      .then((dats) => {
        setDatas(dats);
        spinRef.current?.classList.add("hidden");
      })
      .catch((err) => {
        console.error("My error", err.message || err)
        spinRef.current?.classList.add("hidden");
      });
  }
  function calculateExtraVal(e: React.MouseEvent<HTMLButtonElement>): unknown {
    e.preventDefault();
    const price = parseFloat(priceVal);
    const percent = parseFloat(percentVal);
    const amount = parseFloat(amountVal);

    if (isNaN(price) || isNaN(percent) || isNaN(amount)) {
      alert("Введіть коректні числові значення!");
      return;
    }

    const priceWithExtra = Number((price * (1 + percent / 100)).toFixed(2));
    const generalWithoutExtra = Number((price * amount).toFixed(2));
    const generalWithExtra = Number((priceWithExtra * amount).toFixed(2));
    
    setPriceWithExtraVal(priceWithExtra);
    SetGeneralPriceWithoutExtraVal(generalWithoutExtra);
    SetGeneralPriceWithExtraVal(generalWithExtra);
  }

  async function pushData(e: any) {
    e.preventDefault();

    if (
      [dateVal, nameVal, priceVal, percentVal, amountVal].some(
        (val) => val === "" || val === null || val === undefined
      )
    ) {
      return;
    } else {
      if (
        [dateVal, nameVal, priceVal, percentVal, amountVal].some(
          (val) => val === "" || val === null || val === undefined
        )
      ) {
        alert("Деякі поля не заповнено або не розраховано!");
        return;
      }
      const res = await fetch(
        `https://server-for-shop-c353.onrender.com/${insertedData}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: dateVal,
            name: nameVal,
            price: priceVal,
            percent: percentVal,
            price_with_extra: priceWithExtraVal,
            amount: amountVal,
            general_price_without_percent: generalPriceWithoutExtraVal,
            general_price_with_percent: generalPriceWithExtraVal,
          }),
        }
      ).catch((err) => console.log("THE ERROR DURING POST IS " + err));

      if (!res) throw new Error("Error during POST!");
      if (res.ok) {
        resetFormFields();
      }
    }
  }

  function formOpenBtn() {
    formField.current?.classList.remove("hidden");
  }
  function fornCloseBtn() {
    formField.current?.classList.add("hidden");
  }
  function clearForm() {
    resetFormFields();
  }


  // function ScrollTracker() {  
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrollY(window.scrollY);
  //       console.log(window.scrollY);
        
  //     };
  
  //     window.addEventListener('scroll', handleScroll);
  
  //     // Очищення слухача при демонтажі компонента
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);
  // }

  function correctDateFormst(date: any){
    date = date.split("T")
    const secondPartOfDate = date[1].split(".")
    return `${date[0]} ${secondPartOfDate[0]}` 
  } 

  return (
    <div className="wrapper">
      <div ref={formField} className="form_cover hidden">
        <form onSubmit={pushData} className="form">
          <button onClick={fornCloseBtn} className="close_form_btn">
            X
          </button>{" "}
          <br />
          <select style={{width: "160px", height: "40px", fontSize: "25px"}} onChange={(e) => setInsertedData(e.target.value)}>
            <option value="bacalia" selected>Бакалія</option>
            <option value="milk">Молочка</option>
            <option value="bread">Хліб</option>
            <option value="meat">М'ясне</option>
          </select>
          <br />
          <label>
            ВВЕДІТЬ НАЗВУ:{" "}
            <input
              onChange={(e) => setNameVal(e.target.value)}
              value={nameVal}
              type="text"
              name="productName"
            />
          </label>{" "}
          <br />
          <label>
            ВВЕДІТЬ ДАТУ:{" "}
            <input
              value={dateVal}
              onChange={(e) => setDateVal(e.target.value)}
              defaultValue="<%= Date.now()%>"
              type="datetime-local"
              name="productDateRef"
            />
          </label>
          <br />
          <label>
            ВВЕДІТЬ ВАРТІСТЬ:{" "}
            <input
              onChange={(e) => setPriceVal(e.target.value)}
              value={priceVal}
              type="number"
              name="productPriceRef"
            />
          </label>{" "}
          <br />
          <label>
            ВВЕДІТЬ КІЛЬКІСТЬ:{" "}
            <input
              onChange={(e) => setAmountVal(e.target.value)}
              value={amountVal}
              type="number"
              name="productAmountRef"
            />
          </label>{" "}
          <br />
          <label>
            ВВЕДІТЬ % НАЦІНКИ:{" "}
            <input
              onChange={(e) => setPercentVal(e.target.value)}
              value={percentVal}
              type="number"
              name="productPercentRef"
            />
          </label>{" "}
          <br />
          <button onClick={calculateExtraVal}>РОЗРАХУВАТИ ВАРТІСТЬ</button>
          <br />
          <label>КІНЦЕВА ВАРТІСТЬ: {}</label> <br />
          <hr />
          <br />
          <label>
            ОСТАТОЧНО:{" "}
            <input
              onChange={(e) => setPriceWithExtraVal(e.target.value)}
              type="number"
            />
          </label>{" "}
          <br />
          <button onClick={pushData}>НАДІСЛАТИ</button>
          <br />
          <span onClick={clearForm} className="clearForm">
            Очистити форму
          </span>
        </form>
      </div>
      <hr />
      <div className="input_cover">
        <select style={{width: "160px", height: "40px", fontSize: "25px", margin: "35px 0 0 35px"}} onChange={(e) => setSelectedData(e.target.value)}>
          <option value="bacalia" selected>Бакалія</option>
          <option value="milk">Молочка</option>
          <option value="bread">Хліб</option>
          <option value="meat">М'ясне</option>
        </select>
      </div>
      <br />
      <button onClick={formOpenBtn} className="form_call">
        ВІДКРИТИ ФОРМУ
      </button>

      <br />
      <button className="getData" onClick={getData}>
        <img src="/logo.jpg" alt="" />
      </button>
      <div className="table_wrapper">
  <table border={1}>
    <thead>
      <tr>
        <th>ID</th>
        <th>ДАТА</th>
        <th>НАЗВА</th>
        <th>ЦІНА</th>
        <th>КІЛЬКІСТЬ</th>
        <th>%</th>
        <th>ЦІНА З %</th>
        <th>ЗАГ. ЦІНА</th>
        <th>ЗАГ. ЦІНА З %</th>
      </tr>
    </thead>
    <tbody>
      {datas.map((el: DataItem, i: number) => (
        <tr key={i}>
          <td>{el.id}</td>
          <td><b>{correctDateFormst(el.date)}</b></td>
          <td><b>{el.name}</b></td>
          <td style={{backgroundColor: "green", color: "white"}}>{"₴ " + el.price}</td>
          <td>{el.amount}</td>
          <td>{el.percent + "%"}</td>
          <td>{"₴ " + el.price_with_extra}</td>
          <td>{"₴ " + el.general_price_without_percent}</td>
          <td style={{backgroundColor: "lightgreen", color: "darkgreen"}}>{"₴ " + el.general_price_with_percent}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      <div ref={spinRef} className="loader hidden"></div>
    </div>
  );
}

export default App;

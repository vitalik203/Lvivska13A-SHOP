import './App.css'
import { useState, useRef } from 'react';

function App() {
  //All data
  const [datas, setDatas] = useState<DataItem[]>();
  
  type DataItem = {
    id: number;
    name: string;
    // інші поля
  };
  
  //State for all form variables
  const [dateVal, setDateVal] = useState(new Date().toISOString().split('T')[0])
  const [nameVal, setNameVal] = useState<string | undefined>()
  const [priceVal, setPriceVal] = useState<string | undefined>()
  const [percentVal, setPercentVal] = useState<string | undefined>()
  const [priceWithExtraVal, setPriceWithExtraVal] = useState<string | undefined>()
  const [amountVal, setAmountVal] = useState<string | undefined>()
  const [generalPriceWithoutExtraVal, SetGeneralPriceWithoutExtraVal] = useState<string | undefined>()
  const [generalPriceWithExtraVal, SetGeneralPriceWithExtraVal] = useState<string | undefined>()

  const [variable, setVariable] = useState<string>('')
  

  //Refs
  const formField = useRef<HTMLDivElement>(null)


  function resetFormFields() {
    setDateVal('');
    setNameVal('');
    setPriceVal('');
    setPercentVal('');
    setAmountVal('');
    setPriceWithExtraVal('');
    SetGeneralPriceWithoutExtraVal('');
    SetGeneralPriceWithExtraVal('');
  }
  

  function getData(){
    fetch(`https://server-for-shop-c353.onrender.com/data`)
        .then(res => res.json()).then(dats => {setDatas(dats)})
        .catch(err => console.error("My error", err.message || err));
  }
// @ts-ignore
  function calculateExtraVal(e){
    e.preventDefault()
    // @ts-ignore
    const generalPriceWithExtraValVar = Number((priceVal*(1+(percentVal/100))*amountVal).toFixed(2))
    // @ts-ignore
    const generalPriceWithoutExtraValVar = Number((priceVal * amountVal).toFixed(2))

    // @ts-ignore
    SetGeneralPriceWithExtraVal(generalPriceWithExtraValVar)
    // @ts-ignore
    SetGeneralPriceWithoutExtraVal(generalPriceWithoutExtraValVar)
    // @ts-ignore
    setPriceWithExtraVal(Number((priceVal*(1+(percentVal/100))).toFixed(2)))


  }

  async function pushData(e: any){
    
    e.preventDefault()
    
    if([dateVal, nameVal, priceVal, percentVal, amountVal].some(
      val => val === "" || val === null || val === undefined
    )){
      return
    }else{ 
      if (
        [dateVal, nameVal, priceVal, percentVal, amountVal].some(
          val => val === "" || val === null || val === undefined
        )
      ) {
        alert("Деякі поля не заповнено або не розраховано!");
        return;
      } 
      const res = await fetch(`https://server-for-shop-c353.onrender.com/data`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: dateVal,
          name: nameVal, 
          price: priceVal, 
          percent: percentVal, 
          price_with_extra: priceWithExtraVal, 
          amount: amountVal, 
          general_price_without_percent: generalPriceWithoutExtraVal, 
          general_price_with_percent: generalPriceWithExtraVal
        }) // тіло запиту
      }).catch(err => console.log("THE ERROR DURING POST IS " + err)
      )

      if(!res) throw new Error("Error during POST!")
      if(res.ok){
        resetFormFields()
      }
        
    }
    
  }

  function formOpenBtn(){
    formField.current?.classList.remove("hidden")
  }
  function fornCloseBtn(){
    formField.current?.classList.add("hidden")
  }
  function clearForm(){
    resetFormFields()
  }


  return (
    <>
    <div ref={formField} className="form_cover hidden">
    <form onSubmit={pushData} className='form'>
      <button onClick={fornCloseBtn} className="close_form_btn">X</button> <br />
      <label >ВВЕДІТЬ НАЗВУ: <input onChange={(e) => setNameVal(e.target.value)} value={nameVal} type="text" name='productName'/></label> <br />
      <label >ВВЕДІТЬ ДАТУ: <input value={dateVal} onChange={(e) => setDateVal(e.target.value)} defaultValue="<%= Date.now()%>" type="datetime-local" name='productDateRef'/></label><br />
      <label >ВВЕДІТЬ ВАРТІСТЬ: <input onChange={(e) => setPriceVal(e.target.value)} value={priceVal} type="number" name='productPriceRef'/></label> <br />
      <label >ВВЕДІТЬ КІЛЬКІСТЬ: <input onChange={(e) => setAmountVal(e.target.value)} value={amountVal} type="number" name='productAmountRef' /></label> <br />
      <label >ВВЕДІТЬ % НАЦІНКИ: <input onChange={(e) => setPercentVal(e.target.value)} value={percentVal} type="number" name='productPercentRef' /></label> <br />
      <button onClick={calculateExtraVal}>РОЗРАХУВАТИ ВАРТІСТЬ</button><br />
      <label >КІНЦЕВА ВАРТІСТЬ: {priceWithExtraVal}</label> <br />
      <hr />
      <br />
      <label>ОСТАТОЧНО: <input onChange={(e) => setPriceWithExtraVal(e.target.value)} type="number" /></label> <br />
      <button onClick={pushData}>НАДІСЛАТИ</button>
      <br />
      <span onClick={clearForm} className='clearForm'>Очистити форму</span>
    </form>
    </div>
    <hr />
    
    <button onClick={formOpenBtn} className="form_call">ВІДКРИТИ ФОРМУ</button>

    <br />
    <input placeholder="Пошук за назвою..." type="text" value={variable} onChange={(e) => setVariable(e.target.value)} />
    <button className='getData' onClick={getData}><img src="./src/img/logo.jpg" alt="" /></button>
    <table border={1}>
      <tr>
            <th>ID</th>
            <th>ДАТА</th>
            <th>НАЗВА</th>
            <th>ЦІНА</th>
            <th>%</th>
            <th>ЦІНА З %</th>
            <th>КІЛЬКІСТЬ</th>
            <th>ЗАГ. ЦІНА БЕЗ %</th>
            <th>ЗАГ. ЦІНА З %</th>
          </tr>
      {datas ? datas.map((el: any,i: any): any=>(
        <tr key={i}>
            <td>{el.id}</td>
            <td>{el.date}</td>
            <td>{el.name}</td>
            <td>{"₴ "+el.price}</td>
            <td>{el.percent}</td>
            <td>{"₴ "+el.price_with_extra}</td>
            <td>{el.amount}</td>
            <td>{"₴ "+el.general_price_without_percent}</td>
            <td>{"₴ "+el.general_price_with_percent}</td>
        </tr>
      )) : null}
    </table>
    </>
  )
}

export default App

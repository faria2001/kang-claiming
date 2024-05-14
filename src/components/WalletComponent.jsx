import React from 'react'

const WalletComponent = () => {

    const [showtext, setShowtext] = useState("5.00%");

  const handletext=(e)=>{
    const  getvalue= e.target.value
    
    if(getvalue==7)
      {
        const show="5.00%"
        setShowtext(show);
      }
      else if(getvalue==20)
      {
        const show="15.00%"
        setShowtext(show);
      }
      else if(getvalue==45)
        {
          const show="35.00%"
          setShowtext(show);
        }
        else
          {
            const show="5.00%"
            setShowtext(show);
          }
  }
  return (
    <div>  <p className="text-brand-main text-3xl sm:text-4xl  font-bold">
    {showtext}
  </p>

  <select className="options1 text-white-main p-[10px] "
  onChange={(e)=>handletext(e)}
  style={
    {
      backgroundColor:"rgb(18,16,30)",
      borderRadius:"10px",
      border:"1px solid white"
    }
  }
  >
            <option value="7">7 days</option>
            <option value="20">20 days</option>
            <option value="45">45 days</option>
                        
                    </select></div>
  )
}

export default WalletComponent


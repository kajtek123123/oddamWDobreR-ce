import React, {useState, useEffect} from "react";
import Ornament from "../../../assets/Decoration.svg";
import Fundacje from "./Fundacje";

const Whom = () => {
    const [fund, setFund] = useState(['']);
    const [komu, setKomu] = useState(`fundacje`);
    const [page,setPage]=useState(1)
    const opisy = {
        fundacje: `W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi współpracujemy. Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.`,
        NGOs: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt orci vel nisi rutrum, quis ultricies est ullamcorper. Maecenas ornare elit a nulla bibendum sagittis id a neque.`,
        Lokal: `Nulla vitae pellentesque mauris. Pellentesque quam ex, lobortis at quam id, mattis pulvinar mi. Donec odio magna, ornare aliquet libero quis, elementum mattis leo.`
    };
    let btns=[];

    useEffect(() => {
        fetch(`http://localhost:3000/${komu}`)
            .then(response => response.json())
            .then(data => {
                    setFund(data);
                }
            )
    }, [komu]);
    const strony=  (e) => {
        setPage(e.target.name)
    };
    const click = (e) => {
        console.log(e.target.name);
        setKomu(e.target.name)
    };
    if (fund.length>3){
        for (let i=1; i<=fund.length/3;i++){
        btns.push(i)
    }}

    return (
        <section name={`whom`} className={`whom`}>
            <div className={`whomHeader`}>
                <h1>Komu pomagamy?</h1>
                <img src={Ornament} className={`ornament`}></img>
            </div>
            <div className={`whomButtons`}>
                <button name={`fundacje`} onClick={click} className={`whomButton`}>
                    Fundacjom
                </button>
                <button name={`NGOs`} onClick={click} className={`whomButton`}>
                    <p>Organizacjom</p> <p>pozarządowym</p>
                </button>
                <button name={`Lokal`} onClick={click} className={`whomButton`}>
                    <p>Lokalnym</p> <p>zbiórkom</p>
                </button>

            </div>
            <div className={`whomOpis`}>{opisy[komu]}{typeof(fund)===`array`&& fund[2].things}</div>
            <Fundacje dane={fund} page={page}/>
            <ul className={`orgButtons`}>
                {btns.map((m)=>{return(<li><button name={m} onClick={strony} >{m}</button></li>)})}
            </ul>
        </section>
    )
}
export default Whom;
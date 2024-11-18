import logo from "../../img/logo.png"
import { Spin } from "antd";

export default function LoadingPage() {
    return (
        <div style={{ display:'flex', alignItems:'center',justifyContent:'center', minHeight:'100vh' }}>
             <img src={logo} alt="Image Logo goes here" className="logo" style={{ height:'100px', width:'200px' }}/>
        <div className="animate-pulse text-center">
            <h5 className="">Loading ...</h5>
        </div>
        <Spin style={{ position: 'absolute', left: '50%', top: '65%', transform: 'translate(-50%, -50%)' }} size="large" />
    </div>
    )
}
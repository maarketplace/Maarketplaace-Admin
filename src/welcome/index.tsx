import { useNavigate } from "react-router-dom"

const Welcome = () => {
    const navigate = useNavigate()
    return (
        <div className='w-[100%] h-[100vh] flex items-center justify-center flex-col '>
            <img src="/MARKET.svg" alt="" className='w-[80px] mb-[50px]' />
            <div className='w-[400px] h-[350px] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] flex justify-center flex-col items-center p-[10px] gap-[20px]'>
                <img src="/login.png" alt="" className='w-[150px]' />
                <span className='w-[95%] flex flex-col gap-[10px] items-center'>
                    <p className='text-[20px] mt-[20px]'>Welcome back</p>
                    <p className='text-center font-light text-[12px] '>Welcome to maarketplaace internal dashbaord - the back office for managing merchants, product, users and transaction.</p>
                    <button className='w-[100%] h-[30px] bg-[#FFC300]' onClick={()=> navigate('/login')}>Login</button>
                </span>
            </div>
        </div>
    )
}

export default Welcome
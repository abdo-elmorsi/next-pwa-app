import { useEffect, useState } from "react";
import { Button, Input } from "../components";
import { userLogin } from "../db/auth";
import useToast from "../hooks/useToast";
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const { Toast, showToast } = useToast();

    const [submit, setSubmit] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const handleChange = (ev) => {
        const { value, name } = ev.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const { userName, password } = userInfo;
        setSubmit(true);

        try {
            const user = await userLogin({ name: userName, password });
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/");
        } catch (error) {
            showToast('error', error.message);
        } finally {
            setTimeout(() => {
                setSubmit(false);
            }, 1500);
        }
    };
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            router.push("/");
        }
    }, []);


    return (
        <div className="flex items-center justify-center h-screen bg-gray-600 ">
            <form onSubmit={handleSubmit} className="p-5 border border-gray-100 shadow-md w-96">
                <h2 className="pb-5 text-2xl font-semibold text-center text-white ">Login</h2>
                <div className="flex flex-col gap-5 ">
                    <Input name="userName" label="User Name" value={userInfo.useName} onChange={handleChange} />
                    <Input name="password" label="Password" type="password" value={userInfo.password} onChange={handleChange} />

                    <Button type="submit" disabled={!userInfo?.userName || !userInfo.password || submit} >
                        {
                            submit ? "Loading..." : "Login"
                        }
                    </Button>
                </div>
            </form>
            {Toast()}
        </div>
    )
}
export default Login
import { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router'
import { loginValidation } from '../../utils/loginValidation'
import { FaUser, IoIosEye, IoIosEyeOff } from '../../icons'

const LoginPage = () => {
    const navigate = useNavigate()
    const [isUssers] = useState([
        { id: "user-1", name: "Ahmad Farid", email: "farid@gmail.com", password: "farid123" },
        { id: "user-2", name: "Muhamad Afrizal", email: "afrizal@gmail.com", password: "afrizal123" }
    ])
    const [passwordType, setPasswordType] = useState("password")
    const [loginError, setLoginError] = useState("")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        if (user) navigate("/home", { replace: true })
    }, [])

    const togglePassword = () => {
        setPasswordType(prev => prev === "password" ? "text" : "password")
    }

    const handleSubmit = (values) => {
        const data = isUssers.find(is => is.email === values.email && is.password === values.password)
        if (data) {
            localStorage.setItem("isLogin", true)
            localStorage.setItem("currentUser", JSON.stringify(data))
            navigate("/home", { replace: true })
        } else {
            setLoginError("* Incorrect email or password")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#050d1c] via-[#0a1f32] to-[#081b29]">
            <div className="w-full max-w-md px-8 py-10 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginValidation}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <h1 className="text-4xl text-center text-white font-bold mb-10 tracking-wide">Login</h1>

                            <div className="mb-6">
                                <div className="flex items-center relative">
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        className="w-full px-5 py-3 pr-12 rounded-full bg-transparent border border-white/30 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                    />
                                    <FaUser className="absolute right-5 text-white/70 text-lg" />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-300 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center relative">
                                    <Field
                                        name="password"
                                        type={passwordType}
                                        placeholder="Enter password"
                                        className="w-full px-5 py-3 pr-12 rounded-full bg-transparent border border-white/30 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                    />
                                    <span
                                        onClick={togglePassword}
                                        className="absolute right-5 text-white/70 text-lg cursor-pointer hover:text-white transition"
                                    >
                                        {passwordType === "password" ? <IoIosEye /> : <IoIosEyeOff />}
                                    </span>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-300 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 mt-4 rounded-full bg-cyan-400 text-white font-semibold hover:bg-cyan-300 transition shadow-lg"
                            >
                                Enter
                            </button>

                            {loginError && (
                                <div className="text-red-400 text-sm text-center mt-4">{loginError}</div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage

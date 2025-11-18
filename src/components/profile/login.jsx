import {Box, Button, Snackbar, Stack} from "@mui/material"
import { useState, useRef, useEffect } from "react"
import AuthService from "../../service/auth"
import { useNavigate, useSearchParams } from "react-router-dom"

const Login = () => {
    const token = localStorage.getItem("prime-token")
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [isLoading, setIsLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [codeSnackbar, setCodeSnackbar] = useState(false)
    const [progress, setProgress] = useState(100)
    const [codeSnackProgress, setCodeSnackProgress] = useState(100)
    const inputRefs = useRef([])
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const isLogout = searchParams.get("logout") === "true"

    useEffect(() => {
        if (token) {
            navigate("/profile")
        } else if (isLogout) {
            setOpenSnackbar(true)
            const timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress <= 0) {
                        clearInterval(timer)
                        setOpenSnackbar(false)
                        return 0
                    }
                    return prevProgress - (100 / 50)
                })
            }, 100)
            navigate("/login")
        }
    }, [token, navigate, isLogout])

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
        setCodeSnackbar(false)
        setProgress(100)
    }

    const handleCodeCloseSnackbar = () => {
        setCodeSnackbar(false)
        setProgress(100)
    }

    const handleInputChange = (index, value) => {
        if (value.length > 1) return // Prevent multiple characters

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        // Submit when all 6 digits are entered
        if (index === 5 && value) {
            const fullCode = newCode.join("")
            if (fullCode.length === 6) {
                setCodeSnackProgress(100)
                submitCode(fullCode)
            }
        }
    }

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const submitCode = async (enteredCode) => {
        setIsLoading(true)

        try {
            const response = await AuthService.login(enteredCode)

            const { token, userRes } = response

            const { ordersRes, ...userWithoutOrders } = userRes

            // Save to localStorage
            localStorage.setItem("prime-token", token)
            // Save user without orders
            localStorage.setItem("prime-user", JSON.stringify(userWithoutOrders))
            localStorage.setItem("profile-update-count", "0")

            // Save orders separately
            localStorage.setItem("prime-user-orders", JSON.stringify(ordersRes))
            localStorage.setItem("fetched-orders-date", Date.now().toString())

            // Navigate to profile after 1 second
            setTimeout(() => {
                navigate("/profile?login=true")
            }, 1000)
        } catch (error) {
            setCode(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()

            setCodeSnackbar(true)
            const timer = setInterval(() => {
                setCodeSnackProgress((prevProgress) => {
                    if (prevProgress <= 0) {
                        clearInterval(timer)
                        setCodeSnackbar(false)
                        return 0
                    }
                    return prevProgress - (100 / 50)
                })
            }, 100)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Focus first input on component mount
        inputRefs.current[0]?.focus()
        
        // Disable body scroll on mobile
        document.body.style.overflow = "hidden"
        
        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    return (
        <Stack
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "var(--light-color)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflow: "hidden",
                padding: { xs: "16px", sm: "40px" },
                paddingTop: { xs: "130px", sm: "120px", md: "140px" },
                zIndex: 1,
            }}
        >
            <div className="text-center max-w-[400px] w-full mx-auto">
                <h2 className="text-[color:var(--burgundy-dark)] text-[1.5rem] sm:text-[1.8rem] font-[900] mb-[30px] capitalize font-['Noto Sans']">
                    Kodni Kiriting
                </h2>

                <Box className="text-black text-[15px] sm:text-[15px] leading-[1.4] mb-[30px] sm:mb-[40px] font-['Noto Sans'] font-medium px-2 flex flex-col items-center">
                    <div>
                        <a className="text-sm font-semibold text-[var(--burgundy-dark)] underline underline-offset-4 font-['Noto Sans']" href="https://t.me/prime77uzBot" target="_blank" rel="noopener noreferrer">
                            @prime77uzbot
                        </a>
                        <span className="text-[15px] font-bold font-['Noto Sans']">&nbsp;&nbsp;&nbsp;telegram botiga kiring va</span>
                    </div>
                    <div className="mt-3 text-[15px] font-bold font-['Noto Sans']">
                        2 daqiqalik kodingizni oling.
                    </div>
                </Box>

                <form id="loginForm">
                    <div className="flex justify-center gap-[8px] sm:gap-[10px] mb-[20px] sm:mb-[30px] flex-wrap">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                className="w-[40px] h-[50px] sm:w-[45px] sm:h-[57px] text-center text-xl sm:text-2xl font-bold border-2 border-[color:var(--burgundy-dark)] rounded-[15px] transition-all duration-300 bg-[var(--light-color)] focus:border-[color:var(--burgundy-color)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(139,21,56,0.1)] focus:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    {isLoading && (
                        <div className="text-center mt-4 sm:mt-5">
                            <div className="w-6 h-6 border-[3px] border-[#f3f3f3] border-t-[color:var(--burgundy-color)] rounded-full animate-spin mx-auto block"></div>
                            <p className="text-[color:var(--burgundy-color)] mt-4 sm:mt-5 font-semibold text-sm sm:text-base">Tekshirilmoqda...</p>
                        </div>
                    )}
                </form>
            </div>

            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Noto Sans",
                        borderRadius: "10px",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                        padding: "12px",
                        minWidth: "160px",
                    },
                }}
                message={
                    <div style={{ display: "flex", alignItems: "center", paddingRight: "40px" }}>
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="red"
                            style={{ marginRight: "8px" }}
                        >
                            <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" />
                        </svg>
                        <span>Siz hisobingizdan chiqdingiz!</span>
                        <div style={{ position: "absolute", bottom: "-12px", left: 0, right: 0, height: "4px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                            <div
                                style={{
                                    width: `${progress}%`,
                                    height: "4px",
                                    backgroundColor: "red",
                                    transition: "width 0.1s linear",
                                }}
                            />
                        </div>
                    </div>
                }
                action={
                    <Button
                        onClick={handleCloseSnackbar}
                        sx={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            minWidth: "24px",
                            padding: "2px",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            "&:focus": {
                                outline: "none",
                            },
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            aria-hidden="true"
                            viewBox="0 0 14 16"
                            fill="black"
                        >
                            <path fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" />
                        </svg>
                    </Button>
                }
            />

            <Snackbar
                open={codeSnackbar}
                onClose={handleCodeCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Noto Sans",
                        borderRadius: "10px",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                        padding: "12px",
                        minWidth: "460px",
                    },
                }}
                message={
                    <div style={{ display: "flex", alignItems: "center", paddingRight: "40px" }}>
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="red"
                            style={{ marginRight: "8px" }}
                        >
                            <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" />
                        </svg>
                        <span>Noto'g'ri kod qayta urunib ko'ring!</span>
                        <div style={{ position: "absolute", bottom: "-12px", left: 0, right: 0, height: "4px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                            <div
                                style={{
                                    width: `${codeSnackProgress}%`,
                                    height: "4px",
                                    backgroundColor: "red",
                                    transition: "width 0.1s linear",
                                }}
                            />
                        </div>
                    </div>
                }
                action={
                    <Button
                        onClick={handleCodeCloseSnackbar}
                        sx={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            minWidth: "24px",
                            padding: "2px",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            "&:focus": {
                                outline: "none",
                            },
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            aria-hidden="true"
                            viewBox="0 0 14 16"
                            fill="black"
                        >
                            <path fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" />
                        </svg>
                    </Button>
                }
            />
        </Stack>
    )
}

export default Login

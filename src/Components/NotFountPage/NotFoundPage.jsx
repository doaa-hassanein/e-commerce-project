import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import error from "./../../assets/error.svg"
function NotFoundPage() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Navbar />
            <div className="p-8">
                <div className="w-[60%] mx-auto">

                    <img src={error} alt="1" className="w-full" />
                </div>

            </div>

            <Footer />
        </>
    )
}

export default NotFoundPage
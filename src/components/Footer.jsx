
const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-[#332165] text-sm">
        <div className="container max-w-[1200px] mx-auto flex p-5 items-center justify-center">
            <div className="text-white">
                &copy; {new Date().getFullYear()} Kangamoon
            </div>
            {/* <div>
                Powered by: <a href="https://brdigitech.com" target="blank" className="text-white">Brdigitech</a>
            </div> */}
        </div>
    </footer>
  )
}

export default Footer
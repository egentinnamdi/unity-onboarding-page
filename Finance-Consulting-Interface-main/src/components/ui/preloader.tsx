const Preloader = () => {
    return (
      <div className="select-none pointer-events-none flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center justify-center">
          <div className="spinner_cont">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
}
 
export default Preloader;
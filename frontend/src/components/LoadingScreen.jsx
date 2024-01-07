import dpgcLogo from '../assets/dpgc.jpg'

const LoadingScreen = () => {
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen overflow-hidden">
      <div className="loader">
        <div className="loaderOutline"></div>
        <img src={dpgcLogo} alt="Loading" className="loaderImage" width="60" height="60"/>
      </div>
    </div>
  );
};

export default LoadingScreen;

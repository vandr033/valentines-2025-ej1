"use client";
import { useState } from "react";
import { FaHeart, FaCheck } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const [noButtonState, setNoButtonState] = useState({
    isMoving: false,
    top: 50,
    left: 50,
    text: "No",
    clicks: 0,
    hideBehindYes: false,
    isPeeking: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  const noButtonTexts = [
    "Estas segura?",
    "Porque?",
    "No me digas eso...",
    "No me hagas sufrir...",
    "Por favor...",
    "No me hagas esto...",
    "Me vas a dejar solo acaso?",
    "Enserio???",
    "Neta?",
  ];

  const carouselImages = [
    "/assets/fotos/1.jpg",
    "/assets/fotos/2.jpg",
    "/assets/fotos/3.jpg",
    "/assets/fotos/4.jpg",
    "/assets/fotos/5.jpg",
    "/assets/fotos/6.jpg",
    "/assets/fotos/7.jpg",
    "/assets/fotos/8.jpg",
    "/assets/fotos/9.jpg",
    "/assets/fotos/10.jpg",
    "/assets/fotos/11.jpg",
    "/assets/fotos/12.jpg",
    "/assets/fotos/13.jpg",
    "/assets/fotos/14.jpg",
    "/assets/fotos/15.jpg",
    "/assets/fotos/16.jpg",
    "/assets/fotos/17.jpg",
    "/assets/fotos/18.jpg",
    "/assets/fotos/19.jpg",
    "/assets/fotos/20.jpg",
  ];

  const moveNoButton = () => {
    const newClicks = noButtonState.clicks + 1;

    if (newClicks === 5) {
      setNoButtonState((prevState) => ({
        ...prevState,
        text: "No",
        hideBehindYes: true,
        isPeeking: true,
        clicks: newClicks,
      }));

      setTimeout(() => {
        setNoButtonState((prevState) => ({
          ...prevState,
          hideBehindYes: false,
          isPeeking: false,
        }));
      }, 4000);
    } else {
      setNoButtonState((prevState) => ({
        ...prevState,
        isMoving: true,
        top: Math.random() * 80,
        left: Math.random() * 80,
        text: noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)],
        clicks: newClicks,
      }));
    }
  };

  const handleYesClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = e.target as HTMLDivElement;
    const imageIndex = Math.round(scrollTop / clientHeight);
    setCurrentImageIndex(imageIndex);
  };

  // Get the start index for the visible indicators (maximum of 5 shown at once)
  const maxVisibleDots = 5;
  const startIndex = Math.max(
    0,
    Math.min(
      carouselImages.length - maxVisibleDots,
      currentImageIndex - Math.floor(maxVisibleDots / 2)
    )
  );
  const visibleDots = carouselImages.slice(
    startIndex,
    startIndex + maxVisibleDots
  );

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div
          style={{
            width: "393px",
            height: "852px",
            backgroundImage: "url('/assets/background.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="relative flex justify-center items-center"
        >
          <Image
            src="/assets/overlay.png"
            alt="Overlay"
            width={393}
            height={852}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
          />
          <div
            style={{
              width: "275px",
              height: "700px",
              backgroundImage: "url('/assets/paper.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold text-center mt-24 mb-8 text-red-500">
              Surprise!!!!!
            </h1>
            <div className="relative flex flex-row items-center w-[90%]">
              {/* Vertical Indicators */}
              <div
                className="h-64 w-10 flex flex-col items-center space-y-2 bg-gray-100 rounded-lg shadow-lg"
                style={{ maxHeight: "150px" }}
              >
                {visibleDots.map((_, index) => {
                  const actualIndex = startIndex + index; // Map visible index back to actual index
                  return (
                    <span
                      key={actualIndex}
                      className={`w-4 h-4 rounded-full ${
                        actualIndex === currentImageIndex
                          ? "bg-red-500"
                          : "bg-red-300"
                      }`}
                    ></span>
                  );
                })}
              </div>
              {/* Vertical Scrolling Carousel */}
              <div
                className="h-64 w-full overflow-y-scroll bg-white rounded-lg shadow-lg ml-4"
                onScroll={handleScroll}
              >
                <div className="flex flex-col items-center">
                  {carouselImages.map((src, index) => (
                    <div key={index} className="p-2">
                      <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Image
              className=""
              src="/assets/text.png"
              alt="text"
              width={275}
              height={300}
            />
            <div className="flex flex-row justify-center items-center gap-6 relative w-full mt-4">
              <button
                onClick={handleYesClick}
                className="flex flex-col items-center justify-center bg-red-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 z-10"
              >
                <FaHeart className="w-6 h-6 mb-1" />
                Si
              </button>
              <button
                onClick={moveNoButton}
                style={{
                  position:
                    noButtonState.hideBehindYes || noButtonState.isPeeking
                      ? "absolute"
                      : noButtonState.isMoving
                      ? "absolute"
                      : "relative",
                  top: noButtonState.hideBehindYes
                    ? "52%"
                    : noButtonState.isMoving
                    ? `${noButtonState.top}%`
                    : "initial",
                  left: noButtonState.isPeeking
                    ? "49%"
                    : noButtonState.hideBehindYes
                    ? "75%"
                    : noButtonState.isMoving
                    ? `${noButtonState.left}%`
                    : "initial",
                  transform: noButtonState.isMoving
                    ? "translate(-50%, -50%)"
                    : "none",
                }}
                className={`flex flex-col items-center justify-center bg-pink-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 ${
                  noButtonState.isPeeking
                    ? "animate-peek"
                    : noButtonState.hideBehindYes
                    ? "opacity-70 z-0"
                    : "z-10"
                }`}
              >
                <FaHeart className="w-6 h-6 mb-1" />
                {noButtonState.text}
              </button>
            </div>
          </div>
          {/* Tailwind CSS animation for peeking effect */}
          <style jsx>{`
            @keyframes peek {
              0% {
                left: 49%;
              }
              25% {
                left: 70%; /* Peek to the right */
              }
              50% {
                left: 49%; /* Hide behind Yes */
              }
              100% {
                left: 75%; /* Settle back behind Yes */
              }
            }
            .animate-peek {
              animation: peek 4s ease-in-out;
            }
          `}</style>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            style={{ backgroundColor: "#f9f5f1" }} // Modal background color
          >
            <div
              className="bg-white w-10/12 max-w-md rounded-lg shadow-xl p-6"
              style={{
                height: "70%",
                maxHeight: "500px",
                backgroundColor: "#f9f5f1",
              }}
            >
              <h2 className="text-2xl font-bold text-center text-red-500 mb-4">
                ¡Te amo! Nos vemos pronto!!
              </h2>
              <div className="flex flex-col items-center gap-6 mt-6">
                {/* Heart-Shaped Button */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-700 font-medium text-center">
                    Por favor confirma aquí, luego vuelve a esta pestaña
                  </span>
                  <button
                    className="bg-red-500 text-white font-bold shadow-md flex items-center justify-center hover:bg-red-600 transition duration-300"
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                    onClick={() => {
                      window.open("https://www.opentable.com/", "_blank");
                    }}
                  >
                    <FaHeart className="w-6 h-6" />
                  </button>
                </div>

                {/* Check Button */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-700 font-medium text-center">
                    Finalmente ingresa aquí para confirmar tu elección
                  </span>
                  <button
                    className="bg-red-500 text-white font-bold shadow-md flex items-center justify-center hover:bg-red-600 transition duration-300"
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                    onClick={() => {
                      // window.open(
                      //   "https://api.whatsapp.com/send?phone=14055417441",
                      //   "_blank"
                      // );
                      //show a small popup saying "Este link abrira whatsapp "
                      alert("Este boton abrira whatsapp o cualquier otro link");
                    }}
                  >
                    <FaCheck className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

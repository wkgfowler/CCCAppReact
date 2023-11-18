import { useState } from "react";

const MenuFullScreen = ({menu}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleImageClick = () => {
        const imageElement = document.getElementById(menu.id);

        if (imageElement) {
          if (!isFullScreen) {
            if (imageElement.requestFullscreen) {
              imageElement.requestFullscreen();
            } else if (imageElement.mozRequestFullScreen) {
              imageElement.mozRequestFullScreen();
            } else if (imageElement.webkitRequestFullscreen) {
              imageElement.webkitRequestFullscreen();
            } else if (imageElement.msRequestFullscreen) {
              imageElement.msRequestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          }

          setIsFullScreen(!isFullScreen);
        }
    };

    return (
        <div>
            <img
                className="border-2 w-full"
                id={`${menu.id}`}
                src={`${process.env.REACT_APP_API_ENDPOINT}/${menu.menuImage}`}
                alt="error"
                onClick={handleImageClick}
            />
        </div>
    );
}
 
export default MenuFullScreen;
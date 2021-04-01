import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowsFullscreen, FullscreenExit } from "react-bootstrap-icons";
import React, { ReactNode, useState } from "react";

import "./FullScreenWrapper.scss";

interface IFullScreenWrapperProps {
  children: ReactNode;
}

const FullScreenWrapper = ({
  children,
}: IFullScreenWrapperProps): JSX.Element => {
  const [fullScreen, setFullScreen] = useState(false);

  const openFullscreen = (e: any): void => {
    const galleryElement: any = e.target.parentElement;
    if (galleryElement.requestFullscreen) {
      setFullScreen(true);
      galleryElement.requestFullscreen();
    }
  };

  const closeFullscreen = (): void => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  const fullScreenIcon: React.ReactNode = fullScreen ? (
    <FullscreenExit
      className="fullscreen-icon fullscreen-icon_exit"
      onClick={closeFullscreen}
    />
  ) : (
    <ArrowsFullscreen className="fullscreen-icon" onClick={openFullscreen} />
  );

  return (
    <div className="fullscreen-wrapper">
      {fullScreenIcon}
      <div className="fullscreen-wrapper__game">{children}</div>
    </div>
  );
};

export default FullScreenWrapper;

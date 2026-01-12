"use client";

import { useEffect } from "react";
import styles from "./Booking.module.scss";

export default function Booking() {
  useEffect(() => {
    const container = document.getElementById("easyms-reservation-module");
    if (!container) return;

    const scriptTag = document.createElement("script");
    scriptTag.type = "text/props";
    scriptTag.textContent = JSON.stringify({
      moduleKey: "7129a468-d8a0-46cc-83b2-7e528c1a20bb",
    });
    container.appendChild(scriptTag);

    const bundleScript = document.createElement("script");
    bundleScript.src = "https://my.easyms.co/reservation-module/bundle.js";
    bundleScript.async = true;
    document.body.appendChild(bundleScript);

    return () => {
      if (bundleScript.parentNode) {
        bundleScript.parentNode.removeChild(bundleScript);
      }
    };
  }, []);

  return (
    <div className={styles.booking}>
      <div id="easyms-reservation-module"></div>
    </div>
  );
}


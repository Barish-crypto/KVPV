(function () {
  let isAdblockDetected = false;
  let hasChecked = false;

  function detectAdBlock() {
    return new Promise((resolve) => {
      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      })
        .then(({ redirected }) => {
          const blocked = redirected;
          resolve(blocked);
        })
        .catch((error) => {
          const blocked = window.navigator.onLine;
          resolve(blocked);
        });
    });
  }

  function handleAdBlockDetection(blocked) {
    isAdblockDetected = blocked;
    fetch("/adblock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocked,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        online: window.navigator.onLine,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (blocked) {
          showAdBlockWarning();
        } else {
        }
      })
      .catch((error) => {});
  }

  function showAdBlockWarning() {
    if (document.getElementById("adblock-modal")) {
      return;
    }
    const modalBackdrop = document.createElement("div");
    modalBackdrop.id = "adblock-modal";
    modalBackdrop.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      background: rgba(19, 9, 60, 0.95);
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    
    modalBackdrop.innerHTML = `
      <div style="width: 100%; max-width: 400px; min-width: 300px; margin: 0 32px;">
        <div style="
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          background: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        ">
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            right: 0;
            left: 0;
            padding: 16px 16px 16px 0px;
            margin-top: 10px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 12px;
          ">
            <div style="width: 24px; height: 24px;"></div>
            <h3 style="
              margin: 0;
              font-size: 1rem;
              line-height: 1.5rem;
              font-weight: 600;
              color: #111827;
              text-align: center;
            ">Oops! Không vào được game</h3>
            <button id="adblock-close-btn" style="
              width: 24px;
              height: 24px;
              background: none;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              color: #6b7280;
              font-size: 18px;
              line-height: 1;
            " title="Đóng">✕</button>
          </div>

          <!-- Content -->
          <div style="margin-top: 12px; padding: 16px;">
            <div style="display: flex; flex-direction: column; margin-top: 44px;">
              <p style="
                text-align: center;
                font-size: 0.75rem;
                font-weight: 400;
                line-height: 1rem;
                color: #374151;
              ">
                Hãy tắt chế độ chặn quảng cáo trên trình duyệt hoặc thiết bị của bạn để tiếp tục chơi nhé!
              </p>
               <div style="display: flex; align-items: center; justify-content: center;">
                 <button id="adblock-confirm-btn" style="
                   border-radius: 9999px;
                   background: linear-gradient(to left, #ef4444, #eab308);
                   border: none;
                   outline: none;
                   margin-top: 12px;
                   width: 100%;
                   margin-bottom: 16px;
                   padding: 12px 24px;
                   cursor: pointer;
                   transition: all 0.2s ease;
                 " onmouseover="this.style.borderColor='#fb923c'" 
                    onmouseout="this.style.borderColor='transparent'">
                   <span style="
                     display: block;
                     overflow: hidden;
                     font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
                     font-weight: 600;
                     font-size: 16px;
                     color: white;
                   ">Đã hiểu</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    // Event listeners
    const closeBtn = document.getElementById("adblock-close-btn");
    const confirmBtn = document.getElementById("adblock-confirm-btn");

    function closeModal() {
      if (modalBackdrop.parentElement) {
        modalBackdrop.remove();
      }
    }

    function handleConfirm() {
      closeModal();
      
      setTimeout(() => {
        if (window.recheckAdblock) {
          window.recheckAdblock();
        }
      }, 1000);
    }

    closeBtn.addEventListener("click", closeModal);
    confirmBtn.addEventListener("click", handleConfirm);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  window.recheckAdblock = function () {
    console.log("🔄 Rechecking AdBlock status...");
    detectAdBlock().then(handleAdBlockDetection);
  };

  window.getAdblockStatus = function () {
    return {
      detected: isAdblockDetected,
      hasChecked: hasChecked,
    };
  };

  function runDetection() {
    if (hasChecked) {
      console.log("⏭️ AdBlock detection already completed");
      return;
    }
    detectAdBlock()
      .then((result) => {
        hasChecked = true;
        handleAdBlockDetection(result);
      })
      .catch((error) => {
        hasChecked = true;
        handleAdBlockDetection(false);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(runDetection, 200);
    });
  } else {
    setTimeout(runDetection, 200);
  }
})();

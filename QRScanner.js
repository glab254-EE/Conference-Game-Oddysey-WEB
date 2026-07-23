let qrScanner = null;
let scannerRunning = false;

function startScanner() {
    const reader = document.getElementById("reader");
    reader.style.display = "block";
    qrScanner = new Html5Qrcode("reader");
    qrScanner.start(
        {
            facingMode: "environment"
        },
        {
            fps: 10,
            qrbox: 250
        },
        function(decodedText) {
            qrScanner.stop().then(() => {
                reader.style.display = "none";
                unityInstance.SendMessage(
                    "QRScanner",
                    "OnQRCodeDetected",
                    decodedText
                );
            });
        },
        function(errorMessage) {
        }
    );
    scannerRunning = true; 
}

async function stopScanner() {
    if (!scannerRunning || !qrScanner)
        return;
    await qrScanner.stop();
    await qrScanner.clear();
    document.getElementById("reader").style.display = "none";
    qrScanner = null;
    scannerRunning = false;
}
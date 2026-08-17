let qrScanner = null;
let scannerRunning = false;

function startScanner() {
    const reader = document.getElementById("reader");
    reader.style.visibility="visible";
    qrScanner = new Html5Qrcode("reader");
    qrScanner.start(
    { facingMode: "environment" }, 
    {
        fps: 10,    // Optional, frame per seconds for qr code scanning
    },
    (decodedText, decodedResult) => {
		unityInstance.SendMessage(
			"QRScanner",
			"OnQRCodeDetected",
			decodedText
		);   
    },
    (errorMessage) => {
        // parse error, ignore it.
    })
    .catch((err) => {
    // Start failed, handle it.
	});
	scannerRunning = true;
}

async function stopScanner() {
    if (!scannerRunning || !qrScanner)
        return;
    await qrScanner.stop();
    await qrScanner.clear();
    document.getElementById("reader").visibility="hidden";
    qrScanner = null;
    scannerRunning = false;
}
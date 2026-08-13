let qrScanner = null;
let scannerRunning = false;

function onScanSuccess(decodedText, decodedResult) {
    var resT = JSON.parse(decodedText)
    if (resT["IsleKey"] && resT["IsleName"])
    {
			unityInstance.SendMessage(
				"QRScanner",
				"OnQRCodeDetected",
				decodedText
			);      
    }
}
function startScanner() {
    const reader = document.getElementById("reader");
    reader.style.visibility="visible";
    qrScanner = new Html5Qrcode("reader");
    qrScanner.start(
    { facingMode: "environment" }, 
    {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
    },
    (decodedText, decodedResult) => {
        onScanSuccess(decodedText,decodedResult);
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
import { useEffect, useRef } from "react";
import {
    Html5Qrcode,
    Html5QrcodeSupportedFormats
} from "html5-qrcode";

import "./QRScanner.css";


export default function QRScanner({
    open,
    onClose,
    onScanSuccess
}) {

    const scannerRef = useRef(null);
    const scannerStartedRef = useRef(false);
    const scannedRef = useRef(false);


    // -----------------------------------------
    // STOP SCANNER
    // -----------------------------------------

    const stopScanner = async () => {

        const scanner = scannerRef.current;

        if (!scanner) {
            return;
        }

        try {

            if (scannerStartedRef.current) {

                await scanner.stop();

                scannerStartedRef.current = false;
            }

            await scanner.clear();

        } catch (error) {

            console.error(
                "QR scanner stop error:",
                error
            );

        } finally {

            scannerRef.current = null;

        }
    };


    // -----------------------------------------
    // START SCANNER
    // -----------------------------------------

    const startScanner = async () => {

        scannedRef.current = false;

        await stopScanner();

        try {

            const scanner = new Html5Qrcode(
                "qr-reader",
                {
                    verbose: false
                }
            );

            scannerRef.current = scanner;

            const config = {

                fps: 10,

                qrbox: {
                    width: 250,
                    height: 250
                },

                formatsToSupport: [
                    Html5QrcodeSupportedFormats.QR_CODE
                ]

            };


            await scanner.start(

                {
                    facingMode: "environment"
                },

                config,

                (decodedText, decodedResult) => {

                    if (scannedRef.current) {
                        return;
                    }

                    scannedRef.current = true;

                    console.log(
                        "QR SCANNED:",
                        decodedText
                    );

                    onScanSuccess(
                        decodedText,
                        decodedResult
                    );

                    stopScanner();

                },

                () => {
                    // Ignore scan failures.
                }

            );

            scannerStartedRef.current = true;

        } catch (error) {

            console.error(
                "QR camera start error:",
                error
            );

        }

    };


    // -----------------------------------------
    // OPEN / CLOSE
    // -----------------------------------------

    useEffect(() => {

        if (!open) {
            return;
        }

        startScanner();


        return () => {

            stopScanner();

        };

    }, [open]);


    // -----------------------------------------
    // CLOSE
    // -----------------------------------------

    const handleClose = async () => {

        await stopScanner();

        onClose();

    };


    if (!open) {
        return null;
    }


    return (

        <div className="qr-scanner-overlay">

            <div className="qr-scanner-modal">

                <div className="qr-scanner-header">

                    <h3>
                        Scan QR Code
                    </h3>

                    <button
                        type="button"
                        className="qr-close-button"
                        onClick={handleClose}
                    >
                        ×
                    </button>

                </div>


                <div className="qr-scanner-body">

                    <div
                        id="qr-reader"
                        className="qr-reader"
                    />

                    <p className="qr-scanner-help">
                        Point your camera at the QR code
                    </p>

                </div>

            </div>

        </div>

    );

}

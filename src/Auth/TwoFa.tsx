import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";

const TwoFa: React.FC = () => {
  const [authCode, setAuthCode] = useState<string[]>(["", "", "", ""]);
  const [copied, setCopied] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const qrCodeUrl: string = "https://example.com/qr-code.png";
  const backupCode: string = "ABCD-EFGH-IJKL-MNOP";

  const handleCopy = (): void => {
    navigator.clipboard.writeText(backupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (index: number, value: string): void => {
    if (/^\d$/.test(value)) {
      const newAuthCode = [...authCode];
      newAuthCode[index] = value;
      setAuthCode(newAuthCode);

      if (index < 3 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && authCode[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const code = authCode.join("");
    console.log("2FA code submitted:", code);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8 max-md:w-[90%]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Two-Factor Authentication
        </h2>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Scan this QR code with your authenticator app:
          </p>
          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            If QR code doesn't work, use this code:
          </p>
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <code className="text-sm">{backupCode}</code>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-600"
            >
              <FaCopy />
            </motion.button>
          </div>
          {copied && (
            <p className="text-xs text-green-500 mt-1">Copied to clipboard!</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" flex  items-center mb-8 flex-col">
            <label
              htmlFor="authCode"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter 4-digit code:
            </label>
            <div className="flex space-x-2">
              {authCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#FFC300] text-white font-bold py-2 px-4 rounded-md hover:bg-[#FFC300] focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:ring-opacity-50"
          >
            Verify
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default TwoFa;

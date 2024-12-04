"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import html2canvas from "html2canvas";
import { ImageIcon } from "lucide-react";
import { Download } from "lucide-react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const qrCodeRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    document.getElementById("fileInput").click(); // Memanggil input file secara otomatis
  };
  const handleDownload = async () => {
    const canvas = await (await html2canvas(document.getElementById("qrCanvas"))).toDataURL();
    if (canvas) {
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className=" grid grid-cols-12 h-screen   ">
      <div className="col-span-12 py-7 lg:col-span-6 h-full mx-10   flex flex-col gap-10 justify-center">
        <div className="bg-transparent w-full">
          <Image src="/logo.png" alt="img" width={520} height={500} className="object-cover mb-4" />
        </div>
        <div>
          <h6 className="font-bold text-[24px] text-[#2A3D82]">Create QR Code in 1 Step</h6>
          <form className="mt-4 w-full ">
            <div className="w-full flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="w-full lg:w-8/12 ">
                <Label>Submit URL or text</Label>
                <Input
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  className="mt-2 w-full p-[28px]"
                  placeholder="https://www.example.com"
                />
              </div>
              <div className="w-full lg:w-4/12 flex flex-col gap-4">
                <Label>Image (optional)</Label>
                <div
                  onClick={handleUpdateImage}
                  className="w-3/12 lg:w-4/12 border-[1px] overflow-hidden h-20 lg:h-14 bg-transparent flex items-center justify-center  rounded-lg cursor-pointer">
                  {imagePreview ? <Image src={imagePreview} alt="img" width={1000} height={1000} className="w-10 object-cover  " /> : <ImageIcon />}
                  <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6  h-full flex items-center justify-center bg-[#2A3D82] py-10">
        <div className="bg-white p-7  w-9/12 mx-10 lg:w-8/12 rounded-[26px] flex flex-col gap-4">
          <div className="w-full   p-4">
            <div id="canvas" className="w-full h-full flex justify-center items-center bg-transparent overflow-hidden ">
              <QRCodeCanvas
                value={value}
                title={"Title for my QR Code"}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                size={250}
                imageSettings={{
                  src: imagePreview,
                  x: undefined,
                  y: undefined,
                  height: 50,
                  width: 50,
                  opacity: 1,
                  excavate: true,
                }}
              />
            </div>
          </div>
          <Button
            onClick={handleDownload}
            className={`bg-[#4777FF] flex items-center font-bold text-[16px] p-6 gap-4 rounded-full shadow-lg border-[3px] border-white ${
              value === "" && " pointer-events-none opacity-50"
            } `}>
            Download <Download />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client"

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export const ImageUpload = ()=> {
    const [imageUrl, setImageUrl] = useState<string>("");
 return (
    <>
      <CldUploadWidget
        uploadPreset="Barber Project"
        onSuccess={(result) => {
          if (result.event === "success") {
            // @ts-expect-error - result.info is not typed
            setImageUrl(result.info.secure_url);
          }
        }}
        onQueuesEnd={(result, {widget}) => {
            widget.close();
        }}
      >
        {({ open }) => {
          return (
          <>
              <button type="button" className="mt-3 border border-gray-300 font-medium shadow-md w-64 mx-auto rounded-md p-3 hover:bg-gray-100 transition-colors" onClick={(e)=> {
                e.preventDefault()
                open()
              }}>Agregar imagen</button>
                {imageUrl && <Image className="rounded-md mx-auto mt-2" src={imageUrl} width={100} height={100} alt="imagen de perfil" />}
                <input type="hidden" name="image" value={imageUrl} />
          </>
          )
        }}
      </CldUploadWidget>
    </>
 )
}
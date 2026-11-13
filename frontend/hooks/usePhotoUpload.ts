// hooks/usePhotoUpload.ts
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { getSasUrl, uploadToAzureBlob } from "../api/photoService";

export const usePhotoUpload = () => {
  return useMutation({
    mutationFn: async (asset: ImagePicker.ImagePickerAsset) => {
      const fileName = asset.fileName || `photo_${Date.now()}.jpg`;
      const mimeType = asset.mimeType || "image/jpeg";

      // Step A: Request presigned SAS URL from your API
      const { uploadUrl, blobName } = await getSasUrl(fileName);

      // Step B: Direct PUT request to Azure Storage
      await uploadToAzureBlob(uploadUrl, asset.uri, mimeType);

      return blobName;
    },
  });
};

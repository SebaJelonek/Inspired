// api/photoService.ts
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

// Adjust according to your local backend IP setup
const API_BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.238:3000"
    : "http://localhost:3000";

export interface SasResponse {
  uploadUrl: string; // The presigned Azure SAS URL
  blobName: string;
}

// 1. Pick an image from device gallery
export const pickImage =
  async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access the camera roll is required!");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    return result.assets[0];
  };

// 2. Request SAS URL from backend
export const getSasUrl = async (fileName: string): Promise<SasResponse> => {
  console.log(
    "FETCHING UPLOAD URL FROM:",
    `${API_BASE_URL}/api/photos/upload-url`,
  );

  const res = await fetch(`${API_BASE_URL}/api/photos/upload-url`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ fileName }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.log(`Failed to get upload URL: ${result.data.uploadUrl}`);
    throw new Error("Failed to get upload URL");
  }
  return result.data;
};

// 3. Upload raw binary directly to Azure Blob Storage
export const uploadToAzureBlob = async (
  sasUrl: string,
  imageUri: string,
  mimeType: string = "image/jpeg",
) => {
  // Convert local file URI to Blob/ArrayBuffer for fetch
  const response = await fetch(imageUri);

  const blob = await response.blob();

  const azureResponse = await fetch(sasUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob", // Required header by Azure Blob Storage API
      "Content-Type": mimeType,
    },
    body: blob,
  });

  if (!azureResponse.ok) {
    throw new Error(`Azure upload failed with status ${azureResponse.status}`);
  }
};

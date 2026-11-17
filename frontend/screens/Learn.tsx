// import { Text, View } from "react-native";

//
//   return (
//     <View className="w-full flex-1 justify-center">
//       <View className="w-full flex-1 justify-center items-center">
//         <Text>Learn Screen</Text>
//       </View>
//     </View>
//   );
// };
// components/ImageUploader.tsx
import React, { useState } from "react";
import { View, Button, Image, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../api/photoService";
import { usePhotoUpload } from "../hooks/usePhotoUpload";

export const Learn: React.FC = () => {
  const [selectedAsset, setSelectedAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const uploadMutation = usePhotoUpload();

  const handlePickImage = async () => {
    const asset = await pickImage();

    if (asset) {
      setSelectedAsset(asset);
    }
  };

  const handleUpload = () => {
    if (!selectedAsset) return;

    uploadMutation.mutate(selectedAsset, {
      onSuccess: (blobName) => {
        alert(`Successfully uploaded: ${blobName}`);
        setSelectedAsset(null);
      },
      onError: (error) => {
        console.log(`upload error: ${error}`);
        alert(`Upload error: ${error.message}`);
      },
    });
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Button title="Select Photo" onPress={handlePickImage} />

      {selectedAsset && (
        <View className="items-center mt-4">
          <Image
            source={{ uri: selectedAsset.uri }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
          />

          <View className="mt-4">
            {uploadMutation.isPending ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button title="Upload to Azure" onPress={handleUpload} />
            )}
          </View>
        </View>
      )}

      {uploadMutation.isSuccess && (
        <Text className="text-green-600 mt-2">Upload complete!</Text>
      )}
    </View>
  );
};

// src/storages/blob/AzureBlobStorage.ts
import { BlobServiceClient } from "@azure/storage-blob";
import { BlobStorage } from "./BlobStorage";

export class AzureBlobStorage implements BlobStorage {
  constructor(private blobServiceClient: BlobServiceClient) {}

  async uploadBuffer(
    containerName: string,
    blobName: string,
    buffer: Buffer,
  ): Promise<void> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    // Safe guard initialization
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, buffer.length);
  }

  async downloadBuffer(
    containerName: string,
    blobName: string,
  ): Promise<Buffer> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    return await blockBlobClient.downloadToBuffer();
  }
}

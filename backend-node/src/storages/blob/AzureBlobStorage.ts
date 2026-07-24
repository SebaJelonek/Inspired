// src/storages/blob/AzureBlobStorage.ts
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { BlobStorage } from "./BlobStorage";

export class AzureBlobStorage implements BlobStorage {
  private blobServiceClient: BlobServiceClient;
  private containersToEnsure: string[];
  private accountName: string;
  private accountKey: string;

  constructor(
    connectionString: string,
    accountName: string,
    accountKey: string,
  ) {
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    this.containersToEnsure = ["photos"];
    this.accountName = accountName;
    this.accountKey = accountKey;
  }

  async init(): Promise<void> {
    for (const containerName of this.containersToEnsure) {
      const containerClient =
        this.blobServiceClient.getContainerClient(containerName);
      await containerClient.createIfNotExists();
    }
  }

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

  async generateSasUrl(
    containerName: string,
    blobName: string,
    permissions: "r" | "w" | "rw",
    expiresInMinutes = 15,
  ) {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const startsOn = new Date();
    const expiresOn = new Date(
      startsOn.getTime() + expiresInMinutes * 60 * 1000,
    );

    const sasPermissions = new BlobSASPermissions();
    if (permissions.includes("r")) sasPermissions.read = true;
    if (permissions.includes("w")) sasPermissions.write = true;
    if (permissions.includes("w")) sasPermissions.create = true;

    const sharedKeyCredential = new StorageSharedKeyCredential(
      this.accountName,
      this.accountKey,
    );

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: sasPermissions,
        startsOn,
        expiresOn,
      },
      sharedKeyCredential,
    ).toString();

    return `${blobClient.url}?${sasToken}`;
  }
}

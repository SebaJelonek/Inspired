export interface BlobStorage {
  uploadBuffer(
    containerName: string,
    blobName: string,
    buffer: Buffer,
  ): Promise<void>;
  downloadBuffer(containerName: string, blobName: string): Promise<Buffer>;
  // Add whatever signatures your application needs
  generateSasUrl(
    containerName: string,
    blobName: string,
    premissions: "r" | "w" | "rw",
    expiresInMinutes: number,
  ): Promise<string>;
  init(): Promise<void>;
}

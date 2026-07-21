export interface BlobStorage {
  uploadBuffer(
    containerName: string,
    blobName: string,
    buffer: Buffer,
  ): Promise<void>;
  downloadBuffer(containerName: string, blobName: string): Promise<Buffer>;
  // Add whatever signatures your application needs
}

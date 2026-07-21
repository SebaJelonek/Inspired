import { BlobStorage } from "./BlobStorage";

export class MockBlobStorage implements BlobStorage {
  private storage: Map<string, Buffer> = new Map();
  private getStorageKey(containerName: string, blobName: string): string {
    return `${containerName}/${blobName}`
  }

  async uploadBuffer(containerName: string, blobName: string, buffer: Buffer): Promise<void> {
    const key = this.getStorageKey(containerName, blobName)
    this.storage.set(key, Buffer.from(buffer))
  }

  async downloadBuffer(containerName: string, blobName: string): Promise<Buffer> {
    const key = this.getStorageKey(containerName, blobName)
    const data = this.storage.get(key)

    if (!data) {
      throw new Error(
        `BlobkNotFound: Blobk '${blobName} in container '${containerName}' was not found.`
      )
    }
    return Buffer.from(data)
  }

  public clear(): void {
    this.storage.clear()
  }

  public hasBlob(containerName: string, blobName: string): boolean{
    return this.storage.has(this.getStorageKey(containerName, blobName))
  }

}

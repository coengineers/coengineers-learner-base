export interface FileRecord {
  name: string;
  size: number;
  createdAt: string;
}
export interface FileStore {
  list(): Promise<FileRecord[]>;
  upload(name: string, body: ArrayBuffer, contentType: string): Promise<void>;
  download(name: string): Promise<Blob>;
  remove(name: string): Promise<void>;
}
export function filesService(store: FileStore) {
  return {
    list: () => store.list(),
    upload: store.upload,
    download: store.download,
    remove: store.remove,
  };
}

import fs, { Dirent, PathLike, PathOrFileDescriptor } from 'node:fs';

export class FileSystemHelper {
  /**
   * Check if a path exists
   * @param path - Path to check
   * @returns true if the path exists, false otherwise
   */
  static existsSync(path: PathLike): boolean {
    return fs.existsSync(path);
  }

  /**
   * Create a directory
   * @param path - Path to create
   * @param options - Options for directory creation
   */
  static mkdirSync(path: PathLike, options?: fs.MakeDirectoryOptions): void {
    fs.mkdirSync(path, { recursive: true, ...options });
  }

  /**
   * Write data to a file
   * @param path - Path to write to
   * @param data - Data to write
   * @param options - Options for writing
   */
  static writeFileSync(path: PathOrFileDescriptor, data: string, options?: fs.WriteFileOptions): void {
    fs.writeFileSync(path, data, options);
  }

  static writeJSONFile(path: PathOrFileDescriptor, data: object): void {
    this.writeFileSync(path, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
  }

  /**
   * Read data from a file
   * @param path - Path to read from
   * @param options - Options for reading
   * @returns The file content
   */
  static readFileSync(path: PathOrFileDescriptor, options: { encoding: BufferEncoding }): string {
    return fs.readFileSync(path, options);
  }

  static readJSONFileSync<T extends object>(path: PathOrFileDescriptor): T {
    return JSON.parse(this.readFileSync(path, { encoding: 'utf-8' })) satisfies T;
  }

  static readdirWithFileTypesSync(path: PathLike): Dirent[] {
    return fs.readdirSync(path, { withFileTypes: true });
  }

  static readdirSync(path: PathLike): string[] | Buffer[] {
    return fs.readdirSync(path);
  }
}

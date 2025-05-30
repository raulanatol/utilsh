import { renameSync } from 'fs';
import {
  existsSync,
  MakeDirectoryOptions,
  mkdirSync,
  PathLike,
  PathOrFileDescriptor,
  readdirSync,
  readFileSync,
  WriteFileOptions,
  writeFileSync
} from 'node:fs';

interface ReadFilesOptions {
  filterByExtension?: string[];
}

export class FileSystemHelper {
  /**
   * Check if a path exists
   * @param path - Path to check
   * @returns true if the path exists, false otherwise
   */
  static exists(path: PathLike): boolean {
    return existsSync(path);
  }

  /**
   * Create a directory
   * @param path - Path to create
   * @param options - Options for directory creation
   */
  static mkdir(path: PathLike, options?: MakeDirectoryOptions): void {
    mkdirSync(path, { recursive: true, ...options });
  }

  /**
   * Write data to a file
   * @param path - Path to write to
   * @param data - Data to write
   * @param options - Options for writing
   */
  static writeFile(path: PathOrFileDescriptor, data: string, options?: WriteFileOptions): void {
    writeFileSync(path, data, options);
  }

  static writeJSONFile(path: PathOrFileDescriptor, data: object): void {
    this.writeFile(path, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
  }

  /**
   * Read data from a file
   * @param path - Path to read from
   * @param options - Options for reading
   * @returns The file content
   */
  static readFile(path: PathOrFileDescriptor, options: { encoding: BufferEncoding }): string {
    return readFileSync(path, options);
  }

  static readJSONFileSync<T extends object>(path: PathOrFileDescriptor): T {
    return JSON.parse(this.readFile(path, { encoding: 'utf-8' })) satisfies T;
  }

  static readFiles(path: PathLike, options: ReadFilesOptions): string[] {
    return readdirSync(path, { withFileTypes: true })
      .filter(item => {
        if (!item.isFile()) {
          return false;
        }

        if (options.filterByExtension) {
          const ext = item.name.split('.').pop()?.toLowerCase();
          return options.filterByExtension.includes(ext || '');
        }
      })
      .map(item => item.name);
  }

  static move(source: PathLike, destination: PathLike): void {
    renameSync(source, destination);
  }
}

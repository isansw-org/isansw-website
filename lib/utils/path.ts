import { relative } from "path";
import { fileURLToPath } from "url";

/**
 * Convert an import.meta.url into a project‑root‑relative filepath.
 * @param metaUrl  import.meta.url
 * @param rootDir  optional override for project root (defaults to process.cwd())
 */
export function getModulePath(
  metaUrl: string,
  rootDir = process.cwd()
): string {
  const fullPath = fileURLToPath(metaUrl);

  let relPath = relative(rootDir, fullPath);
  if (!relPath.startsWith(".") && !relPath.startsWith("/")) {
    relPath = `./${relPath}`;
  }

  return relPath;
}

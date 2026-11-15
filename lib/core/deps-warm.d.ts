/** Files that decide what `npm ci` installs. */
export declare const NPM_MANIFESTS: readonly ['package.json', 'package-lock.json', 'npm-shrinkwrap.json', '.npmrc'];
export interface WarmPlan {
    readonly manifests: Readonly<Record<string, string | null>>;
}
/** Fingerprint the manifest files of a project directory; absent files are recorded as absent. */
export declare function manifestDigests(projectDir: string): Promise<Record<string, string | null>>;
/**
 * Whether this project's dependencies can be installed ahead: an npm lockfile,
 * no root install scripts (they may need project files or write into the
 * project), and no local packages linked from inside the repository.
 */
export declare function warmable(projectDir: string): Promise<{
    ok: true;
} | {
    ok: false;
    reason: string;
}>;
/** Copy the manifest files into the warm directory. */
export declare function stageManifests(projectDir: string, warmDir: string): Promise<WarmPlan>;
export declare function sameManifests(a: Readonly<Record<string, string | null>>, b: Readonly<Record<string, string | null>>): boolean;
/** Files copied at once: enough to keep the disk busy, few enough to stay clear of open-file limits. */
export declare const COPY_CONCURRENCY = 32;
/**
 * Recreate `from` at `to` as an independent copy, so nothing a version's
 * checks write can reach the warm tree or another version. Files are copied
 * many at a time, and cloned where the file system can share blocks until a
 * write. Internal links are relocated into the copy. Escaping or dangling
 * links, redirected roots and a nonempty destination reject the copy so
 * the caller can use the version's own frozen install instead.
 */
export declare function copyTree(from: string, to: string): Promise<number>;
export declare function removeTree(dir: string): Promise<void>;
